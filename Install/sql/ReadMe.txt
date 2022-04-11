
Настройка базы данных
1.  доступ к проц. SP_RS_LMS_umk_kafedra_exist в программе AVN17  полььзователю o_dekanat
2.  доступ к проц. SP_RS_LMS_umk_kafedra_exist_detail в программе AVN17  полььзователю o_dekanat
3. Таблицы =>  kafedra, educ_sh, a_year
4. View => V_GetCurrentAcademicIdYear
5. Добавить AVN_UMK в ID_PROG_ID  (таблица AVN_Prog_List.id_prog_id)
        INSERT INTO AVN.dbo.AVN_Prog_List
        (id_prog_id, description, version)
        VALUES(N'AVN_UMK', N'Проверка УМК', 1); 
        INSERT INTO AVN.dbo.Prog_Security
        (id_prog_list, id_sql_user)
        VALUES(SCOPE_IDENTITY(), 5);
6. Добавить доступ AVN_UMK каждому админу в кафедре программа AVN20 
    

Установка
1. Распакуйте папку  C:\AVN\nodeApps\UMK_CHECK
    -public (папка)
    -server.js (файл)
    -.env
    -package.json
    -package-lock.json
2. открыть путь  в терминале cmd.exe
    cd C:\AVN\nodeApps\UMK_CHECK
3. установить пакеты 
    npm i
4. настроить .env
    -PORT=3150 (для УМК 3150 если не занято другим приложением)
    -DBSERVER=192.168.100.50 (IP-адрес MSSQL внутренний)
    -NODE_ENV='production'
    -ID_PROG_ID='AVN_UMK'
    -UMK_PATH='F:\\LMS\\BOOKS\\' (путь УМК)
    остальные не трогать
 5. Запуск
    pm2 start server.js --name=UMK
    pm2 save
6. проверить 
    http://localhost:3150


IIS настройка
1. Добавить приложение
    -название(ПСЕВДОНИМ) avnumk   
    -путь(ФИЗИЧЕСКИЙ ПУТЬ) C:\AVN\nodeApps\UMK_CHECK\public
2. переопределение URL-адресов 
    проверьте правила если нет ДОБАВИТЬ ПЕРЕНАПРАВЛЕНИЕ К 3150
    если есть ВКЛЮЧИТЬ ПРАВИЛО  
        DefaultWebSite > avnumk > переопределение URL-адресов >  обратный прокси-сервер
        -сервер для перенаправления 
            http://localhost:3150
        -тип действия
            переопределение
        -URL-адрес
            http://localhost:3150/{R:1}

3. проверить 
    http://avn.SITE.kg/avnumk

4.  Добавить ссылку на портале 
    C:\AVN\avnsite\index.html      

        <div class="col-lg-4 col-md-6 col-sm-12 col-12">
            <a href="http://avn.SITE.kg/avnumk" 
                class="box__col" id="50">
                <img src="icon/Ellipse 7.png" alt="УМК по кафедрам" />
                <span class="title__box">УМК по кафедрам</span>
            </a>
        </div> 