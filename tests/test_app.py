import os
from app import app as hydroviewapp
import pytest
import tempfile

class MyappTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, hydroviewapp.app.config['DATABASE'] = tempfile.mkstemp()
        self.app = hydroviewapp.app.test_client()
        hydroviewapp.cassandra_connect()

    def tearDown(self):
        hydroviewapp.cassandra_disconnect()
        os.unlink(hydroviewapp.app.config['DATABASE'])
