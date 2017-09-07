<?php
/**
 * @Author: Marte
 * @Date:   2017-09-07 09:57:06
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-07 10:28:36
 */


include 'connect.php';
    
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';


    if($username==""){
        $sql = "select * from user where email='$email'and password='$password'";
    }else{
        $sql = "select * from user where name='$username'and password='$password'";
    }

    

    $result = $conn->query($sql);

    if($result->num_rows>0){
        echo "true";
    }else{
        echo "false";
    }
    // 关闭连接
    $conn->close();
    
?>