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
    days VARCHAR[],
    times VARCHAR[],
    speciality VARCHAR,
    onboarded BOOLEAN,
    rating INT,
    cost INT,
    img VARCHAR
);



CREATE TABLE patients(
    patient_id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    age integer,
    bloodgroup VARCHAR,
    gender VARCHAR,
    city VARCHAR,
    country VARCHAR,
    lookingfor VARCHAR,
    conditions VARCHAR,
    onboarded BOOLEAN,
    img VARCHAR,
    phone INT
);



CREATE TABLE consultations(
    _id SERIAL PRIMARY KEY,
    doctor_id INT,
    patient_id INT,
    status BOOLEAN,
    date VARCHAR,
    time VARCHAR,
    cost INT,
    review VARCHAR,
    rating INT,
    notes VARCHAR
);

