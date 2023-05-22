<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wenzhou";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["userName"];
    $nickname = $_POST["userEmail"];
    $mobile = $_POST["userPhone"];
    $subject = $_POST["userMsg"];

    $sql = "INSERT INTO tour_signups (name, nickname, mobile, subject)
            VALUES ('$name', '$nickname', '$mobile', '$subject')";

}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Registration Successful!');  </script>";
    } else {
        echo "<script>alert('Sorry, please try again: " . $conn->error . "');</script>";
    }
}

# return to the previous page
echo "<script> window.history.go(-1); </script>";


$conn->close();
?>