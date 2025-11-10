# COMP3005 Assignment 3 — PostgreSQL CRUD CLI Program

This is a TypeScript, terminal based application that connects to PostgreSQL and allows the user to perform CRUD operations on data in a Postgres database table. 

The user can list all students, add a student, update a student email, delete a student, and lastly exit the program.
# Prerequisites (Must be installed and running before moving further on into this README)
Node.js and npm installed (https://nodejs.org)
PostgreSQL installed and running pgAdmin is also a good addition

## How to Install and Run
1) Clone repo:
In a desired folder run git clone https://github.com/dan1306/COMP3005_Assignment_3.git 

2) You should be creating your own .env but it will be included as one of the files when you clone this repo.
It will include:
database_name=assignment_3_part_one
database_password=YOUR_POSTGRES_PASSWORD

You will need to find your Postgres Database password and fill it into database_password.

3) Install dependencies:
npm install / npm i in terminal

4) Initialize the database, and populate with initial data with command:
npm run populate

5) Run the application:
npm run start

## What The Application Does
When you run the program, you will get a menu with 5 options:
1) Get All Students.
2) Add Students.
3) Update Student Email.
4) Delete student by Student ID.
5) Exit program.

The program will then ask for input, validate input, run queries against PostgreSQL, and print results back to the terminal. This satisfies all four CRUD functions required in the assignment specification.

## Video Demonstration
I have recorded a video showing: the students table and initial rows in pgAdmin, running the TypeScript CLI, inserting, selecting, updating, and deleting rows, and confirming results in pgAdmin after each operation.

Video Link: https://youtu.be/I52NoAgaR8c
Link To Repo: https://github.com/dan1306/COMP3005_Assignment_3 

Ideally you should not be pushing .env files for security purposes, but I pushed it so that it would be easier to run the program. Ideally it shouldn't be included in pushes because it holds sensitive information.
## End of README
