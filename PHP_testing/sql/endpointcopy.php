<?php
require_once('globalTools.php');
require_once('userTools.php');
require_once('assignmentTools.php');
require_once('eventTools.php');
require_once('schedule.php');

date_default_timezone_set("America/Los_Angeles");
ini_set('error_log', 'error.log');

header('Accept: application/json');
header('Content-Type: application/json');

$post = json_decode(file_get_contents('php://input'), true);

if(isset($post['register'])) {
    unset($post['register']);
    $user = [];
    $user['username'] = $post['username'];
    $user['name'] = $post['name'];
    $user['email'] = $post['email'];
    $user['password'] = hashPassword($post['password']);
    $result = addUser($user);
    echo json_encode(array("result" => $result));
} 

else if (isset($post['lookup'])) {
    if(sessionVerify($post['session'])) {
    unset($post['userlookup']);
    $result['user'] = findUser($post['userId']);
    $result['event'] = findEvent($post['userId']);
    $result['assignment'] = findAssignment($post['userId']);
    echo json_encode($result);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
} 

else if (isset($post['login'])) {
    unset($post['login']);
    $result = passwordVerify($post['password'],$post['username']);
    echo json_encode($result);
} 

else if (isset($post['logout'])) {
    if(sessionVerify($post['session'])) {
    unset($post['logout']);
    $result = logoutUser();
    echo json_encode(array("result" => $result));
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
} 

else if (isset($post['deleteuser'])) {
    if(sessionVerify($post['session'])) {
    unset($post['deleteUser']);
    removeUser($post['username']);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['makeevent'])) {
    if(sessionVerify($post['session'])) {
    unset($post['makeevent']);
    $event = [];
    
    $event['name'] = $post['name'];
    $event['duration'] = $post['duration'];
    $event['userId'] = $post['userId'];
    $event['eventDate'] = $post['eventDate'];
    $result = addEvent($event);
    echo json_encode(array("result" => $result));
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['findevents'])) {
    if(sessionVerify($post['session'])) {
    unset($post['findevents']);
    $events = findEvent($post['userId']);
    echo json_encode($events);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['findsingleevent'])) {
    if(sessionVerify($post['session'])) {
    unset($post['findsingleevent']);
    $event = findSingleEvent($post['userId'],$post['name']);
    echo json_encode($event);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['deleteevent'])) {
    if(sessionVerify($post['session'])) {
    unset($post['deleteevent']);
    removeEvent($post['id']);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['eventcomplete'])) {
    if(sessionVerify($post['session'])) {
    unset($post['eventcomplete']);
    $result = eventIsComplete($post['id'], $post['userId']);
    echo json_encode(array("result" => $result));
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['makeassignment'])) {
    if(sessionVerify($post['session'])) {
    unset($post['makeassignment']);
    $assignment = [];
    
    $assignment['name'] = $post['name'];
    $assignment['priority'] = $post['priority'];
    $assignment['notes'] = $post['notes'];
    $assignment['duedate'] = $post['duedate'];
    $assignment['time'] = $post['time'];
    $assignment['userId'] = $post['userId'];
    $result = addAssignment($assignment);
    echo json_encode(array("result" => $result));
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['findassignments'])) {
    if(sessionVerify($post['session'])) {
    unset($post['findassignments']);
    $assignments = findAssignment($post['userId']);
    echo json_encode($assignments);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['findsingleassignment'])) {
    if(sessionVerify($post['session'])) {
    unset($post['findsingleassignment']);
    $assignment = findSingleAssignment($post['userId'],$post['name']);
    echo json_encode($assignment);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['deleteassignment'])) {
    if(sessionVerify($post['session'])) {
    unset($post['deleteassignment']);
    removeAssignment($post['id']);
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

else if (isset($post['assignmentcomplete'])) {
    if(sessionVerify($post['session'])) {
    unset($post['assignmentcomplete']);
    $result = assignmentIsComplete($post['id'], $post['userId']);
    echo json_encode(array("result" => $result));
    } else {
        echo json_encode(array("result" => "Please Login"));
    }
}

//Works in testing json body only includes schedule and userId
else if (isset($post['schedule'])) {
    unset($post['schedule']);
    $response = sortAssignments($post['userId']);
    echo $response;
}
 
?>

