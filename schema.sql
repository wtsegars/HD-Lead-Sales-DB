DROP DATABASE IF EXISTS hd_leadssalesdb;

CREATE DATABASE hd_leadssalesdb;

USE hd_leadssalesdb;

CREATE TABLE july_2019_leadsandsales(
	departments VARCHAR(10) NOT NULL,
    dept_weekly_goals INT(3) NOT NULL,
    week_one_dept_leads INT(15),
    week_two_dept_leads INT(15),
    week_three_dept_leads INT(15),
    week_four_dept_leads INT(15),
    made_goals VARCHAR(5) NOT NULL,
	exceeds_goals VARCHAR(5)
);

USE hd_leadssalesdb;

SELECT * FROM july_2019_leadsandsales;