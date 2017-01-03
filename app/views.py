import json
import uuid

from flask import render_template

from app import app, cassandra_connection
from utils import CustomEncoder

@app.route('/locations/get_locations')
def get_locations():
    all_locations_query = "SELECT * FROM locations where bucket=0"
    prepared_all_locations_query = cassandra_connection.session.prepare(all_locations_query)
    locations_rows = cassandra_connection.session.execute_async(prepared_all_locations_query).result()
    locations_data = [row for row in locations_rows]

    return json.dumps(locations_data, cls=CustomEncoder)

@app.route('/locations/get_locations_and_stations')
def get_locations_and_stations():
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
    
@app.route('/locations/get_locations_parameters')
def get_locations_parameters():
    all_parameters_query = "SELECT * FROM locations_parameters WHERE bucket=0"
    prepared_all_parameters_query = cassandra_connection.session.prepare(all_parameters_query)
    locations_parameters_rows = cassandra_connection.session.execute_async(prepared_all_parameters_query).result()
    locations_parameters_data = [row for row in locations_parameters_rows]

    return json.dumps(locations_parameters_data, cls=CustomEncoder)

@app.route('/')
@app.route('/sites/')
def index():
    return render_template('index.html')

@app.route('/sites/site/<uuid:site_id>/overview/')
def site_overview(site_id):
    site_query = "SELECT * FROM site_info_by_site WHERE site_id=?"
    prepared = cassandra_connection.session.prepare(site_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()

    try:
        site_data = rows[0]
    except IndexError as e:
        print(e)
        site_data = None
    finally:
        return render_template('sites/site_overview.html', **site_data)
        
@app.route('/sites/site/<uuid:site_id>/overview/info/')
def site_overview_info(site_id):
    site_query = "SELECT * FROM site_info_by_site WHERE site_id=?"
    prepared = cassandra_connection.session.prepare(site_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()

    try:
        site_data = rows[0]
        site_position_cass = site_data.get('site_position')
        site_data['site_latitude'] = site_position_cass.latitude
        site_data['site_longitude'] = site_position_cass.longitude
    except IndexError as e:
        print(e)
        site_data = None
    finally:
        return render_template('sites/site_overview_info.html', **site_data)
        
@app.route('/sites/site/<uuid:site_id>/overview/timeline/')
def site_overview_timeline(site_id):
    return render_template('sites/site_overview_timeline.html', site_id=site_id)

@app.route('/sites/site/<uuid:site_id>/map/')
def site_map(site_id):
    site_query = "SELECT * FROM site_info_by_site WHERE site_id=?"
    prepared = cassandra_connection.session.prepare(site_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()

    try:
        site_data = rows[0]
        site_position_cass = site_data.get('site_position')
        site_data['site_latitude'] = site_position_cass.latitude
        site_data['site_longitude'] = site_position_cass.longitude
    except IndexError as e:
        print(e)
        site_data = None
    finally:
        return render_template('sites/site_map.html', **site_data)

@app.route('/sites/site/<uuid:site_id>/data/')
def site_data(site_id):
    site_query = "SELECT * FROM site_info_by_site WHERE site_id=?"
    prepared = cassandra_connection.session.prepare(site_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()

    try:
        site_data = rows[0]
        site_position_cass = site_data.get('site_position')
        site_data['site_latitude'] = site_position_cass.latitude
        site_data['site_longitude'] = site_position_cass.longitude
    except IndexError as e:
        print(e)
        site_data = None
    finally:
        return render_template('sites/site_data.html', **site_data)
        
@app.route('/sites/site/<uuid:site_id>/dashboard/')
def site_dashboard(site_id):
    site_query = "SELECT * FROM site_info_by_site WHERE site_id=?"
    prepared = cassandra_connection.session.prepare(site_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()

    try:
        site_data = rows[0]
        site_position_cass = site_data.get('site_position')
        site_data['site_latitude'] = site_position_cass.latitude
        site_data['site_longitude'] = site_position_cass.longitude
    except IndexError as e:
        print(e)
        site_data = None
    finally:
        return render_template('sites/site_dashboard.html', **site_data)
        
@app.route('/sites/site/<uuid:site_id>/dashboard/status/')
def site_dashboard_status(site_id):
    #site_query = "SELECT * FROM status_parameter_measurements_by_location WHERE location_id=?"
    #prepared = cassandra_connection.session.prepare(site_query)
    #rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()

    return render_template('sites/site_dashboard_status.html', site_id=site_id)

@app.route('/sites/site/<uuid:site_id>/locations/location/<uuid:location_id>')
def location(site_id, location_id):
    site_name_query = "SELECT site_name FROM site_info_by_site WHERE site_id=?"
    prepared_site_name_query = cassandra_connection.session.prepare(site_name_query)
    location_query = "SELECT * FROM location_info_by_location WHERE location_id=?"
    prepared_location_query = cassandra_connection.session.prepare(location_query)
    site_rows = cassandra_connection.session.execute_async(prepared_site_name_query, (site_id,)).result()
    location_rows = cassandra_connection.session.execute_async(prepared_location_query, (location_id,)).result()
    
    try:
        site_data = site_rows[0]
        site_id = site_data.get('site_id')
        site_name = site_data.get('site_name')
    except IndexError as e:
        print(e)
        site_id = None
        site_name = None
    
    try:
        location_data = location_rows[0]
        location_position_cass = location_data.get('location_position')
        location_data['location_latitude'] = location_position_cass.latitude
        location_data['location_longitude'] = location_position_cass.longitude
    except IndexError as e:
        print(e)
        location_data = None
    finally:
        return render_template(
            'locations/location.html', site_id=site_id, site_name=site_name, **location_data)
    
@app.route('/sites/get_site_parameter_readings/<uuid:site_id>/<int:limit>/')
def get_site_parameter_readings(site_id, limit):
    site_readings_query = "SELECT * FROM parameter_readings_by_site WHERE site_id=? limit ?"
    prepared = cassandra_connection.session.prepare(site_readings_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id, limit, )).result()
    site_readings_data = [row for row in rows]
    
    return json.dumps(site_readings_data, cls=CustomEncoder)
    
@app.route('/sites/get_location_status_parameter_measurements/<uuid:site_id>/')
def get_location_status_parameter_measurements(site_id):
    status_measurements_query = "SELECT * FROM status_parameter_measurements_by_location WHERE location_id=? AND parameter='battery' AND qc_level=0"
    prepared = cassandra_connection.session.prepare(status_measurements_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id, )).result()
    status_measurements_data = [row for row in rows]
    
    return json.dumps(status_measurements_data, cls=CustomEncoder)
