CREATE KEYSPACE hydroview_testing WITH replication = {
    'class': 'SimpleStrategy', 
    'replication_factor': '1'
};

CREATE TYPE hydroview_testing.description (
    short_description text,
    long_description text
);

CREATE TYPE hydroview_testing.livewebcam (
    url text,
    ip_address inet
);

CREATE TYPE hydroview_testing.name (
    first_name text,
    last_name text
);

CREATE TYPE hydroview_testing.position (
    latitude double,
    longitude double
);

CREATE TABLE hydroview_testing.locations (
    bucket int,
    name text,
    id text,
    description frozen<description>,
    environment_category text,
    image blob,
    position frozen<position>,
    PRIMARY KEY (bucket, name, id)
) WITH CLUSTERING ORDER BY (name ASC, id ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
    AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND crc_check_chance = 1.0
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99PERCENTILE';

CREATE TABLE hydroview_testing.stations_by_location (
    location_id text,
    station_name text,
    station_id text,
    station_description frozen<description>,
    station_environment_category text,
    station_image blob,
    station_position frozen<position>,
    PRIMARY KEY (location_id, station_name, station_id)
) WITH CLUSTERING ORDER BY (station_name ASC, station_id ASC)
    AND bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
    AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND crc_check_chance = 1.0
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99PERCENTILE';
