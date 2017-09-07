import json
import pytz
import time
import uuid

from base64 import b64encode
from datetime import datetime

from cassandra.util import OrderedMapSerializedKey

from cassandra_udts import Averages, Description, Livewebcam, Position, Thumbnails


class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, OrderedMapSerializedKey):
            return dict(obj)
        elif isinstance(obj, uuid.UUID):
            return str(obj)
        elif isinstance(obj, Averages):
            return {'min_value': obj.min_value, 'avg_value': obj.avg_value,
                'max_value': obj.max_value, 'unit': obj.unit}
        elif isinstance(obj, Description):
            return {'short_description': obj.short_description, 'long_description': obj.long_description}
        elif isinstance(obj, Livewebcam):
            return {'url': obj.url, 'ip_address': obj.ip_address}
        elif isinstance(obj, Position):
            return {'latitude': obj.latitude, 'longitude': obj.longitude}
        elif isinstance(obj, datetime):
            timestamp_utc = pytz.utc.localize(obj)
            return int(timestamp_utc.timestamp()) * 1e3
        elif isinstance(obj, bytes):
            base64_bytes = b64encode(obj)
            base64_string = base64_bytes.decode('utf-8')
            return base64_string
        elif isinstance(obj, Thumbnails):
            return {
                'xl': b64encode(obj.xl).decode('utf-8'),
                'l': b64encode(obj.l).decode('utf-8'),
                'm': b64encode(obj.m).decode('utf-8'),
                's': b64encode(obj.s).decode('utf-8')
            }
