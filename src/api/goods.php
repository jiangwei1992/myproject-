<?php
/**
 * @Author: Marte
 * @Date:   2017-09-09 16:51:00
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-09 20:26:06
 */

    //引入其他php文件
    include 'connect.php';
    
    // 获取前端传过来的数据
    $goodsnum = isset($_GET['goodsnum']) ? $_GET['goodsnum'] : '';
    $subclass = isset($_GET['subclassification']) ? $_GET['subclassification'] : '香水彩妆';

    // echo $cate;
    // 编写sql语句
    $sql = "select * from goodlist";
    // 利用php条件语句拼接sql
    if($goodsnum){
        $sql .= " where goodsnum='$goodsnum'";
      
    }else{
        $sql .= " where subclassification='$subclass'";
        // echo $subclass;
    }
    // echo $sql;
    // $startIdx = $qty*($pageNo-1);

    // $sql .= " limit $startIdx,$qty";

    // 获取查询结果
    $result = $conn->query($sql);

    // var_dump($result);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);

    
    
    /*//释放查询结果集
    $result->close();*/

    // 格式化数据
    // 关联数组
    // // echo $cont;
    // $res = array(
    //     'pageNo'=>$pageNo,
    //     'qty'=>$qty,
    //     'total'=>$conn->query($cont)->fetch_row()[0],
    //     'data'=>$row,
    //     'status'=>200,
    //     'msg'=>'success'
    // );

    //把结果输出到前台（得到json字符串）
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>