import json
import uuid

from collections import defaultdict, OrderedDict

from flask import make_response

from app import app, cassandra_connection
from utils import CustomEncoder


@app.route('/')
def index():
    return make_response(open('app/templates/index.html').read())
    
@app.route('/api/locations/')
def get_locations_and_stations(location_id=None):
    all_locations_query = "SELECT * FROM locations WHERE bucket=0"
    prepared_all_locations_query = cassandra_connection.session.prepare(all_locations_query)
    locations_rows = cassandra_connection.session.execute_async(prepared_all_locations_query).result()
    locations_stations_query = "SELECT * FROM stations_by_location WHERE location_id=?"
    prepared_location_stations_query = cassandra_connection.session.prepare(locations_stations_query)
    locations_stations_data = []
    
    for location_row in locations_rows:
        location_id = location_row.get('id')
        stations_rows = cassandra_connection.session.execute_async(
            prepared_location_stations_query, (location_id,)).result()
        location_stations_data = [station_row for station_row in stations_rows]
        location_row['location_stations'] = location_stations_data
        
        locations_stations_data.append(location_row)

    return json.dumps(locations_stations_data, cls=CustomEncoder)
    
@app.route('/api/location/<string:location_id>/')
def get_location(location_id):
    query = "SELECT * FROM location_info_by_location WHERE location_id=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id,)).result()
    try:
        data = rows[0]
    except IndexError:
        data = {}
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/stations_by_location/<string:location_id>/')
def get_stations_by_location(location_id):
    query = "SELECT * FROM stations_by_location WHERE location_id=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/livewebcams_by_location/<string:location_id>/')
def get_livewebcams_by_location(location_id):
    query = "SELECT * FROM livewebcams_by_location WHERE location_id=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/webcam_photos_by_location/<string:location_id>/')
@app.route('/api/webcam_photos_by_location/<string:location_id>/<int:limit>/')
def get_webcam_photos_by_location(location_id, limit=None):
    query = "SELECT * FROM webcam_photos_by_location WHERE location_id=?"
    if limit:
        query += " LIMIT ?"
    prepared = cassandra_connection.session.prepare(query)
    if limit: 
        rows = cassandra_connection.session.execute_async(prepared, (location_id, limit,)).result()
    else:
        rows = cassandra_connection.session.execute_async(prepared, (location_id, )).result()
    data =  [row for row in rows]

    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters_by_location/<string:location_id>/')
def get_parameters_by_location(location_id):
    query = "SELECT * FROM parameters_by_location WHERE location_id=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/daily_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:year>/')
def get_daily_parameter_measurements_by_location(location_id, parameter_id, qc_level, year):
    query = "SELECT * FROM daily_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id, parameter_id, qc_level, year, )).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)
    
@app.route('/api/daily_parameter_measurements_by_location_chart/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:year>/')
def get_daily_parameter_measurements_by_location_chart(location_id, parameter_id, qc_level, year):
    query = "SELECT * FROM daily_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=? AND year=? ORDER BY date ASC"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id, parameter_id, qc_level, year, )).result()
    
    stations = OrderedDict()
    
    for row in rows:
        station_id = row.get('station_id')
        
        if station_id not in stations:
            stations[station_id] = {'name': row.get('station_name'), 'data': []}
        
        stations[station_id]['data'].append([row.get('date'), row.get('avg_value')])
        
    series = [station_name_data for station_id, station_name_data in stations.items()]
    
    return json.dumps(series, cls=CustomEncoder)

@app.route('/api/hourly_parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/<int:qc_level>/<int:year>/')
def get_hourly_parameter_measurements_by_location(location_id, parameter_id, qc_level, year):
    query = "SELECT * FROM hourly_parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=0 AND year=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id, parameter_id, qc_level, year, )).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameter_measurements_by_location/<string:location_id>/<string:parameter_id>/')
def get_parameter_measurements_by_location(location_id, parameter_id):
    query = "SELECT * FROM parameter_measurements_by_location WHERE location_id=? AND parameter_id=? AND qc_level=0"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id, parameter_id, )).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters/')
def get_all_parameters():
    query = "SELECT * FROM locations_parameters WHERE bucket=0"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared).result()
    data = [row for row in rows]

    return json.dumps(data, cls=CustomEncoder)
