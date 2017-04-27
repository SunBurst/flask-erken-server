import json
import pytz
import uuid

from collections import defaultdict, OrderedDict
from datetime import datetime
from dateutil.relativedelta import relativedelta

from flask import abort, make_response

from app import app, session
from utils import CustomEncoder

@app.route('/')
def index():
    return make_response(open('app/templates/index.html').read())

########## Stations API ############

@app.route('/api/stations', methods=['GET'])
@app.route('/api/stations/<int:bucket>', methods=['GET'])
def get_stations(bucket=0):
    query = "SELECT * FROM stations WHERE bucket=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (bucket,)).result()
    data = [row for row in rows]

    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/station/<string:station_id>', methods=['GET'])
def get_station(station_id):
    query = "SELECT * FROM station_info_by_station WHERE id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id,)).result()
    try:
        data = rows[0]
    except IndexError:    
        abort(404)
    
    return json.dumps(data, cls=CustomEncoder)    
    
@app.route('/api/stations_by_location/<string:location_id>', methods=['GET'])
def get_stations_by_location(location_id):
    query = "SELECT * FROM stations_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/livewebcams_by_location/<string:location_id>', methods=['GET'])
def get_livewebcams_by_location(location_id):
    query = "SELECT * FROM livewebcams_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/video_urls_by_location/<string:location_id>/<int:on_date>', methods=['GET'])
def get_video_urls_by_location(location_id, on_date):
    query = "SELECT * FROM video_urls_by_location WHERE location_id=? AND date=? ORDER BY timestamp ASC"
    prepared = session.prepare(query)
    on_dt = datetime.fromtimestamp(on_date/1000)
    rows = session.execute_async(prepared, (location_id, on_dt,)).result()   
    data = [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/webcam_photos_by_location/<string:location_id>/<int:on_date>', methods=['GET'])
def get_webcam_photos_by_location_on_date(location_id, on_date):
    query = "SELECT * FROM webcam_photos_by_location WHERE location_id=? AND date=? ORDER BY timestamp ASC"
    prepared = session.prepare(query)
    on_dt = datetime.fromtimestamp(on_date/1000)
    rows = session.execute_async(prepared, (location_id, on_dt,)).result()   
    data = [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/webcam_photos_by_location/<string:location_id>/<int:from_timestamp>/<int:to_timestamp>', methods=['GET'])
def get_webcam_photos_by_location(location_id, from_timestamp, to_timestamp):
    query = "SELECT * FROM webcam_photos_by_location WHERE location_id=? AND date=? AND timestamp >=? AND timestamp <=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_date = datetime(from_dt.year, from_dt.month, from_dt.day)

    while (current_date <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, current_date, from_timestamp, to_timestamp,)))
        current_date += relativedelta(days=1)
    
    data = []
    
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/webcam_photos_by_location_by_limit/<string:location_id>/<int:date>', methods=['GET'])
@app.route('/api/webcam_photos_by_location_by_limit/<string:location_id>/<int:date>/<int:limit>', methods=['GET'])
def get_webcam_photos_by_location_by_limit(location_id, date, limit=None):
    query = "SELECT * FROM webcam_photos_by_location WHERE location_id=? AND date=?"
    date_partition = datetime.fromtimestamp(date/1000.0)
    if limit:
        query += " LIMIT ?"
    prepared = session.prepare(query)
    if limit: 
        rows = session.execute_async(prepared, (location_id, date_partition, limit,)).result()
    else:
        rows = session.execute_async(prepared, (location_id, date_partition, )).result()
    data =  [row for row in rows]

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters_all_measurement_types_by_location/<string:location_id>', methods=['GET'])
def get_parameters_all_measurement_types_by_location(location_id):
    query = "SELECT * FROM parameters_all_measurement_types_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters_by_location/<string:location_id>', methods=['GET'])
def get_parameters_by_location(location_id):
    query = "SELECT * FROM parameters_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/profile_parameters_by_location/<string:location_id>', methods=['GET'])
def get_profile_parameters_by_location(location_id):
    query = "SELECT * FROM profile_parameters_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/parameter_groups_by_location/<string:location_id>', methods=['GET'])
def get_parameter_groups_by_location(location_id):
    query = "SELECT * FROM parameter_groups_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/group_parameters_by_location_group/<string:location_id>/<string:group_id>', methods=['GET'])
def get_group_parameters_by_location_group(location_id, group_id):
    query = "SELECT * FROM group_parameters_by_location_group WHERE location_id=? AND group_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id, group_id, )).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/wind_rose_parameters_by_location/<string:location_id>', methods=['GET'])
