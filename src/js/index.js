/* 
* @Author: Marte
* @Date:   2017-09-04 20:13:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 09:06:05
*/

// 轮播图

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
    }
})

require(["jquery"],function($){
     $('.dh').load('./html/footer.html .footer')
    // 轮播图
    require(["nav","youcebase"],function(){ 
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
        return `<span></span>`
    }).get().join("")
    console.log($point)
    $($point).appendTo($div_point)
        
                // 第一张图片显示
            $('.car_ul li').eq(0).show();
            $(".point span").eq(0).addClass('cur');
            var i=0;
            var timer=setInterval(play,4000);
            //淡入淡出切换
             function play(){
                i++;
                i = i > 4 ? 0 : i ;
                $(".point span").eq(i).addClass('cur').siblings().removeClass("cur");
                $('.car_ul li').stop().eq(i).fadeIn(1000).siblings().fadeOut(1000);
            }

            // 鼠标移入移除时的效果
            $(".car_ul").hover(function() {
                clearInterval(timer);
            }, function() {
                timer=setInterval(play,4000);
            });
            // 鼠标的点击按钮事件(点击圆点显示相应的图)
            $(".point").on('click','span',function(){
               var index= $(".point span").index($(this))
               $(".point span").eq(index).addClass('cur').siblings().removeClass("cur");
                $('.car_ul li').stop().eq(index).fadeIn(1000).siblings().fadeOut(1000);

            })
        /*--------------------正文内容--------------------*/

        // 生成各板块相同布局（左侧 图div，中间商品ul，右侧图div，上边小标题h4 下边小图标）
        var central=$('.central').children()

        // $(central).each(function(index,item){
        //     // 左侧div
            
        //     $('<div></div>').addClass('cen_left').appendTo(item);
        //     // 中间
        //     $('<ul></ul>').addClass('cen_mid').appendTo(item);
        //     // 右侧
        //     $('<div></div>').addClass('cen_right').appendTo(item);
        // })
       /*--------------------------尾部-------------------------*/ 
    $('.Copyright p img').attr({src:"./img/footer.gif"})

  })      
})