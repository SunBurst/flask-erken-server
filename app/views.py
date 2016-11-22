import json
import uuid

from flask import render_template

from app import app, cassandra_connection
from utils import CustomEncoder

@app.route('/sites/get_sites')
def get_sites():
    all_sites_query = "SELECT * FROM sites where bucket=0"
    prepared = cassandra_connection.session.prepare(all_sites_query)
    rows = cassandra_connection.session.execute_async(prepared).result()
    sites_data = [row for row in rows]

    return json.dumps(sites_data, cls=CustomEncoder)

@app.route('/sites/get_sites_and_locations')
def get_sites_and_locations():
    all_sites_query = "SELECT * FROM sites WHERE bucket=0"
    prepared_all_sites_query = cassandra_connection.session.prepare(all_sites_query)
    sites_rows = cassandra_connection.session.execute_async(prepared_all_sites_query).result()
    site_locations_query = "SELECT * FROM locations_by_site WHERE site_id=?"
    prepared_site_locations_query = cassandra_connection.session.prepare(site_locations_query)
    sites_locations_data = []
    
    for site_row in sites_rows:
        site_id = site_row.get('site_id')
        locations_rows = cassandra_connection.session.execute_async(
            prepared_site_locations_query, (site_id,)).result()
        site_locations_data = [location_row for location_row in locations_rows]
        site_row['site_locations'] = site_locations_data
        
        sites_locations_data.append(site_row)
        
    return json.dumps(sites_locations_data, cls=CustomEncoder)

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

@app.route('/sites/site/<uuid:site_id>/data/')
def site_data(site_id):
    pass

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

@app.route('/sites/get_locations/<uuid:site_id>')
def get_locations(site_id):
    all_locations_query = "SELECT * FROM locations_by_site WHERE site_id=?"
    prepared = cassandra_connection.session.prepare(all_locations_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id,)).result()
    locations_data = [row for row in rows]

    return json.dumps(locations_data, cls=CustomEncoder)
    
@app.route('/sites/get_site_parameter_readings/<uuid:site_id>/<int:limit>')
def get_site_parameter_readings(site_id, limit):
    site_readings_query = "SELECT * FROM parameter_readings_by_site WHERE site_id=? limit ?"
    prepared = cassandra_connection.session.prepare(readings_query)
    rows = cassandra_connection.session.execute_async(prepared, (site_id, limit, )).result()
    site_readings_data = [row for row in rows]
    
    return json.dumps(site_readings_data, cls=CustomEncoder)

def perdelta(start, end, delta):
    curr = start
    while curr < end:
        yield curr
        curr += delta

@app.route('/charts/heatmap')
def heatmap():
    import random
    from datetime import date, datetime, timedelta
    first = [[dt, 0.5, random.uniform(4.0, 7.0)] for dt in perdelta(datetime(2016, 11, 1), datetime(2016, 11, 8), timedelta(days=1))]
    print(first)
    second = [[dt, 3.0, random.uniform(4.0, 7.0)] for dt in perdelta(datetime(2016, 11, 1), datetime(2016, 11, 8), timedelta(days=1))]
    print(second)
    third = [[dt, 15.0, random.uniform(4.0, 7.0)] for dt in perdelta(datetime(2016, 11, 1), datetime(2016, 11, 8), timedelta(days=1))]
    print(third)
    data = [first, second, third]
    
    return json.dumps(data, cls=CustomEncoder)
