
CREATE KEYSPACE IF NOT EXISTS hydroview_development WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

CREATE TYPE IF NOT EXISTS hydroview_development.description (
    short_description text,
    long_description text
);

CREATE TYPE IF NOT EXISTS hydroview_development.name (
    first_name text,
    last_name text
);

CREATE TYPE IF NOT EXISTS hydroview_development.position (
    latitude double,
    longitude double
);

CREATE TYPE IF NOT EXISTS hydroview_development.thumbnails (
    xl blob,
    l blob,
    m blob,
    s blob
);

CREATE TABLE IF NOT EXISTS hydroview_development.single_parameter_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day date,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    unit text static,
    value float,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day date,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    unit text static,
    value float,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.sensors_by_station (
    station_id text,
    sensor_name text,
    sensor_id text,
    sensor_description frozen<description>,
    sensor_image blob,
    PRIMARY KEY (station_id, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.webcam_photos_by_station (
    station_id text,
    date date,
    timestamp timestamp,
    photo blob,
    PRIMARY KEY ((station_id, date), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.stations (
    bucket int,
    name text,
    id text,
    description frozen<description>,
    environment_category text,
    thumbnails frozen<thumbnails>,
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

CREATE TABLE IF NOT EXISTS hydroview_development.webcam_live_urls_by_station (
    station_id text,
    url text,
    PRIMARY KEY (station_id, url)
) WITH CLUSTERING ORDER BY (url ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.daily_parameter_group_measurements_by_station (
    station_id text,
    group_id text,
    qc_level int,
    year int,
    date timestamp,
    parameter_name text,
    sensor_name text,
    parameter_id text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, group_id, qc_level, year), date, parameter_name, sensor_name, parameter_id, sensor_id)
) WITH CLUSTERING ORDER BY (date DESC, parameter_name ASC, sensor_name ASC, parameter_id ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.parameters_all_measurement_types_by_station (
    station_id text,
    parameter_name text,
    measurement_type_name text,
    measurement_type_id text,
    parameter_id text,
    parameter_description frozen<description>,
    parameter_unit text,
    PRIMARY KEY (station_id, parameter_name, measurement_type_name, measurement_type_id, parameter_id)
) WITH CLUSTERING ORDER BY (parameter_name ASC, measurement_type_name ASC, measurement_type_id ASC, parameter_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.parameters_all_measurement_types_by_station_enb (
    station_id text,
    parameter_name text,
    measurement_type_name text,
    measurement_type_id text,
    parameter_id text,
    parameter_description frozen<description>,
    parameter_unit text,
    parameter_enabled boolean,
    PRIMARY KEY (station_id, parameter_name, measurement_type_name, measurement_type_id, parameter_id)
) WITH CLUSTERING ORDER BY (parameter_name ASC, measurement_type_name ASC, measurement_type_id ASC, parameter_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.hourly_single_parameter_measurements_by_station (
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
) WITH CLUSTERING ORDER BY (date_hour DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.thirty_min_single_param_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    year int,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, year), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.twenty_min_single_param_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    year int,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, year), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.fifteen_min_sing_param_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.ten_min_single_parameter_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.five_min_single_param_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.one_min_single_parameter_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    week_first_day timestamp,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, week_first_day), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.second_single_parameter_measurements_by_station (
    station_id text,
    parameter_id text,
    qc_level int,
    hour timestamp,
    timestamp timestamp,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, hour), timestamp, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.video_urls_by_station (
    station_id text,
    date date,
    timestamp timestamp,
    video_url text,
    PRIMARY KEY ((station_id, date), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.parameter_group_measurements_by_station (
    station_id text,
    group_id text,
    qc_level int,
    month_first_day date,
    timestamp timestamp,
    parameter_name text,
    sensor_name text,
    parameter_id text,
    sensor_id text,
    unit text static,
    value float,
    PRIMARY KEY ((station_id, group_id, qc_level, month_first_day), timestamp, parameter_name, sensor_name, parameter_id, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, parameter_name ASC, sensor_name ASC, parameter_id ASC, sensor_id ASC)
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

CREATE TABLE hydroview_development.group_measurement_frequencies_by_station (
    station_id text,
    group_id text,
    measurement_frequencies list<text>,
    PRIMARY KEY (station_id, group_id)
) WITH CLUSTERING ORDER BY (group_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.group_parameters_by_station (
    station_id text,
    group_id text,
    parameter_name text,
    parameter_id text,
    group_description frozen<description>,
    group_unit text,
    parameter_description frozen<description>,
    parameter_unit text,
    PRIMARY KEY ((station_id), group_id, parameter_name, parameter_id)
) WITH CLUSTERING ORDER BY (group_id ASC, parameter_name ASC, parameter_id ASC)
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


CREATE TABLE IF NOT EXISTS hydroview_development.group_parameters_by_station_group (
    station_id text,
    group_id text,
    parameter_name text,
    parameter_id text,
    group_description frozen<description> static,
    group_name text static,
    group_unit text static,
    parameter_description frozen<description>,
    parameter_unit text,
    PRIMARY KEY ((station_id, group_id), parameter_name, parameter_id)
) WITH CLUSTERING ORDER BY (parameter_name ASC, parameter_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.daily_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    year int,
    date timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, year), date, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (date DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.station_info_by_station (
    id text PRIMARY KEY,
    description frozen<description>,
    environment_category text,
    thumbnails frozen<thumbnails>,
    image blob,
    name text,
    position frozen<position>
) WITH bloom_filter_fp_chance = 0.01
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

CREATE TABLE IF NOT EXISTS hydroview_development.hourly_parameter_group_measurements_by_station (
    station_id text,
    group_id text,
    qc_level int,
    year int,
    date_hour timestamp,
    parameter_name text,
    sensor_name text,
    parameter_id text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, group_id, qc_level, year), date_hour, parameter_name, sensor_name, parameter_id, sensor_id)
) WITH CLUSTERING ORDER BY (date_hour DESC, parameter_name ASC, sensor_name ASC, parameter_id ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.daily_single_parameter_measurements_by_station (
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
) WITH CLUSTERING ORDER BY (date DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.hourly_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    year int,
    date_hour timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, year), date_hour, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (date_hour DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.thirty_min_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.twenty_min_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.fifteen_min_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.ten_min_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.five_min_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    month_first_day timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, month_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE hydroview_development.measurement_frequencies_by_station (
    station_id text PRIMARY KEY,
    measurement_frequencies list<text>
) WITH bloom_filter_fp_chance = 0.01
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

    
CREATE TABLE IF NOT EXISTS hydroview_development.one_min_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    week_first_day timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, week_first_day), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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
    
CREATE TABLE IF NOT EXISTS hydroview_development.second_profile_measurements_by_station_time (
    station_id text,
    parameter_id text,
    qc_level int,
    hour timestamp,
    timestamp timestamp,
    depth float,
    sensor_name text,
    sensor_id text,
    avg_value float,
    unit text static,
    PRIMARY KEY ((station_id, parameter_id, qc_level, hour), timestamp, depth, sensor_name, sensor_id)
) WITH CLUSTERING ORDER BY (timestamp DESC, depth DESC, sensor_name ASC, sensor_id ASC)
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

CREATE TABLE IF NOT EXISTS hydroview_development.networks (
    bucket int,
    name text,
    id text,
    description frozen<description>,
    image blob,
    type text,
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

CREATE TABLE hydroview_development.parameters_by_station_group (
    station_id text,
    group_id text,
    parameter_name text,
    parameter_id text,
    parameter_description frozen<description>,
    parameter_unit text,
    PRIMARY KEY ((station_id, group_id), parameter_name, parameter_id)
) WITH CLUSTERING ORDER BY (parameter_name ASC, parameter_id ASC)
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

CREATE TABLE hydroview_development.parameter_groups_by_station_frequency (
    station_id text,
    measurement_frequency text,
    group_name text,
    group_id text,
    PRIMARY KEY ((station_id, measurement_frequency), group_name, group_id)
) WITH CLUSTERING ORDER BY (group_name ASC, group_id ASC)
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


CREATE TABLE IF NOT EXISTS hydroview_development.network_info_by_network (
    id text PRIMARY KEY,
    description frozen<description>,
    image blob,
    name text,
    type text
) WITH bloom_filter_fp_chance = 0.01
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

CREATE TABLE IF NOT EXISTS hydroview_development.stations_by_network (
    network_id text,
    station_name text,
    station_id text,
    station_description frozen<description>,
    station_environment_category text,
    station_image blob,
    station_position frozen<position>,
    PRIMARY KEY (network_id, station_name, station_id)
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

