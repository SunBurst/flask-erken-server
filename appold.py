import json
import uuid

from flask import render_template

from cassandra_connection import CassandraConnection, Position
from utils import CustomEncoder


def signal_handler(signal, frame):
    print("Shutting down server")
    cassandra_connection.disconnect()
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    app.run(debug=True)

