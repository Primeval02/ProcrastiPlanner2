<?php
require_once('globalTools.php');

date_default_timezone_set("America/Los_Angeles");
ini_set('error_log', 'error.log');

function hashPassword($password) {
    if (!preg_match('/^[a-zA-Z0-9\?\*\!\%\#\&\@]{13,20}$/',$password)) {
        echo "Please Enter a Valid password\n";
        die();
    }
    $result = password_hash($password, PASSWORD_DEFAULT);
    return $result;
}

function passwordVerify($password, $username) {
    $db = getConnection();

    $query = "SELECT * FROM user WHERE username=?";
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt,'s',$username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    $row = mysqli_fetch_assoc($result);
    $hash = $row['password'];
    
    if (password_verify($password,$hash)) {
        //session_start();
        $query = "SELECT id, username FROM user WHERE username=?";
        $stmt = mysqli_prepare($db,$query);
        mysqli_stmt_bind_param($stmt,'s',$username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        $test['userId'] = $row['id'];
        //$test['session'] = session_id();
        $test['username'] = $row['username'];
        closeConnection($db);
        return $test;
    } else {
        closeConnection($db);
        return false;
    }
}

function logoutUser() {
    //session_start();
    //session_regenerate_id();
    $result = "Logged out successfully";
    return $result;
}

function addUser($user) {
    $db = getConnection();
    $result = "";
    $query = <<<SQL
        INSERT INTO user
        (username, name,
         email, password)
        values (?,?,?,?);
SQL;

    if (!preg_match('/^[\w\-\$\ \@]{1,16}$/',$user['username'])) {
        $result = "Invalid Username";
        return $result;
    } else if (!preg_match('/^[a-zA-Z]{1,10}[ ]?[a-zA-Z]{0,10}[\-]?[a-zA-Z]{0,10}$/',$user['name'])) {
        $result = "Invalid Name";
        return $result;
    } else if (!preg_match('/^[\w\-\.]+@[\w]+\.[a-z]{2,4}$/',$user['email'])) {
        $result = "Invalid Email";
        return $result;
    }
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'ssss',
        $user['username'],
        $user['name'],
        $user['email'],
        $user['password']);
    if (mysqli_stmt_execute($stmt)) {
        closeConnection($db);
        return true;
    }
    closeConnection($db);
    return $result;
}

function removeUser($username) {
    $db = getConnection();

    $query = "DELETE FROM user where username=?";
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 's', $username);
    mysqli_stmt_execute($stmt); 
    closeConnection($db);
}

function findUser($userId) {
    $db = getConnection();
   
    $query = "SELECT * FROM user where id=?";
    
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'i', $userId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $userInfo = [];

    $row = mysqli_fetch_assoc($result);
    $user = [];

    $user['username'] = $row['username'];
    $user['name'] = $row['name'];
    $user['email'] = $row['email'];
    $userInfo[] = $user;

    closeConnection($db);
    return $userInfo;

}

function dropUser() {
    $db = getConnection();

    $query = "DELETE FROM user";
    mysqli_query($db,$query);

    closeConnection($db);
}

?>