def get_wind_rose_parameters_by_location(location_id):
    query = "SELECT * FROM wind_rose_parameters_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/sensor_status_by_location/<string:location_id>', methods=['GET'])
def get_sensor_status_by_location(location_id):
    query = "SELECT * FROM sensor_status_by_location WHERE location_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)


########### Daily API ############

@app.route('/api/daily_stations_average_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>', methods=['GET'])
def get_daily_stations_average_parameter_measurements_by_location(location_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/daily_stations_average_parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>', methods=['GET'])
def get_daily_stations_average_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=? ORDER BY date ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': station_id, 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('date'), row.get('avg_value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/daily_stations_average_parameter_group_measurements_by_location/<string:location_id>/<string:group_id>/<int:qc_level>/<int:from_date>/<int:to_date>', methods=['GET'])
def get_daily_stations_average_parameter_group_measurements_by_location(location_id, group_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_parameter_group_measurements_by_location WHERE location_id=? AND group_id=? AND qc_level=? AND year=? AND date>=? AND date<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, group_id, qc_level, year, from_date, to_date, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/daily_stations_average_parameter_group_measurements_by_location_chart/<string:location_id>/<string:group_id>/<int:qc_level>/<int:from_date>/<int:to_date>', methods=['GET'])
def get_daily_stations_average_parameter_group_measurements_by_location_chart(location_id, group_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_parameter_group_measurements_by_location WHERE location_id=? AND group_id=? AND qc_level=? AND year=? AND date>=? AND date<=? ORDER BY date ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, group_id, qc_level, year, from_date, to_date, )))
    
    parameters_by_stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            parameter_id = row.get('parameter_id')
            parameter_name = row.get('parameter_name')
            station_id = row.get('station_id')
            station_name = row.get('station_name')
            parameter_by_station_id = "{parameter_id}-{station_id}".format(parameter_id=parameter_id, station_id=station_id)
            parameter_by_station_name = "{parameter_name} ({station_name})".format(parameter_name=parameter_name, station_name=station_name)
            if parameter_by_station_id not in parameters_by_stations:
                parameters_by_stations[parameter_by_station_id] = {
                    'id': parameter_by_station_id, 
                    'name': parameter_by_station_name, 
                    'data': []
                }

            parameters_by_stations[parameter_by_station_id]['data'].append([row.get('date'), row.get('avg_value')])

    series = [parameters_by_station_data for parameter_by_station_id, parameters_by_station_data in parameters_by_stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/daily_stations_average_profile_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>')
def get_daily_stations_average_profile_measurements_by_location(location_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_profile_measurements_by_location_time WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/daily_stations_average_status_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>')
def get_daily_stations_average_status_parameter_measurements_by_location(location_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_status_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/daily_stations_average_status_parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>')
def get_daily_stations_average_status_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_status_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=? ORDER BY date ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': station_id, 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('date'), row.get('avg_value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

########## Hourly API #############

@app.route('/api/hourly_stations_average_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_stations_average_parameter_measurements_by_location(location_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/hourly_stations_average_parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_stations_average_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=? ORDER BY date_hour ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': "{}-series".format(station_id), 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('date_hour'), row.get('avg_value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/hourly_stations_average_profile_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_stations_average_profile_measurements_by_location(location_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_profile_measurements_by_location_time WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/hourly_stations_average_profile_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def hourly_stations_average_profile_measurements_by_location_chart(location_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_profile_measurements_by_location_time WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=? ORDER BY date_hour ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': "{}-series".format(station_id), 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('date_hour'), row.get('depth'), row.get('avg_value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]

    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/hourly_parameter_group_measurements_by_location/<string:location_id>/<string:group_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_parameter_group_measurements_by_location(location_id, group_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_parameter_group_measurements_by_location WHERE location_id=? AND group_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)

    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, group_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/hourly_parameter_group_measurements_by_location_chart/<string:location_id>/<string:group_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_parameter_group_measurements_by_location_chart(location_id, group_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_parameter_group_measurements_by_location WHERE location_id=? AND group_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=? ORDER BY date_hour ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)

    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, group_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    parameters_by_stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            parameter_id = row.get('parameter_id')
            parameter_name = row.get('parameter_name')
            station_id = row.get('station_id')
            station_name = row.get('station_name')
            parameter_by_station_id = "{parameter_id}-{station_id}".format(parameter_id=parameter_id, station_id=station_id)
            parameter_by_station_name = "{parameter_name} ({station_name})".format(parameter_name=parameter_name, station_name=station_name)
            if parameter_by_station_id not in parameters_by_stations:
                parameters_by_stations[parameter_by_station_id] = {
                    'id': parameter_by_station_id, 
                    'name': parameter_by_station_name, 
                    'data': []
                }

            parameters_by_stations[parameter_by_station_id]['data'].append([row.get('date_hour'), row.get('avg_value')])
    
    series = [parameters_by_station_data for parameter_by_station_id, parameters_by_station_data in parameters_by_stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/hourly_stations_average_status_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_stations_average_status_parameter_measurements_by_location(location_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_status_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/hourly_stations_average_status_parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_stations_average_status_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_status_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=? ORDER BY date_hour ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': "{}-series".format(station_id), 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('date_hour'), row.get('avg_value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

########## High Frequency API #############

@app.route('/api/parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_parameter_measurements_by_location(location_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=? ORDER BY timestamp ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    stations = OrderedDict()
    
    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': "{}-series".format(station_id), 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('timestamp'), row.get('value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)
    
@app.route('/api/parameter_group_measurements_by_location/<string:location_id>/<string:group_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>', methods=['GET'])
def get_parameter_group_measurements_by_location(location_id, group_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM parameter_group_measurements_by_location WHERE location_id=? AND group_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, group_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)

    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameter_group_measurements_by_location_chart/<string:location_id>/<string:group_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_parameter_group_measurements_by_location_chart(location_id, group_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM parameter_group_measurements_by_location WHERE location_id=? AND group_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=? ORDER BY timestamp ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, group_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    parameters_by_stations = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            parameter_id = row.get('parameter_id')
            parameter_name = row.get('parameter_name')
            station_id = row.get('station_id')
            station_name = row.get('station_name')
            parameter_by_station_id = "{parameter_id}-{station_id}".format(parameter_id=parameter_id, station_id=station_id)
            parameter_by_station_name = "{parameter_name} ({station_name})".format(parameter_name=parameter_name, station_name=station_name)
            if parameter_by_station_id not in parameters_by_stations:
                parameters_by_stations[parameter_by_station_id] = {
                    'id': parameter_by_station_id, 
                    'name': parameter_by_station_name, 
                    'data': []
                }

            parameters_by_stations[parameter_by_station_id]['data'].append([row.get('timestamp'), row.get('avg_value')])
    
    series = [parameters_by_station_data for parameter_by_station_id, parameters_by_station_data in parameters_by_stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/profile_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_profile_measurements_by_location(location_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM profile_measurements_by_location_time WHERE location_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/status_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_status_parameter_measurements_by_location(location_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM status_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/status_parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_status_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM status_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=? ORDER BY timestamp ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (location_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    stations = OrderedDict()
    
    for future in futures:
        rows = future.result()
        for row in rows:
            station_id = row.get('station_id')
            
            if station_id not in stations:
                stations[station_id] = {'id': "{}-series".format(station_id), 'name': row.get('station_name'), 'data': []}
                
            stations[station_id]['data'].append([row.get('timestamp'), row.get('value')])

    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/sensors_by_station/<string:station_id>', methods=['GET'])
def get_sensors_by_station(station_id):
    query = "SELECT * FROM sensors_by_station WHERE station_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id,)).result()
    data = [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters_all_measurement_types_by_station/<string:station_id>', methods=['GET'])
def get_parameters_all_measurement_types_by_station(station_id):
    query = "SELECT * FROM parameters_all_measurement_types_by_station WHERE station_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters_by_station/<string:station_id>', methods=['GET'])
def get_parameters_by_station(station_id):
    query = "SELECT * FROM parameters_by_station WHERE station_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/profile_parameters_by_station/<string:station_id>', methods=['GET'])
def get_profile_parameters_by_station(station_id):
    query = "SELECT * FROM profile_parameters_by_station WHERE station_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/parameter_groups_by_station/<string:station_id>', methods=['GET'])
def get_parameter_groups_by_station(station_id):
    query = "SELECT * FROM parameter_groups_by_station WHERE station_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/group_parameters_by_station_group/<string:station_id>/<string:group_id>', methods=['GET'])
def get_group_parameters_by_station_group(station_id, group_id):
    query = "SELECT * FROM group_parameters_by_station_group WHERE station_id=? AND group_id=?"
    prepared = session.prepare(query)
    rows = session.execute_async(prepared, (station_id, group_id, )).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/daily_single_parameter_measurements_by_station/<string:station_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>', methods=['GET'])
def get_daily_stations_average_parameter_measurements_by_station(station_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_single_parameter_measurements_by_station WHERE station_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (station_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/daily_single_parameter_measurements_by_station_chart/<string:station_id>/<string:parameter_id>/<int:qc_level>/<int:from_date>/<int:to_date>', methods=['GET'])
def get_daily_single_parameter_measurements_by_station_chart(station_id, parameter_id, qc_level, from_date, to_date):
    query = "SELECT * FROM daily_single_parameter_measurements_by_station WHERE station_id=? AND parameter_id=? AND qc_level=? AND year=? AND date>=? AND date<=? ORDER BY date ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date/1000.0)
    to_dt = datetime.fromtimestamp(to_date/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (station_id, parameter_id, qc_level, year, from_date, to_date, )))
    
    sensors = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            sensor_id = row.get('sensor_id')
            
            if sensor_id not in sensors:
                sensors[sensor_id] = {'id': sensor_id, 'name': row.get('sensor_name'), 'data': []}
                
            sensors[sensor_id]['data'].append([row.get('date'), row.get('avg_value')])

    series = [sensor_name_data for sensor_id, sensor_name_data in sensors.items()]
    
    return json.dumps(series, cls=CustomEncoder)    

@app.route('/api/hourly_single_parameter_measurements_by_station/<string:station_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_single_parameter_measurements_by_station(station_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_single_parameter_measurements_by_station WHERE station_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (station_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/hourly_single_parameter_measurements_by_station_chart/<string:station_id>/<string:parameter_id>/<int:qc_level>/<int:from_date_hour>/<int:to_date_hour>/')
def get_hourly_single_parameter_measurements_by_station_chart(station_id, parameter_id, qc_level, from_date_hour, to_date_hour):
    query = "SELECT * FROM hourly_single_parameter_measurements_by_station WHERE station_id=? AND parameter_id=? AND qc_level=? AND year=? AND date_hour>=? AND date_hour<=? ORDER BY date_hour ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_date_hour/1000.0)
    to_dt = datetime.fromtimestamp(to_date_hour/1000.0)
    
    futures = []
    for year in range(from_dt.year, to_dt.year + 1):
        futures.append(session.execute_async(prepared, (station_id, parameter_id, qc_level, year, from_date_hour, to_date_hour, )))
    
    sensors = OrderedDict()

    for future in futures:
        rows = future.result()
        for row in rows:
            sensor_id = row.get('sensor_id')
            
            if sensor_id not in sensors:
                sensors[sensor_id] = {'id': "{}-series".format(sensor_id), 'name': row.get('sensor_name'), 'data': []}
                
            sensors[sensor_id]['data'].append([row.get('date_hour'), row.get('avg_value')])

    series = [sensor_name_data for sensor_id, sensor_name_data in sensors.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/single_parameter_measurements_by_station/<string:station_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_single_parameter_measurements_by_station(station_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM single_parameter_measurements_by_station WHERE station_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=?"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (station_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    data = []
    for future in futures:
        rows = future.result()
        for row in rows:
            data.append(row)
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/single_parameter_measurements_by_station_chart/<string:station_id>/<string:parameter_id>/<int:qc_level>/<int:from_timestamp>/<int:to_timestamp>/')
def get_single_parameter_measurements_by_station_chart(station_id, parameter_id, qc_level, from_timestamp, to_timestamp):
    query = "SELECT * FROM single_parameter_measurements_by_station WHERE station_id=? AND parameter_id=? AND qc_level=? AND month_first_day=? AND timestamp>=? AND timestamp<=? ORDER BY timestamp ASC"
    prepared = session.prepare(query)
    
    from_dt = datetime.fromtimestamp(from_timestamp/1000.0)
    to_dt = datetime.fromtimestamp(to_timestamp/1000.0)
    
    futures = []

    current_first_day_of_month = datetime(from_dt.year, from_dt.month, 1)
    while (current_first_day_of_month <= to_dt):
        futures.append(session.execute_async(prepared, (station_id, parameter_id, qc_level, current_first_day_of_month, from_timestamp, to_timestamp, )))
        current_first_day_of_month += relativedelta(months=1)
    
    sensors = OrderedDict()
    
    for future in futures:
        rows = future.result()
        for row in rows:
            sensor_id = row.get('sensor_id')
            
            if sensor_id not in sensors:
                sensors[sensor_id] = {'id': "{}-series".format(sensor_id), 'name': row.get('sensor_name'), 'data': []}
                
            sensors[sensor_id]['data'].append([row.get('timestamp'), row.get('value')])

    series = [sensor_name_data for sensor_id, sensor_name_data in sensors.items()]
    
    return json.dumps(series, cls=CustomEncoder)
