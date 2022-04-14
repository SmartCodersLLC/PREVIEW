-- year/default
SELECT id_a_year as id, p32 AS name FROM V_GetCurrentAcademicIdYear

-- year/list
SELECT id_a_year as id, p32 AS name
FROM a_year
WHERE (u_god BETWEEN YEAR(GETDATE()) - 4 AND YEAR(GETDATE()) + 1)

--kafedra/list
EXEC SP_RS_LMS_umk_userKafedra @id_AVN_user = 0

--umk/list
EXEC SP_RS_LMS_umk_kafedra_exist @year=${year}, @kafedra=${kafedra},  @id_rate=${rate}

--umk/detail
EXEC SP_RS_LMS_umk_kafedra_exist_detail 
                                @id_rate=${rate} , 
                                @id_typeUmk=${id_typeUmk}, 
                                @id_discipline=${id_discipline}, 
                                @id_teacher=${id_teacher}

                 
 