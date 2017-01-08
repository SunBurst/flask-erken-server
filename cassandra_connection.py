from cassandra.cluster import Cluster
from cassandra.query import dict_factory


class Description(object):
    def __init__(self, short_description, long_description):
        self.short_description = short_description
        self.long_description = long_description


class Livewebcam(object):
    def __init__(self, url, ip_address):
        self.url = url
        self.ip_address = ip_address


class Name(object):
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name


class Position(object):
    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude


class CassandraConnection(object):
    def __init__(self, hosts, keyspace, register_udts=False):
        self.cluster = Cluster(hosts)
        self.session = self.cluster.connect()
        self.session.row_factory = dict_factory
        self.session.execute("""
            CREATE KEYSPACE IF NOT EXISTS %s
            WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': '1' }
            """ % keyspace)
        
        self.session.set_keyspace(keyspace)
        
        if register_udts:
            self.register_udts(keyspace)

    
    def disconnect(self):
        self.cluster.shutdown()
        

    def register_udts(self, keyspace):
        self.cluster.register_user_type(keyspace, 'description', Description)
        self.cluster.register_user_type(keyspace, 'livewebcam', Livewebcam)
        self.cluster.register_user_type(keyspace, 'name', Name)
        self.cluster.register_user_type(keyspace, 'position', Position)
        
        



