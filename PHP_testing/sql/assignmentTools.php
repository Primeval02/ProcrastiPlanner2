<?php
require_once('globalTools.php');
require_once('validation.php');

date_default_timezone_set("America/Los_Angeles");
ini_set('error_log', 'error.log');

function addAssignment($assignment) {
    $db = getConnection();

    $query = <<<SQL
        INSERT INTO assignment
        (name, priority, notes, duedate, time, userId)
        values (?,?,?,?,?,?);
SQL;

    if (!preg_match('/^[\w\-\$\ \@]{1,50}$/',$assignment['name'])) {
        $result = "Invalid Assignment Name";
        closeConnection($db);
        return $result;
    }
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'sisssi',
        $assignment['name'],
        $assignment['priority'],
        $assignment['notes'],
        $assignment['duedate'],
        $assignment['time'],
        $assignment['userId']);
    if(mysqli_stmt_execute($stmt)) {
        $result = "Assignment Created";
        closeConnection($db);
        return $result;
    } else {
        $result = "Assignment not created";
        closeConnection($db);
        return $result;
    }

}

function removeAssignment($id) {
    $db = getConnection();

    $query = "DELETE FROM assignment where id=?";
    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);

    closeConnection($db);
}

function findSingleAssignment($userId,$assignmentName) {
    $db = getConnection();
    $query = "SELECT * FROM assignment where userId=? and name=?";

    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'is', $userId, $assignmentName);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $assignmentInfo = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $assignment = [];
        $assignment['id'] = $row['id'];
        $assignment['name'] = $row['name'];
        $assignment['priority'] = $row['priority'];
        $assignment['notes'] = $row['notes'];
        $assignment['duedate'] = $row['duedate'];
        $assignment['time'] = $row['time'];
        $assignment['complete'] = $row['complete'];
        $assignmentInfo[] = $assignment;
    }
    closeConnection($db);
    return $assignmentInfo;
}

function findAssignment($userId) {
    $db = getConnection();

    $query = "SELECT * FROM assignment where userId=?";

    $stmt = mysqli_prepare($db,$query);
    mysqli_stmt_bind_param($stmt, 'i', $userId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $assignmentInfo = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $assignment = [];
        $assignment['id'] = $row['id'];
        $assignment['userId'] = $row['userId'];
        $assignment['name'] = $row['name'];
        $assignment['priority'] = $row['priority'];
        $assignment['notes'] = $row['notes'];
        $assignment['duedate'] = $row['duedate'];
        $assignment['time'] = $row['time'];
        $assignment['complete'] = $row['complete'];
        $assignmentInfo[] = $assignment;
    }
    closeConnection($db);
    return $assignmentInfo;
}

function assignmentIsComplete($id, $userId) {
    $db = getConnection();

    $query = "UPDATE assignment SET complete = 1 WHERE userId=? AND id=?";

    $stmt = mysqli_prepare($db, $query);
    mysqli_stmt_bind_param($stmt, 'ii', $userId, $id);

    if(mysqli_execute($stmt)) {
        $result = "Assignment is Complete";
        closeConnection($db);
        return $result;
    } else {
        $result = "Error in Marking Assignment Complete";
        closeConnection($db);
        return $result;
    }

}

function dropAssignment() {
    $db = getConnection();

    $query = "DELETE FROM assignment";
    mysqli_query($db,$query);

    closeConnection($db);
}

?>
