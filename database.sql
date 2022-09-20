CREATE DATABASE docseek;

CREATE TABLE doctors(
    _id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    qualification VARCHAR,
    experience VARCHAR,
    hospital VARCHAR,
    city VARCHAR,
    country VARCHAR,
    days VARCHAR,
    time VARCHAR,
    speciality VARCHAR,
    onboarded: BOOLEAN
);
