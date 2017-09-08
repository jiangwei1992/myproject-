/* 
* @Author: jiangwei
* @Date:   2017-08-31 20:35:08
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-08 21:59:41
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
    }
})

require(["jquery"],function($){
    // ajax请求数据
    $.ajax({
        url:"/src/api/nav.php",
        type:"get",
        async:true,
        success:function(data){
            jw_nav(data)
           
        }

    })
    // 导航数据
    var $navbox=$('.navbox')
    function jw_nav(data){
        var $arr_nav=JSON.parse(data);
        var arr_nav1=$arr_nav[0]
        var arr_nav2=$arr_nav[1]
        /*一级导航*/
        var $nav=$("<div></idv>").attr({'id':'nav_con'}).append($('<ul></ul>').attr({id:'nav1',class:"nav_pri clearfix"})).appendTo($navbox);
        $(arr_nav1).each(function(idex,item){
            var $li=$('<li></li>').addClass('fl nav_li1')
            var $a=$('<a href="/src/html/goodslist.html?cate='+item+'"></a>').addClass('a1').text(item);
        
            $li.append($a).appendTo('#nav1')
            if(item=="全部商品分类"){
                var $ul2=$('<ul></ul>').addClass('nav_pri2').appendTo($li)
                $(arr_nav2).each(function(idex2,item2){
                    var $li2=$('<li></li>').append($('<a href="/src/html/goodslist.html?cate='+item2.name+'"></a>').addClass('a2').text(item2.name)).addClass('nav_li2').appendTo($ul2);
                        if(idex%2==1){
                            $li2.addClass('liebiao2');
                        } 
                    var $div=$("<div></div>").addClass('nav_pri3').appendTo($li2)
                    var $ul3=$('<ul></ul>').addClass('fl nav3_left').appendTo($div)
                    var $ul4=$('<ul></ul>').addClass('fl nav3_right').appendTo($div)
                    // 循环生成三级导航数据
                   // console.log(item2)
                   $(item2.h4).each(function(idex3,item3){
                        // 三模块左侧
                        var $h4=$('<h4></h4>').addClass('h4_a fl').append($('<a href="/src/html/goodslist.html?cate='+item3+'"></a>').text(item3))
                        var $li3=$('<li></li>').addClass('clearfix').append($h4).appendTo($ul3)
                        // 生成用于存放ul3模块 列表
                        var $div2=$('<div></div>').appendTo($li3).addClass('nav_list fl')
                        $(item2.value).each(function(idex4,item4){
                            if(idex4==idex3){
                                $(item4).each(function(idex5,item5){
                                    var $a2=$('<a href="/src/html/goodslist.html?cate='+item5+'"></a>').text(item5).appendTo($div2)
                                })
                            }
                            // console.log(item2.value)
                        })
                   })
                   // console.log($(item2.img))
                   // 第三模块右侧部分
                   $(item2.img).each(function(idex6,item6){
                        var $a_r=$('<a href="#"></a>').addClass('fl').appendTo($ul4);
                        // 注意路径问题 设置成根目录其他页面都可访问
                        var $img=$('<img src="/src/img/'+item6+'.jpg" alt="" />').appendTo($a_r)
                   })
                    // 第三模块淡入淡出
                    $li2.hover(
                        function(){
                        $div.fadeIn('slow', function() {
                            
                        });
                      },function(){
                        $div.fadeOut('slow', function() {
                            
                        });
                      }
                    )    
                })
            }          
        })
        $('.nav_li1').eq(1).find('a').attr("href","/src/index.html");
    }


})
