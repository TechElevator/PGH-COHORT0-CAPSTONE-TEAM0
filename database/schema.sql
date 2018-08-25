-- *************************************************************************************************
-- This script creates all of the database objects (tables, sequences, etc) for the database
-- *************************************************************************************************

BEGIN;

-- CREATE statements go here
DROP TABLE IF EXISTS app_user;
DROP TABLE IF EXISTS city;

CREATE TABLE city(
   city              VARCHAR(46) NOT NULL
  ,city_ascii        VARCHAR(46) NOT NULL
  ,state_id          VARCHAR(2) NOT NULL
  ,state_name        VARCHAR(20) NOT NULL
  ,county_fips       INTEGER  NOT NULL
  ,county_name       VARCHAR(23) NOT NULL
  ,lat               NUMERIC(7,4) NOT NULL
  ,lng               NUMERIC(9,4) NOT NULL
  ,population        NUMERIC(10,1)
  ,population_proper INTEGER 
  ,density           NUMERIC(7,1) NOT NULL
  ,source            VARCHAR(7) NOT NULL
  ,incorporated      VARCHAR(5) NOT NULL
  ,timezone          VARCHAR(30)
  ,zips              VARCHAR(1859)
  ,id                INTEGER  NOT NULL PRIMARY KEY 
);


CREATE TABLE app_user (
  id SERIAL PRIMARY KEY,
  user_name varchar(32) NOT NULL UNIQUE,
  password varchar(32) NOT NULL,
  role varchar(32),
  salt varchar(255) NOT NULL,
  default_city_id INTEGER,
  default_city varchar(32) NOT NULL,
  default_visualization VARCHAR(16) DEFAULT 'bar',
  default_units CHAR DEFAULT 'F',
  default_region varchar(32) NOT NULL,
  default_latitude NUMERIC(9,4) NOT NULL,
  default_longitude NUMERIC(9,4) NOT NULL,
  default_population INTEGER,
  default_timezone varchar(32) NOT NULL,


  CONSTRAINT fk_default_city_id FOREIGN KEY (default_city_id) REFERENCES city (id)
);

COMMIT;