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

function addUser($user,$name,$email,$pass) {
    $query = "INSERT INTO user (username, name, email, password) VALUES ('$user', '$name', '$email', '$pass')";
    echo "$query\n";
    $db = getConnection();
    if (mysqli_query($db,$query)) {
        echo "User Created\n";
    } else {
        echo "User Not Created\n";
        die();
    }
    closeConnection($db);
}

function addAssignment($assignmentName, $priority, $notes, $user, $duedate, $time) {
    $db = getConnection();
    $query = "INSERT INTO assignment (name, priority, notes, username, duedate, time) VALUES ('$assignmentName',$priority,'$notes','$user', '$duedate', '$time')";
    echo "$query\n";
    if (mysqli_query($db,$query)) {
        echo "Assignment Created\n";
    } else {
        echo "Assignment Not Created\n";
        die();
    }
    closeConnection($db);
}

function addEvent($eventName, $duration, $user) {
    $db = getConnection();
    
    $query = "INSERT INTO event (name, duration, username) VALUES ('$eventName','$duration','$user')";
    if (mysqli_query($db,$query)) {
        echo "Event Created\n";
    } else {
        echo "Event Not Created\n";
        die();
    }

    closeConnection($db);
}

?>
