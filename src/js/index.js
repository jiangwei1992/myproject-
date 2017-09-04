/* 
* @Author: Marte
* @Date:   2017-09-04 20:13:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 23:10:28
*/

// 轮播图

require.config({
    paths:{
        "jquery":"./lib/jquery-3.2.1",
    }
})

require(["jquery"],function($){
    // 轮播图
    var arr=[1,2,3,4,5];
    var $car_ul=$("<ul></ul>").addClass('car_ul').appendTo($('.carousel'))
    console.log($(arr))
    var $res=$(arr).map(function(idex,item){
        console.log(666)
        return `<li>
                    <a href="#">
                        <img src="img/show0${item}" alt="" />
                    </a>
                </li>
                `
    }).get().join("")
    //注意： jquery的map方法后面要跟着get()
    // console.log($res)
    $($res).appendTo($car_ul)

    var $div_point=$('<div></div>').addClass('point').appendTo($('.carousel'))
   var $point=$(arr).map(function(idex,item){
        return `<span> ${item} </span>`
   }).get().join("")
    console.log($point)
   $($point).appendTo($div_point)
        
                // 第一张图片显示
            $('.car_ul li').eq(0).show();
            var i=0;
            var timer=setInterval(play,5000);
            //淡入淡出切换
             function play(){
                i++;
                i = i > 4 ? 0 : i ;
                $(".point span").eq(i).addClass('cur').siblings().removeClass("cur");
                $('.car_ul li').eq(i).fadeIn(1000).siblings().fadeOut(1000);
            }

            // 鼠标移入移除时的效果
            $(".car_ul").hover(function() {
                clearInterval(timer);
            }, function() {
                timer=setInterval(play,5000);
            });
            // $('.car_ul li').eq(i).fadeIn(500).siblings().fadeOut(500);

})