<?php

   
$arr = array(
    
        1 => 
            array('01-homepage.html', 'Главная ()', false),
            array('01-homepage2.html', 'Главная #2 ()', false),
            array('01-homepage3.html', 'Главная #3 ()', false),
            array('02-borrower.html', 'Заемщики ()', true),
            array('02-borrower2.html', 'Займы ()', true),
            array('02-borrower3.html', 'Просрочки ()', true),
            array('02-borrower4.html', 'Займы debt ()', true),
            array('02-borrower5.html', 'Заемщики #5 ()', true),
            array('02-borrower6.html', 'Заемщики #6 ()', true),
            array('02-borrower7.html', 'Заемщики #7 ()', true),
            array('02-borrower8.html', 'Заемщики #8 ()', true),
            array('02-borrower9.html', 'Заемщики #9 ()', true),
            array('02-borrower10.html', 'Заемщики #10 ()', true),
            array('03-settings.html', 'Настройки ()', true),
            array('03-settings2.html', 'Настройки #2 ()', true),
            array('03-settings3.html', 'Настройки #3 ()', true),
    
);

if (isset($_GET['q']) && isset($arr[ (int) $_GET['q'] ])) {
        
    
        $item = $arr[ (int) $_GET['q'] ];   
    
}


?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>WM Profit / <?php print isset($item[1]) ? $item[1] : "index"; ?></title>
    <script src="static/js/jquery-min.js"></script>
    <script src="static/js/minibar.min.js"></script>
    <script src="static/js/swiper.min.js"></script>
    <script src="static/js/tooltipster.bundle.min.js"></script>
    <script src="static/js/tooltipster-follower.min.js"></script>
    <script src="static/js/imagesloaded-pkgd-min.js"></script>
    <script src="static/js/jquery.maskedinput.min.js"></script>
    <link href="static/css/main.css?v<?php print time(); ?>" rel="stylesheet" type="text/css">
    <link href="banner/wmp-banner.css" rel="stylesheet" type="text/css">
    <link href="static/img/favicon.svg" rel="icon" type="image/svg+xml">
</head>

<body class="document loading">

    <?php
   
    
    if (isset($item)) {
        
     
        include("tpls/00-svg.html"); 
    
    
    ?>

    <div class="preloader"></div>


    <div class="container" id="top">

        
        <?php include("tpls/00-header.html"); ?>

        <div class="main">


            <?php include( "tpls/" . $item[0] ); ?>


        </div>

        <?php include("tpls/00-footer.html"); ?>


    </div>


    <?php 
        
        include("tpls/00-popup-2.html");
        include("tpls/00-popup-6.html");
        include("tpls/00-popup-8.html");
        include("tpls/00-popup-9.html");
        include("tpls/00-popup-10.html");
        include("tpls/00-popup-11.html");
        
    ?>

    <div class="popup-overlay js-popup-close"></div>



    <script src="static/js/demo.js?v<?php print time(); ?>"></script>




    <?php
        
    } else {
        
    ?>
    <table style="border-collapse:separate;border-spacing: 20px 10px;">


        <?php
        foreach ($arr as $k => $v) {
            
            
            print "<tr>";
            print "<td>".$k.".</td><td><a href=\"?q=".$k."&v=1\" style=\"cursor:pointer!important;\">".$v[1]."</a></td>";
            print "</tr>";
            
            
        }
        
    ?>

    </table>
    <script>
        $(".document").removeClass("loading");

    </script>

    <?php
        
    }
    
    
    
    ?>


</body>

</html>
