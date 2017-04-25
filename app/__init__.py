import logging
import os
import sys

from flask import Flask

from cassandra.cluster import Cluster
from cassandra.query import dict_factory

from cassandra_udts import Description
from cassandra_udts import Livewebcam
from cassandra_udts import Name
from cassandra_udts import Position


cluster = None
session = None

app = Flask(__name__)
app.config.from_object(os.environ['HYDROVIEW_CONFIG'])

log = logging.getLogger()
log.setLevel(app.config['CASSANDRA_LOGLEVEL'])
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s"))
log.addHandler(handler)

def cassandra_connect():
    global cluster, session
    
    log.info("Initializing Cassandra cluster")
    
    cluster = Cluster(app.config['HOSTS'], app.config['PORT'])
    session = cluster.connect(app.config['KEYSPACE'])
    session.row_factory = dict_factory
    
    cluster.register_user_type(app.config['KEYSPACE'], 'description', Description)
    cluster.register_user_type(app.config['KEYSPACE'], 'livewebcam', Livewebcam)
    cluster.register_user_type(app.config['KEYSPACE'], 'name', Name)
    cluster.register_user_type(app.config['KEYSPACE'], 'position', Position)
    
    return "Done"

def cassandra_disconnect():
    log.info("Disconnecting from Cassandra cluster")
    
    if session is not None:
        session.shutdown()
    if cluster is not None:
        cluster.shutdown()

try:
    from uwsgidecorators import postfork
    import uwsgi
except ImportError:
    # Not in a uWSGI context.
    done = cassandra_connect()
    from app import views
else:
    @postfork
    def cassandra_uwsgi_init():
        if session is not None:
            session.shutdown()
        if cluster is not None:
            cluster.shutdown()

        done = cassandra_connect()
        from app import views
        
    uwsgi.atexit = cassandra_disconnect


