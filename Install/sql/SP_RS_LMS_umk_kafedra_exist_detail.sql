 
Create PROCEDURE SP_RS_LMS_umk_kafedra_exist_detail
                 @id_rate int,
                 @id_typeUmk int,
                 @id_discipline int,
                 @id_teacher int
                 
AS
BEGIN

	SET NOCOUNT ON;

SELECT     dbo.T_Books.id_semester, semester_1.p43, dbo.T_Books.id_discipline, dbo.discipline.p34, dbo.t_fio.id_teacher, dbo.t_fio.t_fio, dbo.T_Books.id_typeUmk, dbo.T_UmkType.umkName, 
                      dbo.T_Books.name, dbo.T_Books.description, dbo.T_Books.id_books AS id, dbo.T_Books.fileName
FROM         dbo.T_Books INNER JOIN
                      dbo.T_UmkType ON dbo.T_Books.id_typeUmk = dbo.T_UmkType.id_typeUmk INNER JOIN
                      dbo.semester ON dbo.T_Books.id_semester = dbo.semester.id_semester INNER JOIN
                      dbo.t_fio ON dbo.T_Books.id_human = dbo.t_fio.id_teacher INNER JOIN
                      dbo.semester AS semester_1 ON dbo.T_Books.id_semester = semester_1.id_semester INNER JOIN
                      dbo.discipline ON dbo.T_Books.id_discipline = dbo.discipline.id_discipline
WHERE dbo.T_Books.id_humanType = 1 
  AND dbo.T_Books.isDeleted <> 1 
  AND dbo.semester.id_rate = @id_rate 
  AND dbo.T_Books.id_typeUmk = @id_typeUmk 
  AND dbo.T_Books.id_discipline = @id_discipline
  AND dbo.t_fio.id_teacher = @id_teacher

END
 