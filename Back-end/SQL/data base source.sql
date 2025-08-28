CREATE DATABASE Hotels_Source;
GO

USE Hotels_Source;
GO

CREATE TABLE Source_Competitors_Prices (
    Hotel_id_src INT,
    devise_src NVARCHAR(6),
	date_srce date,
    Prix_src MONEY
);
select * from Source_Competitors_Prices ;

CREATE TABLE Match(
    name NVARCHAR(6)
);

CREATE TABLE No_Match(
    name NVARCHAR(6)
);
TRUNCATE TABLE Match1;
select * from no_match1;
select * from match1;

DROP TABLE no_match;


CREATE TABLE [Match] (
    [Hotel_id_src] int,
    [devise_src] nvarchar(6),
    [date_srce] date,
    [Prix_src] money,
    [Date_id_true_src] int
)

CREATE TABLE [No_Match] (
    [Hotel_id_src] int,
    [devise_src] nvarchar(6),
    [date_srce] date,
    [Prix_src] money
)

select * from match;
select * from no_match;

CREATE TABLE Source_Reservation (
    Reservation_id INT PRIMARY KEY IDENTITY(1,1),
    Hotel_id_src INT,
    Room_id_src INT,
    Inventory_multiplier_src FLOAT,
    Demand_multiplier_src FLOAT,
    Reservation_date_src date,
    Arrival_date_src date,
    Departure_date_src date,
    Stay_duration_src INT,
    Occupancy_rate_reservation_src FLOAT,
    Occupancy_rate_arrival_src FLOAT,
    Devise_src NVARCHAR(20),
    Channel_src NVARCHAR(25),
    OTA_site_src NVARCHAR(20),
    OTA_commission_src FLOAT,
    Fixed_Cost_src MONEY,
    Base_rate_src FLOAT,
    Paid_price_src MONEY,
);
select * from [dbo].[Inter_5]
select * from Source_Reservation;
ALTER TABLE Source_Reservation
ALTER COLUMN Reservation_id_src NVARCHAR(30);

SELECT *
FROM Source_Reservation
WHERE Reservation_id_src = 'BK6123180';

select * from [dbo].[intermediaire booking res_id];

select * from [dbo].[Inter_1];
select * from [dbo].[Inter_2];
select * from [dbo].[Inter_3];
select * from [dbo].[Inter_4];
select * from [dbo].[Inter_5];
select * from Source_Reservation;


truncate table [dbo].[Inter_3];

CREATE TABLE [aa] (
    [Hotel_id_src] int,
)
select * from aa;
truncate table aa;

SELECT * FROM [dbo].[Inter_1] WHERE Reservation_id = 50;
SELECT * FROM [dbo].[Inter_2] WHERE Reservation_id = 50;
SELECT * FROM [dbo].[Inter_3] WHERE Reservation_id = 50;

select * from [dbo].[Source_Reservation]

UPDATE [dbo].[Source_Reservation]
SET OTA_site_src = 'no_site'
WHERE OTA_site_src IS NULL;

UPDATE [dbo].[Inter_4]
SET OTA_commission_src = 0
WHERE OTA_commission_src IS NULL;

select * from [dbo].[sort1]
select * from [dbo].[sort]

SELECT *
FROM [dbo].[occ rate]
WHERE Hotel_id = 353
  AND Month = 12
  AND Year = 2024;

select * from [dbo].[Source_Reservation]
select * from [dbo].[standard_room]
select * from [dbo].[daily_revenue]
select * from [dbo].[daily_revenue_sorted]
select * from [dbo].[fact_res_plus_daily_rev]

ALTER TABLE [dbo].[fact_res_plus_daily_rev]
ADD RevPAR_src money;

select * from [dbo].[Join-Res_Room]
select * from [dbo].[calcul_revpar]
select * from [dbo].[calcul_adr]
select * from [dbo].[fact_res_plus_daily_rev]
select * from [dbo].[res_src_fin]