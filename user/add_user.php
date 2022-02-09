<?php
    require_once(realpath(dirname(__FILE__) . "/../resources/config.php"));

    // Before run the webpages view, do the autentication
    user_authorized($roles=array('Admin', 'User'));

    // Views function
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $context = array(
            "title" => "User",
            "object" => $_POST
        );
        return render('user/user.php',$context);
    }
    
    // ...
    // ...

    $context = array(
        "title" => "User Pages",
    );

    // Call the function to pass the context and the target template
    return render('user/user.php',$context);
?>