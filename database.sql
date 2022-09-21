CREATE DATABASE docseek;

CREATE TABLE doctors(
    doctor_id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    qualification VARCHAR,
    experience VARCHAR,
    hospital VARCHAR,
    city VARCHAR,
    country VARCHAR,
    days integer[],
    time integer[],
    speciality VARCHAR,
    onboarded BOOLEAN
);

CREATE TABLE patients(
    patient_id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    city VARCHAR,
    country VARCHAR,
    lookingfor VARCHAR,
    onboarded BOOLEAN
);

CREATE TABLE consultations(
    _id SERIAL PRIMARY KEY,
    doctor_id INT,
    patient_id INT,
    status BOOLEAN,
    day integer,
    time integer
);