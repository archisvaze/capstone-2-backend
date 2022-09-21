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
    onboarded BOOLEAN,
    rating INT,
    cost INT,
    img VARCHAR
);

-- ALTER TABLE doctors
-- ADD rating INT,
-- ADD cost INT,
-- ADD img VARCHAR;

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

-- ALTER TABLE patients
-- ADD age INT,
-- ADD bloodgroup VARCHAR,
-- ADD gender VARCHAR,
-- ADD img VARCHAR,
-- ADD phone INT;

CREATE TABLE consultations(
    _id SERIAL PRIMARY KEY,
    doctor_id INT,
    patient_id INT,
    status BOOLEAN,
    day integer,
    time integer,
    cost INT,
    review VARCHAR,
    rating INT,
    notes VARCHAR
);

-- ALTER TABLE consultations
-- ADD cost INT,
-- ADD review VARCHAR,
-- ADD rating INT,
-- ADD notes VARCHAR;