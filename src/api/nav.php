<?php
/**
 * @Author:jiangwei
 * @Date:   2017-09-01 09:38:21
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-01 09:55:37
 */
    /*获取json文件*/
$nav="./json/nav.json";
    /*打开文件*/
$myfile=fopen($nav,"r");

/*读取文件*/
$content=fread($myfile,filesize($nav));

$nav_arr=json_decode($content,true);

echo ($content)


?>