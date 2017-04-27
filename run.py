#!usr/bin/python
import signal
from app import app, log, cassandra_disconnect

def signal_handler(signal, frame):
    log.info("RECEIVED SIGNAL {signal}".format(signal=signal))
    cassandra_disconnect()
    import sys
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

app.run(debug=app.config['DEBUG'])
