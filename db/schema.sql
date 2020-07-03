DROP DATABASE IF EXISTS duelApp_db;

CREATE DATABASE duelApp_db;

USE duelApp_db;


CREATE TABLE user(

    id int primary key,
    name varchar(50),
    username VARCHAR,
    email varchar(75)
);

CREATE TABLE characters(
    id int primary key,
    name varchar(50),
    spell varchar(50),
    stats varchar(75)
);