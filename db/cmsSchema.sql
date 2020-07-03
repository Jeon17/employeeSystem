DROP DATABASE IF EXISTS employee_systemDB;

CREATE DATABASE employee_systemDB;

USE employee_systemDB;

CREATE TABLE department (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(30) NOT NULL,
     PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    department_id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    PRIMARY KEY (id)
)

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL, 
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
)