<?php
require_once('./sqlTools.php');
$name = readline('Enter event name: ');
$user = 'test1';
$duration = readline('Enter duration: ');
$allotted = readline('Enter allotted: ');
addEvent($name, $duration, $user, $allotted); 
?>
