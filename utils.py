import json
import time
import uuid

from base64 import b64encode
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
        elif isinstance(obj, bytes):
            base64_bytes = b64encode(obj)
            base64_string = base64_bytes.decode('utf-8')
            return base64_string
