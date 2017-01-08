import logging
import signal
import sys

from flask import Flask

from cassandra_connection import CassandraConnection

log = logging.getLogger()
log.setLevel('INFO')
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s"))
log.addHandler(handler)

app = Flask(__name__)
app.config.from_object('config')
cassandra_connection = CassandraConnection(hosts=app.config['HOSTS'], keyspace=app.config['KEYSPACE'], register_udts=True)


def signal_handler(signal, frame):
    log.info("Shutting down server")
    cassandra_connection.disconnect()
    sys.exit(0)

from app import views
signal.signal(signal.SIGINT, signal_handler)
