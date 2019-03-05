# CSC 307 Group Project: Team VII
## Team Pizza Topping: American Bacon

Team Lead: Reed Bowling

Database Lead: Spencer Gilson

Architect: Brent Lee

UI: Dylan Gross

Testing: Michael Silin

# Additional Setup Instructions

## Database

In the root of this repository is the file: *test-db-data*, which contains a series of statements that can be used to populate the datebase.

If you have previosly defined databases on your SQL server, the easiest way to prepare your envrionment is to drop and re-create the dev database. You can do this by running the queries `drop database dev` and then `create database dev`.

In your sql client of choice (MySQLWorkbench, MySQL extension for VSCode, etc) select the *dev* database.

*Note* When you are executing the insert statements, make sure you are executing them directly on the dev database. In the VSCode extension, you need to right-click the dev database and choose _New Query_. In MySQL workbench, right-click the dev database and select _Set as Default Schema_.

Copy the contents of *test-db-data* into the window used to execute queries. And execute them all at once (or at least in the order that they are defined). The database for the site should be ready to use.

Make sure you have started the api by navigating into the /api directory and executing the command `npm run dev`.

Start the client in a similar way, navigating into the /client directory and executing the command `npm run serve`.

Among the entries added to the database were two users: one admin and one employee.

To log in, you can click the "Log in" button at the top right of the home page and enter the credentials: 

As an admin:
Email: `temp`
Password: `temp`

As an admin:
Email: `emp`
Password: `emp`

