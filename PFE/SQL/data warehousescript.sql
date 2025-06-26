CREATE DATABASE HotelDW;
GO

USE HotelDW;
GO

CREATE SCHEMA Dim;
GO

CREATE TABLE Dim.Region (
    Region_id INT PRIMARY KEY IDENTITY(1,1),
    Region_name VARCHAR(50)
);

ALTER TABLE Dim.Region
ALTER COLUMN Region_name NVARCHAR(50)

SELECT * FROM Dim.Region;
DELETE FROM Dim.Region;

DROP TABLE Dim_Region;


CREATE TABLE Dim.Hotel (
    Hotel_id INT PRIMARY KEY IDENTITY(1,1),
    Hotel_name VARCHAR(200),
    Nombre_Etoiles INT,
    Location VARCHAR(10),
    Fixed_Cost_Single_Room FLOAT,
    Type VARCHAR(15),
    Nbre_Rooms INT,
    Region_id INT,
    base_rate FLOAT,
    FOREIGN KEY (Region_id) REFERENCES Dim.Region(Region_id)
);
ALTER TABLE Dim.Hotel
ADD Region_name NVARCHAR(50);
ALTER TABLE Dim.Hotel
ALTER COLUMN Type NVARCHAR(15);
SELECT * FROM Dim.Hotel

CREATE TABLE Dim.Room (
    Room_id INT PRIMARY KEY IDENTITY(1,1),
    Hotel_id INT,
    Room_Type NVARCHAR(20),
    Room_Count INT,
    Room_View NVARCHAR(30),
    Fixed_Cost FLOAT
);
DBCC CHECKIDENT ('Dim.Room', RESEED, 99);

ALTER TABLE Dim.Room
ALTER COLUMN Room_View NVARCHAR(30);
select * from dim.Hotel
SELECT * FROM Dim.Room

SELECT CONSTRAINT_NAME 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'Fact' AND TABLE_NAME = 'Reservation';

-- Correct command to drop the Room foreign key constraint  we have to drop the constraint before trying to drop a table that is referenced by another foreign key
ALTER TABLE [Fact].[Reservation] 
DROP CONSTRAINT [FK__Reservati__Room___45F365D3];

truncate table Dim.Room;
DELETE FROM Dim.Room; 

ALTER TABLE Fact.Reservation
ADD CONSTRAINT FK_Reservation_Room
FOREIGN KEY (Room_id) REFERENCES Dim.Room(Room_id);


UPDATE Dim.Room
SET Room_id= Room_id+ 1000000;


CREATE TABLE Dim.Time (
    Date_id INT PRIMARY KEY IDENTITY(1,1),
    Full_date DATE,
    Year INT,
    Month_name NVARCHAR(25),
    Month_nbre INT,
    Week_day nVARCHAR(15),
	Is_week_end TINYINT,
	Season VARCHAR(20)
);

ALTER TABLE Dim.Time
ALTER COLUMN Season NVARCHAR(20);
SELECT * FROM Dim.Time;

CREATE TABLE Dim.Sale_Channel (
    Channel_id INT PRIMARY KEY IDENTITY(1,1),
    Channel_name VARCHAR(20)
);

ALTER TABLE Dim.Sale_Channel
ALTER COLUMN Channel_name  NVARCHAR(20);

SELECT * FROM Dim.Sale_Channel

CREATE TABLE Dim.OTA_site (
    Site_id INT PRIMARY KEY IDENTITY(1,1),
    Site_name VARCHAR(200)
);
ALTER TABLE Dim.OTA_site
ALTER COLUMN Site_name  NVARCHAR(200);
SELECT * FROM Dim.OTA_site;

SET IDENTITY_INSERT Dim.OTA_site ON;

INSERT INTO Dim.OTA_site (Site_id, Site_name)
VALUES (5, 'no_site');

SET IDENTITY_INSERT Dim.OTA_site OFF;


CREATE SCHEMA FACT;
GO

DROP SCHEMA FACT;
CREATE SCHEMA Fact;

