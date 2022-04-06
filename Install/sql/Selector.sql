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
