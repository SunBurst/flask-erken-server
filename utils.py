import json
import time
import uuid

from datetime import datetime

from cassandra.util import OrderedMapSerializedKey

from cassandra_connection import Position


class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, OrderedMapSerializedKey):
            return dict(obj)
        elif isinstance(obj, uuid.UUID):
            return str(obj)
        elif isinstance(obj, Position):
            return {'latitude': obj.latitude, 'longitude': obj.longitude}
        elif isinstance(obj, datetime):
            return time.mktime(obj.timetuple()) * 1e3
