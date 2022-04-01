-- year/default
SELECT id_a_year as id, p32 AS name FROM V_GetCurrentAcademicIdYear

-- year/list
SELECT id_a_year as id, p32 AS name
FROM a_year
WHERE (u_god BETWEEN YEAR(GETDATE()) - 4 AND YEAR(GETDATE()) + 1)

--kafedra/list
SELECT kafedra.id_kafedra, kafedra.f1 as name
FROM kafedra INNER JOIN educ_sh ON kafedra.id_kafedra = educ_sh.id_kafedra
WHERE educ_sh.id_a_year = ${year}
GROUP BY kafedra.id_kafedra, kafedra.f1
ORDER BY kafedra.f1

--umk/list
EXEC SP_RS_LMS_umk_kafedra_exist @year=${year}, @kafedra=${kafedra},  @id_rate=${rate}

--umk/detail
EXEC SP_RS_LMS_umk_kafedra_exist_detail 
                                @id_rate=${rate} , 
                                @id_typeUmk=${id_typeUmk}, 
                                @id_discipline=${id_discipline}, 
                                @id_teacher=${id_teacher}



--check/exist
IF NOT EXISTS(
                SELECT TOP 1 1
                    FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE 
                    [TABLE_NAME] = 'T_Books'
                    AND [COLUMN_NAME] = 'exist'
            )
    BEGIN
        ALTER TABLE AVN.dbo.T_Books ADD exist bit DEFAULT 1 NOT NULL;
    END

SELECT  top 10 id_books, fileName, isDeleted FROM dbo.T_Books where exist=1

UPDATE AVN.dbo.T_Books
        SET isDeleted=1, 
        exist=0
        WHERE id_books=${id}


--check/directory
IF NOT EXISTS(
                SELECT TOP 1 1
                    FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE 
                    [TABLE_NAME] = 'T_Books_Exist'
            )
    BEGIN
         -- Drop table

        -- DROP TABLE AVN.dbo.T_Books_Exist;

        CREATE TABLE AVN.dbo.T_Books_Exist (
            id int IDENTITY(1,1) NOT NULL,
            id_books int NOT NULL,
            fileName nvarchar(255) COLLATE Cyrillic_General_CI_AS NOT NULL,
            valid bit DEFAULT 1 NOT NULL,
        );
    END

DELETE FROM AVN.dbo.T_Books_Exist


INSERT INTO AVN.dbo.T_Books_Exist
(id, fileName, valid)
VALUES(${id}, N'${file}', ${isValid});