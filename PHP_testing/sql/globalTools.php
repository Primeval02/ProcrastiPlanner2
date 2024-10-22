<?php
require_once('./config.php');

function getConnection() {
    $mysqli = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['database']);

    if (!$mysqli) {
        echo "Cannot Connect to Database\n";
        die();
    }
    return $mysqli;
}

function closeConnection($mysqli) {
    mysqli_close($mysqli);
}

function sessionVerify($userId) {
    //session_start();
    //$sessionId = session_id();
    $db = getConnection();
    $query = "SELECT id FROM user where id = ?";
    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt,'i',$userId);
    if(mysqli_stmt_execute($stmt)) {
        return true;
    } else {
        return false;
    }
    /*if($sessionId== $session) {
        return true;
    } else {
        return false;
    }*/
}
?>
