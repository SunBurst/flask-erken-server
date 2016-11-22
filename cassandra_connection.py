from cassandra.cluster import Cluster
from cassandra.query import dict_factory


class Position(object):
    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude


class CassandraConnection(object):
    def __init__(self, hosts, keyspace):
        self.cluster = Cluster(hosts)
        self.session = self.cluster.connect()
        self.session.row_factory = dict_factory
        self.session.execute("""
            CREATE KEYSPACE IF NOT EXISTS %s
            WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': '1' }
            """ % keyspace)

        self.session.set_keyspace(keyspace)
        self.cluster.register_user_type(keyspace, 'position', Position)

    
    def disconnect(self):
        self.cluster.shutdown()
        
        



