import json
import time
import uuid

from datetime import datetime

from cassandra.util import OrderedMapSerializedKey

from cassandra_connection import Description, Livewebcam, Position


class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, OrderedMapSerializedKey):
            return dict(obj)
        elif isinstance(obj, uuid.UUID):
            return str(obj)
        elif isinstance(obj, Description):
            return {'short_description': obj.short_description, 'long_description': obj.long_description}
        elif isinstance(obj, Livewebcam):
            return {'url': obj.url, 'ip_address': obj.ip_address}
        elif isinstance(obj, Position):
            return {'latitude': obj.latitude, 'longitude': obj.longitude}
        elif isinstance(obj, datetime):
            return time.mktime(obj.timetuple()) * 1e3
