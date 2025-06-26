DECLARE @CurrentDate DATE = '2022-12-20';
DECLARE @EndDate DATE = '2025-01-13';

WHILE @CurrentDate <= @EndDate
BEGIN
    INSERT INTO Dim.Time (
        Full_date,
        Year,
        Month_name,
        Month_nbre,
        Week_day,
        Is_week_end,
        Season
    )
    VALUES (
        @CurrentDate,
        YEAR(@CurrentDate),
        DATENAME(MONTH, @CurrentDate),
        MONTH(@CurrentDate),
        DATENAME(WEEKDAY, @CurrentDate),
        CASE WHEN DATENAME(WEEKDAY, @CurrentDate) IN ('Saturday', 'Sunday') THEN 1 ELSE 0 END,
        CASE 
            WHEN MONTH(@CurrentDate) IN (12, 1, 2) THEN 'Winter'
            WHEN MONTH(@CurrentDate) IN (3, 4, 5) THEN 'Spring'
            WHEN MONTH(@CurrentDate) IN (6, 7, 8) THEN 'Summer'
            ELSE 'Autumn'
        END
    );

    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;

SELECT * FROM Dim.Time


DECLARE @CurrentDate DATE = '2025-01-14';
DECLARE @EndDate DATE = '2026-01-01';

WHILE @CurrentDate <= @EndDate
BEGIN
    INSERT INTO Dim.Time (
        Full_date,
        Year,
        Month_name,
        Month_nbre,
        Week_day,
        Is_week_end,
        Season
    )
    VALUES (
        @CurrentDate,
        YEAR(@CurrentDate),
        DATENAME(MONTH, @CurrentDate),
        MONTH(@CurrentDate),
        DATENAME(WEEKDAY, @CurrentDate),
        CASE WHEN DATENAME(WEEKDAY, @CurrentDate) IN ('Saturday', 'Sunday') THEN 1 ELSE 0 END,
        CASE 
            WHEN MONTH(@CurrentDate) IN (12, 1, 2) THEN 'Winter'
            WHEN MONTH(@CurrentDate) IN (3, 4, 5) THEN 'Spring'
            WHEN MONTH(@CurrentDate) IN (6, 7, 8) THEN 'Summer'
            ELSE 'Autumn'
        END
    );

    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;
