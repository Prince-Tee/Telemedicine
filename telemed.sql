create database telemed;
use telemed;
create table patients(
id int auto_increment primary key,
name varchar(255),
email varchar(255) unique,
password varchar(255),
created_at timestamp default current_timestamp
);

create table doctors(
id int auto_increment primary key,
name varchar(255),
specialization varchar(255),
availability varchar(255),
created_at timestamp default current_timestamp
);

alter table doctors add column profile TEXT;

create table appointment(
id int auto_increment primary key,
patient_id int,
doctor_id int,
appointment_date datetime,
status varchar(50),
created_at timestamp default current_timestamp,
foreign key (patient_id) references patients(id),
foreign key (doctor_id) references doctors(id)
);

alter user 'root'@'localhost' identified by 'Taiwo';

select id, name, email, password
from patients;
