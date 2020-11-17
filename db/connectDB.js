const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '121212',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
});

// script to create the table
/* CREATE TABLE public."user"
(
    "user" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    user_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    mobile_no integer NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    last_updated timestamp without time zone,
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
) */


module.exports = pool;
