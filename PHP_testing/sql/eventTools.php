<?php
require_once('globalTools.php');
require_once('validation.php');

date_default_timezone_set("America/Los_Angeles");
ini_set('error_log', 'error.log');

function addEvent($event) {
$db = getConnection();

    $query = <<<SQL
        INSERT INTO event
        (name,duration, userId, eventDate)
        values (?,?,?,?);
SQL;

    if (!preg_match('/^[\w\-\$\ \@]{1,50}$/',$event['name'])) {
        $result = "Invalid Event Name";
        return $result;
    } else if (!preg_match('/^\d\d:\d\d:\d\d$/',$event['duration'])) {
        $result = "Invalid Event Duration";
        return $result;
    }
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'ssis',
        $event['name'],
        $event['duration'],
        $event['userId'],
        $event['eventDate']);
    if (mysqli_stmt_execute($stmt)) {
        $result = "Event Created";
    } else {
        $result = "Event not Created";
    }
    closeConnection($db);
    return $result;
}
function removeEvent($id) {
$db = getConnection();

    $query = "DELETE FROM event where id=?";
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);

    closeConnection($db);
}

function findSingleEvent($userId,$eventName) {
$db = getConnection();
$query = "SELECT * FROM event where userId=? and name=?";

$stmt = mysqli_prepare($db,$query);
mysqli_stmt_bind_param($stmt, 'is', $userId, $eventName);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$eventInfo = [];

while ($row = mysqli_fetch_assoc($result)) {
    $event = [];
    $event['id'] = $row['id'];
    $event['name'] = $row['name'];
    $event['duration'] = $row['duration'];
    $event['eventDate'] = $row['eventDate'];
    $event['complete'] = $row['complete'];
    $eventInfo[] = $event;
}
closeConnection($db);
return $eventInfo;
}

function findEvent($userId) {
$db = getConnection();

    $query = "SELECT * FROM event where userId=?";

    
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'i', $userId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $eventInfo = [];

    while ($row = mysqli_fetch_assoc($result)) {
    $event = [];
    $event['id'] = $row['id'];
    $event['name'] = $row['name'];
    $event['duration'] = $row['duration'];
    $event['eventDate'] = $row['eventDate'];
    $event['complete'] = $row['complete'];
    $eventInfo[] = $event;
    }
    closeConnection($db);
    return $eventInfo;
}

function eventIsComplete($id, $userId) {
    $db = getConnection();

    $query = "UPDATE event SET complete = 1 WHERE userId=? AND id=?";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'ii', $userId, $id);
    
    if(mysqli_execute($stmt)) {
        $result = "Event is Complete";
        closeConnection($db);
        return $result;
    } else {
        $result = "Error in Marking Event Complete";
        closeConnection($db);
        return $result;
    }

}

function dumpEvent() {
$db = getConnection();

    $query = "DELETE FROM event";
    mysqli_query($db,$query);

    closeConnection($db);}

?>
