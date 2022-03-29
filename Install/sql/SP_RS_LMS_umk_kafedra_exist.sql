CREATE PROCEDURE SP_RS_LMS_umk_kafedra_exist
                 @year int,
                 @id_rate int,
                 @kafedra int

AS
BEGIN

	SET NOCOUNT ON;


;With t_ed_sh_disc As(SELECT dbo.educ_sh.id_a_year, dbo.a_year.p32, dbo.faculty.id_faculty, dbo.faculty.[p23-2], 
                             dbo.educ_sh.id_speciality, dbo.specialityV.p25_2, 
                             dbo.educ_sh.id_semester, semester.p43, 
                             dbo.educ_sh.id_discipline, dbo.discipline.p34, dbo.kafedra.sn_f1, dbo.educ_sh.id_kafedra, dbo.kafedra.f1
                       FROM dbo.educ_sh INNER JOIN dbo.specialityV ON dbo.educ_sh.id_speciality = dbo.specialityV.id_speciality 
                                        INNER JOIN dbo.discipline ON dbo.educ_sh.id_discipline = dbo.discipline.id_discipline 
                                        INNER JOIN dbo.a_year ON dbo.educ_sh.id_a_year = dbo.a_year.id_a_year 
                                        INNER JOIN dbo.semester ON dbo.educ_sh.id_semester = semester.id_semester 
                                        INNER JOIN dbo.faculty ON dbo.specialityV.id_faculty = dbo.faculty.id_faculty 
                                        INNER JOIN dbo.kafedra ON dbo.educ_sh.id_kafedra = dbo.kafedra.id_kafedra
                       WHERE dbo.educ_sh.id_a_year = @year
                         AND dbo.semester.id_rate = @id_rate 
                         AND dbo.educ_sh.id_kafedra = @kafedra
                         )

   
     , t_UMK As (SELECT     dbo.T_Books.id_semester, dbo.T_Books.id_discipline, dbo.T_Books.id_human, dbo.T_Books.id_typeUmk, dbo.T_UmkType.umkName, dbo.T_UmkType.[order] AS sort, 
                      COUNT(dbo.T_Books.id_books) AS kol
FROM         dbo.T_Books INNER JOIN
                      dbo.T_UmkType ON dbo.T_Books.id_typeUmk = dbo.T_UmkType.id_typeUmk INNER JOIN
                      dbo.semester ON dbo.T_Books.id_semester = dbo.semester.id_semester
WHERE     (dbo.T_Books.id_humanType = 1) AND (dbo.T_Books.isDeleted <> 1) AND (dbo.semester.id_rate = @id_rate)
GROUP BY dbo.T_Books.id_semester, dbo.T_Books.id_discipline, dbo.T_Books.id_human, dbo.T_Books.id_typeUmk, dbo.T_UmkType.umkName, dbo.T_UmkType.[order])
                    
                    
                    
Select t_ed_sh_disc.id_a_year, 
      -- t_ed_sh_disc.p32, 
       rate.id_rate, 
       rate.p22 AS rate,
       t_ed_sh_disc.id_kafedra,
       --t_ed_sh_disc.f1, 
       t_ed_sh_disc.id_discipline, 
       t_ed_sh_disc.p34,
       IsNull(t_fio.id_teacher,-1) as id_teacher,  
       IsNull(t_fio.s_t_fio, '---') as s_t_fio,
       IsNull(t_UMK.id_typeUmk, 0) as id_typeUmk, 
       IsNull(t_UMK.umkName,'Отсутствует') as umkName,
       IsNull(t_UMK.sort, -1) as sort,
       IsNull(t_UMK.kol,0)as kol
FROM semester INNER JOIN t_ed_sh_disc ON semester.id_semester = t_ed_sh_disc.id_semester 
              INNER JOIN rate ON semester.id_rate = rate.id_rate 
              LEFT OUTER JOIN t_fio 
              INNER JOIN  
              t_UMK ON t_fio.id_teacher = t_UMK.id_human ON t_ed_sh_disc.id_discipline = t_UMK.id_discipline
              
GROUP BY t_ed_sh_disc.id_a_year, 
      -- t_ed_sh_disc.p32, 
       rate.id_rate, 
       rate.p22,
       t_ed_sh_disc.id_kafedra,
       --t_ed_sh_disc.f1, 
       t_ed_sh_disc.id_discipline, 
       t_ed_sh_disc.p34,
       t_fio.id_teacher,  
       t_fio.s_t_fio,
       t_UMK.id_typeUmk, 
       t_UMK.umkName,
       t_UMK.sort, 
       t_UMK.kol



END
 

