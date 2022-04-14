CREATE PROCEDURE SP_RS_LMS_umk_userKafedra
				@id_AVN_user int =0
                 
AS
BEGIN

	SET NOCOUNT ON;
            -- Доступ к кафедрам
            SELECT dbo.User_Kafedra.id_kafedra, dbo.kafedra.f1 as name
            FROM  dbo.User_Kafedra INNER JOIN dbo.kafedra ON dbo.User_Kafedra.id_kafedra = dbo.kafedra.id_kafedra 
                              INNER JOIN dbo.AVN_User ON dbo.User_Kafedra.id_login = dbo.AVN_User.id_AVN_user
            WHERE dbo.AVN_User.id_AVN_user = @id_AVN_user AND dbo.AVN_User.visible = 1 AND dbo.AVN_User.activ = 1
            ORDER BY dbo.kafedra.f1

END