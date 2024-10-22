<!DOCTYPE html>
<html lang = "en">
<head>
    <title>Test DB connection:</title>
</head>
<body>
<h1>Result:</h1>

<?php

$mysqli = new mysqli("localhost", "procrastiplanner", "pah=6Rotxq", "procrastiplanner");

if ($mysqli->connect_error) {
    die("Connection failed");
}

$sql = "INSERT INTO Users (username, name, email, passwords) VALUES ('steeve', 'steve', 'test@test.com', 'test123')";
$mysqli->query($sql);

$sql = "SELECT * FROM Users WHERE username = 'steeve'";
$result = $mysqli->query($sql);

while($row = $result->fetch_assoc()) {
    echo "username: " . $row['username'] . ", name: " . $row['name'] . ", email: " . $row['email'] . ", password: " . $row['passwords'];
}

$sql = "DELETE FROM Users WHERE username = 'steeve'";
$mysqli->query($sql);

$result->close();
$mysqli->close();

?>

</body>
</html>
