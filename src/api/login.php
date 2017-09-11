<?php
/**
 * @Author: Marte
 * @Date:   2017-09-07 09:57:06
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-11 16:31:02
 */


include 'connect.php';
    
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';

    // $reg1 = '/^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i';
    // $reg3='/^[\u2E80-\u9FFF\da-z\-]+$/';
    // if($reg1.test($username)){
    // if(preg_match($reg1,$username, $matches)){
    //     // echo $matches;
    //      $sql= "select * from user where email='$username'and password='$password'";
    //  }else if(preg_match($reg3,$username, $matches)){
    //     $sql = "select * from user where name='$username'and password='$password'";
    //  }
            // 正则判断传过来的数据是用户名还是用户邮箱
       $reg = '/^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i';
       $reg2='/^[\u2E80-\u9FFF\da-z\-]+$/';
       if(preg_match($reg,$username,$matchs)==1){
        $sql= "select * from user where email='$username' and password='$password'";
        }
        else{
         $sql = "select * from user where name='$username' and password='$password'";
        }
       
//结果
        // $result = '';
        // foreach($matchs[1] as $m){
        // $result .=$m
        // }    

    // if($username==""){
    //     $sql = "select * from user where email='$email'and password='$password'";
    // }else{
    //     $sql = "select * from user where name='$username'and password='$password'";
    // }

    

    $result = $conn->query($sql);

    if($result->num_rows>0){
        echo "true";
    }else{
        echo "false";
    }
    // 关闭连接
    $conn->close();
     // }
    
?>