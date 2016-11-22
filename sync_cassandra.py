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
        """CREATE TYPE IF NOT EXISTS erken.position (
            latitude double,
            longitude double
        )"""
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.sites (
            bucket int,
            site_id uuid,
            site_name text,
            site_description_short text,
            site_description_long text,
            site_position frozen <position>,
            site_image text,
            PRIMARY KEY (bucket, site_name, site_id)
        ) WITH CLUSTERING ORDER BY (site_name ASC, site_id ASC) """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.site_info_by_site (
            site_id uuid PRIMARY KEY,
            site_description_short text,
            site_description_long text,
            site_name text,
            site_position frozen <position>,
            site_image text
        )""".format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.locations_by_site (
            site_id uuid,
            location_name text,
            location_description_short text,
            location_description_long text,
            location_id uuid,
            location_position frozen <position>,
            location_image text,
            PRIMARY KEY (site_id, location_name)
        ) WITH CLUSTERING ORDER BY (location_name ASC)
        """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_readings_by_site (
            site_id uuid,
            location_id uuid,
            parameter_id text,
            qc_level int,
            time timestamp,
            value float,
            PRIMARY KEY ((site_id), location_id, parameter_id, time, qc_level)
        ) WITH CLUSTERING ORDER BY (location_id ASC, parameter_id ASC, time DESC, qc_level ASC)
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.location_info_by_location (
            location_id uuid PRIMARY KEY,
            location_description_short text,
            location_description_long text,
            location_name text,
            location_position frozen <position>,
            location_image text
        )""".format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.logs_by_location (		
            location_id uuid,
            log_name text,
            log_description text,
            log_id uuid,
            PRIMARY KEY (location_id, log_name)
        ) WITH CLUSTERING ORDER BY (log_name ASC)
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameters_by_location (
            location_id uuid,
            parameter_id text,
            parameter_name text,
            PRIMARY KEY (location_id, parameter_name)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC)
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameters_by_location_parameter (
            location_id uuid,
            parameter_id text,
            parameter_name text,
            parameter_type text,
            PRIMARY KEY (location_id, parameter_id)
        )
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_logs_by_location (
            location_id uuid,
            log_id uuid,
            parameter_id text,
            log_name text,
            PRIMARY KEY ((location_id, parameter_id), log_name, log_id)
        ) WITH CLUSTERING ORDER BY (log_name ASC)
        """.format(keyspace=KEYSPACE)
    )


    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.log_info_by_log (		
            log_id uuid,
            log_name text,
            log_description text,
            PRIMARY KEY (log_id, log_name)
        ) WITH CLUSTERING ORDER BY (log_name ASC)
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_files_by_log (		
            log_id uuid,
            parameter_id text,
            parameter_name text,
            type text,
            file_path text,
            skip_rows int,
            PRIMARY KEY (log_id, parameter_name)
        ) WITH CLUSTERING ORDER BY (parameter_name ASC)
        """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_readings_by_log_desc (
            log_id uuid,
            qc_level int,
            parameter_id text,
            time timestamp,
            value float,
            PRIMARY KEY ((log_id, qc_level, parameter_id), time)
        ) WITH CLUSTERING ORDER BY (time DESC)
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.parameter_readings_by_log_asc (
            log_id uuid,
            qc_level int,
            parameter_id text,
            time timestamp,
            value float,
            PRIMARY KEY ((log_id, qc_level, parameter_id), time)
        ) WITH CLUSTERING ORDER BY (time ASC)
        """.format(keyspace=KEYSPACE)
    )
    
    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_readings_by_log_desc (
            log_id uuid,
            qc_level int,
            depth float,
            parameter_id text,
            time timestamp,
            value float,
            PRIMARY KEY ((log_id, qc_level, parameter_id), time, depth)
        ) WITH CLUSTERING ORDER BY (time DESC, depth ASC)
        """.format(keyspace=KEYSPACE)
    )

    cassandra_connection.session.execute(
        """CREATE TABLE IF NOT EXISTS {keyspace}.profile_readings_by_log_asc (
            log_id uuid,
            qc_level int,
            depth float,
            parameter_id text,
            time timestamp,
            value float,
            PRIMARY KEY ((log_id, qc_level, parameter_id), time, depth)
        ) WITH CLUSTERING ORDER BY (time ASC, depth ASC)
        """.format(keyspace=KEYSPACE)
    )

    log.info('All done!')
    cassandra_connection.disconnect()

if __name__=='__main__':
    sync_cassandra()
