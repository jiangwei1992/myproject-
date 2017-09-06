<?php
/**
 * @Author: Marte
 * @Date:   2017-09-06 10:28:42
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-06 21:54:12
 */

include 'connect.php';
    
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';
    // $grade = isset($_GET['grade']) ? $_GET['grade'] : '';
    // $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
    // $birthday = isset($_GET['birthday']) ? $_GET['birthday'] : '';
    // $phone = isset($_GET['phone']) ? $_GET['phone'] : '';

    //查看用户名是否已经存在
    if($username==""){
        $sql = "select email from user where email='$email'";
    }else{
        $sql = "select name from user where name='$username'";
    }
    
    
    $result = $conn->query($sql);

    // 如果用户名已经存在
    // 给前端返回一个fail
    if($result->num_rows>0){
        echo "fail";
    }
        
    

    else{
        // 密码md5加密
        // $password = md5($password);


        /*
            password_hash()     //对密码加密.
                * PASSWORD_DEFAULT：Bcrypt加密算法，字段超过60个字符长度，
                * PASSWORD_BCRYPT：字符串长度总为60。
            password_verify()    //验证已经加密的密码，检验其hash字串是否一致.
         */
        // $password = password_hash($password,PASSWORD_DEFAULT);

        $sql = "insert into `user` (name,password,email) values('$username','$password','$email')";


        // 获取查询结果
        $result = $conn->query($sql);

        if ($result) {
            echo "true";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    
    

    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>