import json
import os
import tempfile
import unittest

from operator import getitem

from cassandra.cluster import Cluster, Session
from cassandra.encoder import Encoder

from app import app as hydroviewapp, cluster, session, cassandra_connect, cassandra_disconnect
from cassandra_udts import Description
from cassandra_udts import Livewebcam
from cassandra_udts import Name
from cassandra_udts import Position


class HydroViewFlaskTests(unittest.TestCase):
    
    def setUp(self):
        self.app = hydroviewapp.test_client()
        self.app.testing = True
        
    def tearDown(self):
        pass
    
    def test_cassandra_cluster(self):
        assert cluster is not None
        self.assertIsInstance(cluster, Cluster)

    def test_cassandra_session(self):
        assert session is not None
        self.assertIsInstance(session, Session)
    
    def test_cassandra_keyspace(self):
        self.assertEqual(session.keyspace, "hydroview_testing")
    
    def test_index(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
    
    def test_locations_and_stations(self):
        session.execute(
            """INSERT INTO locations (bucket, name, id, description, environment_category, image, position)
                VALUES (%s, %s, %s, %s, %s, %s, %s)""", (
                    0, 'Test Location', 'test_location', Description('Test Location short description', 'Test Location long description'), 
                        'Test Location Category', b'f81a682ca20e7ab00aa4', Position(0.0, 180.0)
            )
        )
        
        session.execute(
            """INSERT INTO stations_by_location (location_id, station_name, station_id, station_description, station_environment_category, station_image, station_position)
                VALUES (%s, %s, %s, %s, %s, %s, %s)""", (
                    'test_location', 'Test Station', 'test_station', Description('Test Station short description','Test Station long description'),
                        'Test Station Category', None, Position(30.0, 150.0)
                )
        )
        
        response = self.app.get('/api/locations_and_stations/0')
        expected_result = [
            {
                "id": "test_location", 
                "name": "Test Location", 
                "description": {
                    "short_description": "Test Location short description", 
                    "long_description": "Test Location long description"
                }, 
                "environment_category": "Test Location Category", 
                "bucket": 0, 
                "image": "ZjgxYTY4MmNhMjBlN2FiMDBhYTQ=", 
                "location_stations": [
                    {
                        "station_name": "Test Station", 
                        "station_image": None, 
                        "station_description": {
                            "short_description": "Test Station short description", 
                            "long_description": "Test Station long description"
                        }, 
                        "station_environment_category": "Test Station Category", 
                        "station_position": {
                            "longitude": 150.0, 
                            "latitude": 30.0
                        }, 
                        "station_id": "test_station", 
                        "location_id": "test_location"}
                ], 
                "position": 
                    {
                        "longitude": 180.0, 
                        "latitude": 0.0
                    }
            }
        ]
        
        response_data_decoded = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(expected_result), len(response_data_decoded)) 
        
        for location_expected, location_response in zip(expected_result, response_data_decoded):
            self.assertDictEqual(location_expected, location_response)
        
        session.execute(
            "DELETE FROM locations WHERE bucket=%s AND name=%s AND id=%s", (0, 'Test Location', 'test_location')
        )
        
        session.execute(
            "DELETE FROM stations_by_location WHERE location_id=%s AND station_name=%s and station_id=%s", ('test_location', 'Test Station', 'test_station')
        )
