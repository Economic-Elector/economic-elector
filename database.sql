
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

create a database called 'economic_elector'

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" boolean 
);

INSERT INTO "user"
VALUES (1, 'duncan', 'duncan', true);


CREATE TABLE "elections"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR, 
	"date" date,
	"location" VARCHAR
);

INSERT INTO "elections" ("name", "date", "location")
VALUES ('Eden Prairie City Council', '09/18/2020', 'Eden Prairie');

CREATE TABLE "candidates"(
	"id" SERIAL PRIMARY KEY,
	"election_id" integer REFERENCES "elections",
	"name" VARCHAR,
	"running_for" VARCHAR,
	"email" VARCHAR,
	"incumbent" boolean
);

INSERT INTO "candidates" ("election_id", "name", "running_for", "email", "incumbent")
VALUES (1, 'Duncan', 'Council member', '123@gmail.com', false),
(1, 'Shawn', 'Council member', '456@gmail.com', true);

CREATE TABLE "budget_categories"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
);

INSERT INTO "budget_categories" ("name", "past_allocation", "election_id")
VALUES ('Parks and Rec', 2000, 1),
('Law Enforcement', 2000, 1),
('Education', 2000, 1),
('First Responders', 2000, 1),
('Public Works', 2000, 1),
('Administration', 2000, 1),
('Community Development', 2000, 1);

CREATE TABLE "budget_allocation"(
	"id" SERIAL PRIMARY KEY,
	"candidate_id" integer REFERENCES "candidates",
	"budget_category_id" integer REFERENCES "budget_categories",
	"amount" MONEY
);

INSERT INTO "budget_allocation"("candidate_id", "budget_category_id", "amount")
VALUES(1, 1, 2000),
(1, 2, 2000),
(1, 3, 2000),
(1, 4, 2000),
(1, 5, 2000),
(1, 6, 2000),
(1, 7, 2000),
(2, 1, 2000),
(2, 2, 2000),
(2, 3, 2000),
(2, 4, 2000),
(2, 5, 2000),
(2, 6, 2000),
(2, 7, 2000);
