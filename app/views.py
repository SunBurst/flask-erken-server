import json
import uuid

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

@app.route('/api/parameters_by_location/<string:location_id>/')
def get_parameters_by_location(location_id):
    query = "SELECT * FROM parameters_by_location WHERE location_id=?"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared, (location_id,)).result()
    data =  [row for row in rows]
    
    return json.dumps(data, cls=CustomEncoder)

@app.route('/api/parameters/')
def get_all_parameters():
    query = "SELECT * FROM locations_parameters WHERE bucket=0"
    prepared = cassandra_connection.session.prepare(query)
    rows = cassandra_connection.session.execute_async(prepared).result()
    data = [row for row in rows]

    return json.dumps(data, cls=CustomEncoder)
