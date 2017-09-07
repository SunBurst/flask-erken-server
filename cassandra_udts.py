class Averages(object):
    def __init__(self, min_value, avg_value, max_value, unit):
        self.min_value = min_value
        self.avg_value = avg_value
        self.max_value = max_value
        self.unit = unit
        

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

class Thumbnails(object):
    def __init__(self, xl, l, m, s):
        self.xl = xl
        self.l = l
        self.m = m
        self.s = s
