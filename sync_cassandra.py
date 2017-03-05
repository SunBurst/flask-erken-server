#!/usr/bin/env
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import logging

from config import KEYSPACE
from config import HOSTS
from cassandra_connection import CassandraConnection

log = logging.getLogger()
log.setLevel('INFO')
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s"))
log.addHandler(handler)

def sync_cassandra():
    cassandra_connection = CassandraConnection(hosts=HOSTS, keyspace=KEYSPACE)

    cassandra_connection.session.execute(
        """CREATE TYPE IF NOT EXISTS erken.description (
            short_description text,
            long_description text
        )"""
    )
    
    cassandra_connection.session.execute(
        """CREATE TYPE IF NOT EXISTS erken.livewebcam (
            url text,
            ip_address inet,
        )"""
    )
    
    cassandra_connection.session.execute(
        """CREATE TYPE IF NOT EXISTS erken.name (
            first_name text,
            last_name text
        )"""
    )
    
    cassandra_connection.session.execute(
        """CREATE TYPE IF NOT EXISTS erken.position (
            latitude double,
            longitude double
        )"""
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.locations (
            bucket int,
            id text,
            name text,
            description frozen <description>,
            position frozen <position>,
            environment_category text,
            image blob,
            PRIMARY KEY ((bucket), name, id)
        ) WITH CLUSTERING ORDER BY (name ASC, id ASC) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.locations_stations (
            bucket int,
            location_name text,
            location_id text,
            station_name text,
            station_id text,
            location_description frozen <description>,
            location_position frozen <position>,
            location_environment_category text,
            location_image blob,
            station_description frozen <description>,
            station_position frozen <position>,
            station_environment_category text,
            station_image blob,
            PRIMARY KEY ((bucket), location_name, station_name, location_id, station_id)
        ) WITH CLUSTERING ORDER BY (location_name ASC, station_name ASC, location_id ASC, station_id ASC) """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.user_by_user_name (
            user_name text,
            name frozen <name>,
            email text,
            password text,
            last_login timestamp,
            PRIMARY KEY ((user_name))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.stations_by_location (
            location_id text,
            station_name text,
            station_id text,
            station_description frozen <description>,
            station_position frozen <position>,
            station_environment_category text,
            station_image blob,
            PRIMARY KEY ((location_id), station_name, station_id)
        ) WITH CLUSTERING ORDER BY (station_name ASC, station_id ASC) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.location_info_by_location (
            location_id text,
            location_name text,
            location_description frozen <description>,
            location_position frozen <position>,
            location_environment_category text,
            location_image blob,
            PRIMARY KEY ((location_id))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameters_by_location (
            location_id text,
            parameter_name text,
            parameter_id text,
            parameter_description frozen <description>,
            parameter_unit text,
            measurement_type text,
            PRIMARY KEY ((location_id), parameter_name, parameter_id)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC, parameter_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.status_parameters_by_location (
            location_id text,
            parameter_name text,
            parameter_id text,
            parameter_description frozen <description>,
            parameter_unit text,
            PRIMARY KEY ((location_id), parameter_name, parameter_id)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC, parameter_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_details_by_location (
            location_id text,
            parameter_name text,
            station_name text,
            sensor_name text,
            station_id text,
            parameter_id text,
            sensor_id text,
            parameter_description frozen <description>,
            parameter_unit text,
            measurement_type text,
            PRIMARY KEY ((location_id), parameter_name, station_name, sensor_name, station_id, parameter_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC, station_name ASC, sensor_name ASC, station_id ASC, parameter_id ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.avg_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            month_first_day date,
            timestamp timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, month_first_day), timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            month_first_day date,
            timestamp timestamp,
            station_name text,
            station_id text,
            value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, month_first_day), timestamp, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.avg_profile_measurements_by_location_time (
            location_id text,
            parameter_id text,
            qc_level int,
            depth float,
            month_first_day date,
            timestamp timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, month_first_day), timestamp, depth)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurements_by_location_depth (
            location_id text,
            parameter_id text,
            qc_level int,
            depth float,
            month_first_day date,
            timestamp timestamp,
            station_name text,
            station_id text,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, month_first_day), depth, timestamp, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (depth ASC, timestamp DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurements_by_location_time (
            location_id text,
            parameter_id text,
            qc_level int,
            month_first_day date,
            timestamp timestamp,
            depth float,
            station_name text,
            station_id text,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, month_first_day), timestamp, depth, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth ASC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.sensor_status_by_location (
            location_id text,
            station_name text,
            sensor_name text,
            station_id text,
            sensor_id text,
            sensor_status_is_ok boolean,
            PRIMARY KEY ((location_id), station_name, sensor_name, station_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (station_name ASC, sensor_name ASC, station_id ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.status_parameter_measurements_by_location (
            location_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            station_id text,
            sensor_id text,
            value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter, qc_level), timestamp, station_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, station_id ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.station_info_by_station (
            station_id text,
            station_name text,
            station_description frozen <description>,
            station_position frozen <position>,
            station_environment_category text,
            station_image blob,
            PRIMARY KEY ((station_id))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.sensors_by_station (
            station_id text,
            sensor_name text,
            sensor_id text,
            sensor_description frozen <description>,
            PRIMARY KEY ((station_id), sensor_name, sensor_id)
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameters_by_station (
            station_id text,
            parameter_name text,
            sensor_name text,
            parameter_id text,
            sensor_id text,
            parameter_description frozen <description>,
            parameter_unit text,
            measurement_type text,
            PRIMARY KEY ((station_id), parameter_name, sensor_name, parameter_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC, sensor_name ASC, parameter_id ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_measurements_by_station (
            station_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            sensor_name text,
            sensor_id text,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter, qc_level), timestamp, sensor_name, sensor_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurements_by_station_depth (
            station_id text,
            parameter text,
            qc_level int,
            depth float,
            timestamp timestamp,
            sensor_name text,
            sensor_id text,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter, qc_level), depth, timestamp, sensor_name, sensor_id)
        ) WITH CLUSTERING ORDER BY (depth ASC, timestamp DESC, sensor_name ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurements_by_station_time (
            station_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            depth float,
            sensor_name text,
            sensor_id text,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter, qc_level), timestamp, depth, sensor_name, sensor_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth ASC, sensor_name ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.status_parameter_measurements_by_station (
            station_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            sensor_id text,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter, qc_level), timestamp, sensor_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.sensor_info_by_sensor (
            sensor_id text,
            sensor_name text,
            sensor_description frozen <description>,
            PRIMARY KEY ((sensor_id))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameters_by_sensor (
            sensor_id text,
            parameter_name text,
            parameter_id text,
            parameter_description frozen <description>,
            parameter_unit text,
            measurement_type text,
            PRIMARY KEY ((sensor_id), parameter_name, parameter_id)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC, parameter_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_measurements_by_sensor (
            sensor_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter, qc_level), timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurements_by_sensor_depth (
            sensor_id text,
            parameter text,
            qc_level int,
            depth float,
            timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter, qc_level), depth, timestamp)
        ) WITH CLUSTERING ORDER BY (depth ASC, timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurements_by_sensor_time (
            sensor_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            depth float,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter, qc_level), timestamp, depth)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.sensor_status_by_sensor (
            sensor_id text,
            sensor_status_is_ok boolean,
            PRIMARY KEY ((sensor_id))
        )""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.sensor_quality_control_info_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            PRIMARY KEY ((sensor_id), parameter_id, qc_level)
        ) WITH CLUSTERING ORDER BY (parameter_id DESC, qc_level ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.user_measurement_edits_by_user (
            user_name text,
            edit_timestamp timestamp,
            timestamp timestamp,
            location_id text,
            station_id text,
            parameter_id text,
            sensor_id text,
            qc_level int,
            location_name text,
            station_name text,
            sensor_name text,
            previous_value float,
            new_value float,
            PRIMARY KEY ((user_name), edit_timestamp, timestamp, location_id, station_id, parameter_id, sensor_id, qc_level)
        ) WITH CLUSTERING ORDER BY (edit_timestamp DESC, timestamp DESC, location_id ASC, station_id ASC, parameter_id ASC, sensor_id ASC, qc_level DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.status_parameter_measurements_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level), timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.notifications_by_sensor (
            sensor_id text,
            event_timestamp timestamp,
            notification_id timeuuid,
            event_type text,
            message text,
            PRIMARY KEY ((sensor_id), event_timestamp, notification_id)
        ) WITH CLUSTERING ORDER BY (event_timestamp DESC, notification_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_parameter_measurements_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level, year), date_hour)
        ) WITH CLUSTERING ORDER BY (date_hour DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_parameter_measurements_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level, year), date)
        ) WITH CLUSTERING ORDER BY (date DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            station_name text,
            station_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date_hour, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_profile_measurements_by_location_time (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            depth float,
            station_name text,
            station_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date_hour, depth, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, depth DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_avg_profile_measurements_by_location_time (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            depth float,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date_hour, depth)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, depth DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            station_name text,
            station_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (date DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_avg_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date)
        ) WITH CLUSTERING ORDER BY (date DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_avg_profile_measurements_by_location_time (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            depth float,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date, depth)
        ) WITH CLUSTERING ORDER BY (date DESC, depth DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_profile_measurements_by_location_time (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            depth float,
            station_name text,
            station_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date, depth, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (date DESC, depth DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_avg_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level, year), date_hour)
        ) WITH CLUSTERING ORDER BY (date_hour DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_parameter_measurements_by_station (
            station_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            sensor_name text,
            sensor_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level, year), date_hour, sensor_name, sensor_id)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, sensor_name ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_parameter_measurements_by_station (
            station_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            sensor_name text,
            sensor_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level, year), date, sensor_name, sensor_id)
        ) WITH CLUSTERING ORDER BY (date DESC, sensor_name ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.station_status_by_station (
            station_id text,
            sensor_name text,
            sensor_id text,
            sensor_status_is_ok boolean,
            PRIMARY KEY ((station_id), sensor_name, sensor_id)
        ) WITH CLUSTERING ORDER BY (sensor_name ASC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_profile_measurements_by_location_time (
            location_id text,
            parameter text,
            qc_level int,
            timestamp timestamp,
            depth float,
            station_id text,
            sensor_id text,
            edit_timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter, qc_level), timestamp, depth, station_id, sensor_id, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth ASC, station_id ASC, sensor_id ASC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_profile_measurements_by_location_depth (
            location_id text,
            parameter text,
            qc_level int,
            depth float,
            timestamp timestamp,
            station_id text,
            sensor_id text,
            edit_timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter, qc_level), depth, timestamp, station_id, sensor_id, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (depth ASC, timestamp DESC, station_id ASC, sensor_id ASC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_parameter_measurements_by_station (
            station_id text,
            parameter_id text,
            qc_level int,
            timestamp timestamp,
            sensor_id text,
            edit_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level), timestamp, sensor_id, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_id ASC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_profile_measurements_by_station_time (
            station_id text,
            parameter_id text,
            qc_level int,
            timestamp timestamp,
            depth float,
            sensor_id text,
            edit_timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level), timestamp, depth, sensor_id, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth ASC, sensor_id ASC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_profile_measurements_by_station_depth (
            station_id text,
            parameter_id text,
            qc_level int,
            depth float,
            timestamp timestamp,
            sensor_id text,
            edit_timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level), depth, timestamp, sensor_id, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (depth ASC, timestamp DESC, sensor_id ASC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_parameter_measurements_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            timestamp timestamp,
            edit_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level), timestamp, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_profile_measurements_by_sensor_time (
            sensor_id text,
            parameter_id text,
            qc_level int,
            timestamp timestamp,
            depth float,
            edit_timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level), timestamp, depth, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, depth ASC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.edited_profile_measurements_by_sensor_depth (
            sensor_id text,
            parameter_id text,
            qc_level int,
            depth float,
            timestamp timestamp,
            edit_timestamp timestamp,
            depth_timestamp timestamp,
            value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level), depth, timestamp, edit_timestamp)
        ) WITH CLUSTERING ORDER BY (depth ASC, timestamp DESC, edit_timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.measurement_edits (
            bucket int,
            edit_timestamp timestamp,
            timestamp timestamp,
            location_id text,
            station_id text,
            parameter_id text,
            sensor_id text,
            qc_level int,
            user_name text,
            location_name text,
            station_name text,	
            parameter_name text,
            sensor_name text,
            previous_value float,
            new_value float,
            PRIMARY KEY ((bucket), edit_timestamp, timestamp, location_id, station_id, parameter_id, sensor_id, qc_level, user_name)
        ) WITH CLUSTERING ORDER BY (edit_timestamp DESC, timestamp DESC, location_id ASC, station_id ASC, parameter_id ASC, sensor_id ASC, qc_level DESC, user_name ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_measurement_edits (
            bucket int,
            edit_timestamp timestamp,
            timestamp timestamp,
            location_id text,
            station_id text,
            parameter_id text,
            sensor_id text,
            depth float,
            qc_level int,
            user_name text,
            location_name text,
            station_name text,	
            parameter_name text,
            sensor_name text,
            previous_value float,
            new_value float,
            PRIMARY KEY ((bucket), edit_timestamp, timestamp, location_id, station_id, parameter_id, sensor_id, depth, qc_level, user_name)
        ) WITH CLUSTERING ORDER BY (edit_timestamp DESC, timestamp DESC, location_id ASC, station_id ASC, parameter_id ASC, sensor_id ASC, depth ASC, qc_level DESC, user_name ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.user_by_email (
            email text,
            user_name text,
            name frozen <name>,
            password text,
            last_login timestamp,
            PRIMARY KEY ((email))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.user_by_reset_token (
            reset_token timeuuid,
            user_name text,
            PRIMARY KEY ((reset_token))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.locations_parameters (
            bucket int,
            parameter_name text,
            parameter_id text,
            parameter_description frozen <description>,
            parameter_unit text,
            measurement_type text,
            PRIMARY KEY ((bucket), parameter_name, parameter_id)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC, parameter_id ASC) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_measurements_by_parameter (
            parameter_id text,
            date_hour timestamp,
            location_id text,
            station_id text,
            sensor_id text,
            station_position frozen <position>,
            avg_value float,
            unit text static,
            PRIMARY KEY ((parameter_id), date_hour, location_id, station_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, location_id ASC, station_id ASC, sensor_id ASC) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_status_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            year int,
            qc_level int,
            date_hour timestamp,
            station_id text,
            sensor_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, year, qc_level), date_hour, station_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, station_id ASC, sensor_id ASC) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_status_parameter_measurements_by_location (
            location_id text,
            parameter_id text,
            qc_level int,
            date timestamp,
            station_id text,
            sensor_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((location_id, parameter_id, qc_level), date, station_id, sensor_id)
        ) WITH CLUSTERING ORDER BY (date DESC, station_id ASC, sensor_id ASC) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.user_profile_measurement_edits_by_user (
            user_name text,
            edit_timestamp timestamp,
            timestamp timestamp,
            depth float,
            location_id text,
            station_id text,
            parameter_id text,
            sensor_id text,
            qc_level int, 
            location_name text,
            station_name text,	
            parameter_name text,
            sensor_name text,
            previous_value float,
            new_value float,
            PRIMARY KEY ((user_name), edit_timestamp, timestamp, depth, location_id, station_id, parameter_id, sensor_id, qc_level)
        ) WITH CLUSTERING ORDER BY (edit_timestamp DESC, timestamp DESC, depth ASC, location_id ASC, station_id ASC, parameter_id ASC, sensor_id ASC, qc_level DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.notifications_by_user (
            user_name text,
            event_timestamp timestamp,
            notification_id timeuuid,
            event_type text,
            message text,
            is_seen boolean,
            PRIMARY KEY ((user_name), event_timestamp, notification_id)
        ) WITH CLUSTERING ORDER BY (event_timestamp DESC, notification_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_status_parameter_measurements_by_station (
            station_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            sensor_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level, year), date_hour, sensor_id)
        ) WITH CLUSTERING ORDER BY (date_hour DESC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_status_parameter_measurements_by_station (
            station_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            sensor_id text,
            avg_value float,
            unit text static,
            PRIMARY KEY ((station_id, parameter_id, qc_level, year), date, sensor_id)
        ) WITH CLUSTERING ORDER BY (date DESC, sensor_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.hourly_status_parameter_measurements_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            year int,
            date_hour timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level, year), date_hour)
        ) WITH CLUSTERING ORDER BY (date_hour DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.daily_status_parameter_measurements_by_sensor (
            sensor_id text,
            parameter_id text,
            qc_level int,
            year int,
            date timestamp,
            avg_value float,
            unit text static,
            PRIMARY KEY ((sensor_id, parameter_id, qc_level, year), date)
        ) WITH CLUSTERING ORDER BY (date DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.locations_livewebcams (
            bucket int,
            location_name text,
            station_name text,
            location_id text,
            station_id text,
            livewebcam frozen <livewebcam>,
            PRIMARY KEY ((bucket), location_name, station_name, location_id, station_id)
        ) WITH CLUSTERING ORDER BY (location_name ASC, station_name ASC, location_id ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.locations_webcam_photos (
            bucket int,
            location_name text,
            station_name text,
            timestamp timestamp,
            location_id text,
            station_id text,
            photo blob,
            PRIMARY KEY ((bucket), location_name, station_name, location_id, station_id)
        ) WITH CLUSTERING ORDER BY (location_name ASC, station_name ASC, location_id ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.webcam_photos_by_location (
            location_id text,
            date timestamp,
            timestamp timestamp,
            station_name text,
            station_id text,
            photo blob,
            PRIMARY KEY ((location_id, date), timestamp, station_name, station_id)
        ) WITH CLUSTERING ORDER BY (timestamp DESC, station_name ASC, station_id ASC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.livewebcams_by_location (
            location_id text,
            station_name text,
            station_id text,
            livewebcam frozen <livewebcam>,
            PRIMARY KEY ((location_id), station_name, station_id)
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.livewebcam_by_station (
            station_id text,
            livewebcam frozen <livewebcam>,
            PRIMARY KEY ((station_id))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.webcam_photos_by_station (
            station_id text,
            timestamp timestamp,
            photo blob,
            PRIMARY KEY ((station_id), timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC)""".format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.status_parameter_thresholds_by_sensor (
            sensor_id text,
            parameter_id text,
            min_value float,
            max_value float,
            PRIMARY KEY ((sensor_id, parameter_id))
        ) """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.stations_by_parameter (
            parameter_id text,
            location_name text,
            station_name text,
            location_id text,
            station_id text,
            parameter_name text static,
            parameter_description frozen <description>,
            parameter_unit text,
            measurement_type text,
            location_position frozen <position>,
            station_position frozen <position>,
            PRIMARY KEY ((parameter_id), location_name, station_name, location_id, station_id)
        ) WITH CLUSTERING ORDER BY (location_name ASC, station_name ASC, location_id ASC, station_id ASC) """.format(keyspace=KEYSPACE)
    )
    
    log.info('All done!')
    cassandra_connection.disconnect()

if __name__=='__main__':
    sync_cassandra()
