-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--create a database called 'economic_elector'

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" boolean 
);

CREATE TABLE "elections"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR, 
	"date" date,
	"location" VARCHAR
);

CREATE TABLE "candidates"(
	"id" SERIAL PRIMARY KEY,
	"election_id" integer REFERENCES "elections",
	"name" VARCHAR,
	"running_for" VARCHAR,
	"email" VARCHAR,
	"incumbent" boolean
);

CREATE TABLE "budget_categories"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"past_allocation" MONEY,
	"election_id" integer REFERENCES "elections"

);


CREATE TABLE "budget_allocation"(
	"id" SERIAL PRIMARY KEY,
	"candidate_id" integer REFERENCES "candidates",
	"budget_category_id" integer REFERENCES "budget_categories",
	"amount" MONEY
);

-- here are some queries to hardcode an election into the database
INSERT INTO "elections" ("name", "date", "location")
VALUES ('Eden Prairie City Council', '09/18/2020', 'Eden Prairie');

INSERT INTO "candidates" ("election_id", "name", "running_for", "email", "incumbent")
VALUES (1, 'Duncan', 'Council member', '123@gmail.com', false),
(1, 'Shawn', 'Council member', '456@gmail.com', true);

INSERT INTO "budget_categories" ("name", "past_allocation", "election_id")
VALUES ('Parks and Rec', 2020, 1),
('Law Enforcement', 3000, 1),
('Education', 23300, 1),
('First Responders', 1000, 1),
('Public Works', 6400, 1),
('Administration', 2444000, 1),
('Community Development', 1000000000000, 1);

INSERT INTO "budget_allocation"("candidate_id", "budget_category_id", "amount")
VALUES(1, 1, 500),
(1, 2, 3000),
(1, 3, 5000),
(1, 4, 8000),
(1, 5, 1000),
(1, 6, 2000),
(1, 7, 33000),
(2, 1, 44000),
(2, 2, 55000),
(2, 3, 66000),
(2, 4, 77000),
(2, 5, 88000),
(2, 6, 99000),
(2, 7, 11000);