CREATE TABLE Fact.Reservation (
    Reservation_id INT PRIMARY KEY IDENTITY(1,1),
    Hotel_id INT,
    Room_id INT,
    Inventory_multiplier FLOAT,
    Demand_multiplier FLOAT,
    Reservation_date_id INT,
    Arrival_date_id INT,
    Departure_date_id INT,
    Stay_duration INT,
    Occupancy_rate_reservation FLOAT,
    Occupancy_rate_arrival FLOAT,
    Devise VARCHAR(20),
    Channel_id INT,
    OTA_site_id INT,
    OTA_commission FLOAT,
    Fixed_Cost MONEY,
    Base_rate FLOAT,
    Paid_price MONEY,
    Booking_lead_time INT,
    FOREIGN KEY (Hotel_id) REFERENCES Dim.Hotel(Hotel_id),
    FOREIGN KEY (Room_id) REFERENCES Dim.Room(Room_id),
    FOREIGN KEY (Reservation_date_id) REFERENCES Dim.Time(Date_id),
    FOREIGN KEY (Arrival_date_id) REFERENCES Dim.Time(Date_id),
    FOREIGN KEY (Departure_date_id) REFERENCES Dim.Time(Date_id),
    FOREIGN KEY (Channel_id) REFERENCES Dim.Sale_Channel(Channel_id),
    FOREIGN KEY (OTA_site_id) REFERENCES Dim.OTA_site(Site_id)
);
ALTER TABLE Fact.Reservation 
ALTER COLUMN Devise NVARCHAR(20);

select* from Fact.Reservation 
select* from dim.Room


CREATE TABLE Fact.Competitors_Prices (
    Hotel_id INT,
    devise VARCHAR(6),
    Date_id INT,
    Prix MONEY,
    FOREIGN KEY (Hotel_id) REFERENCES Dim.Hotel(Hotel_id),
    FOREIGN KEY (Date_id) REFERENCES Dim.Time(Date_id)
);
ALTER TABLE Fact.Competitors_Prices
ALTER COLUMN devise  NVARCHAR(6);

SELECT * FROM Fact.Competitors_Prices;

CREATE TABLE Fact.Monthly_KPIs (
    Hotel_id INT,
    Year INT,
    Month INT,
    Monthly_Revenue_TND MONEY,
	Market_share FLOAT,
	ADR FLOAT,
	RevPAR MONEY,
	Booking_Pace FLOAT,
    FOREIGN KEY (Hotel_id) REFERENCES DiM.Hotel(Hotel_id)
);
ALTER TABLE Fact.Monthly_KPIs 
ADD KPI_id INT IDENTITY(1,1) PRIMARY KEY;
ALTER TABLE Fact.Monthly_KPIs
ADD Nbre_of_Days INT;
UPDATE Fact.Monthly_KPIs
SET Nbre_of_Days = DAY(EOMONTH(
    CAST([Year] AS VARCHAR(4)) + '-' + 
    RIGHT('0' + CAST([Month] AS VARCHAR(2)), 2) + '-01'
));

SELECT * From Fact.Monthly_KPIs;
select * from [Fact].[Reservation]
truncate table [Fact].[Reservation]

SELECT *
FROM Fact.Monthly_KPIs
WHERE Hotel_id = 162
  AND Month = 9
  AND Year = 2023;

ALTER TABLE [Fact].[Reservation]
ADD Daily_Revenue Money,
    RevPAR Money,
    ADR Money;

select * from [Fact].[Monthly_KPIs]

CREATE TABLE Fact.KPIs (
    KPI_id INT IDENTITY(1,1) PRIMARY KEY,
    Hotel_id INT,
    Year INT,
    Month INT,
	Nbre_of_Days INT,
    Monthly_Revenue_TND MONEY,
	Market_share FLOAT,
    FOREIGN KEY (Hotel_id) REFERENCES DiM.Hotel(Hotel_id)
);
ALTER TABLE Fact.Monthly_KPIs 
ADD KPI_id INT IDENTITY(1,1) PRIMARY KEY;
ALTER TABLE Fact.Monthly_KPIs
ADD Nbre_of_Days INT;

select * from [Fact].[Reservation]
DROP TABLE [Fact].[Monthly_KPIs]
