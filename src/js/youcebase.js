/* 
* @Author: Marte
* @Date:   2017-09-05 20:53:42
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-05 22:01:21
*/

/* 
* @Author: Marte
* @Date:   2017-09-03 21:11:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-05 18:53:30
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
        "commom":"../lib/common"
    }
})
require(["jquery","commom"],function($){
        $('.nav_right li').hover(
            function(){
                $(this).find("span").stop().animate({left:-70}, 300)
            },function(){
                $(this).find("span").stop().animate({left:0}, 300)
            }
        )
        // 优惠券的点击事件
        $('.nav_right').on('click','.discount',function(){
            // 计算右侧中间小图标走动的距离
            var $right_le=parseInt($('.letter').css("right"))
            var $right_ri=parseInt($('.nav_right').css("right"))
            // 留言
            var $right_me=parseInt($('.message').css('right'))
            var $right_top=parseInt($('.return_top').css('right'))
            if($right_le==-200|| $right_ri==0){
                $right_le=0;
                $right_ri=200;
                $right_top=200;
                $right_me=$right_me+200
            }else{
                $right_le=-200;
                $right_ri=0;
                $right_top=0;
                $right_me=$right_me-200

            }
            $('.letter').animate({right:$right_le}, 300)
            $('.nav_right').animate({right:$right_ri}, 300)
            $('.message').animate({right:$right_me}, 300)
            $('.return_top').animate({right:$right_top}, 300)

        })
        // 返回顶部的hover事件
        $('.return_top').hover(function(){
            $(this).find("div").stop().animate({left:-70}, 300)
        },function(){
             $(this).find("div").stop().animate({left:0}, 300)
        })
        // 返回顶部的点击事件
        $(window).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            // console.log(scrollTop)
            // 当滚动条距离大于500时出现返回按钮
            if(scrollTop>=500){
                $('.return_top').fadeIn()
            }else{
                $('.return_top').fadeOut()
            }
            $('.return_top').click(function(){
                 $('html,body').stop().animate({'scrollTop':0},600);
            })
           
        })

        // 留言区的显示隐藏
        $('.message').on('click','.newshow',function(){
            $(this).parent().find('.newhide').css({display:'block'})
            $(this).parent().find('.newshow').css({display:'none'})
           console.log($(this)) 
        })
        $('.message').on('click','.iconfont',function(){
            $(this).parents('.message').find('.newhide').css({display:'none'})
            $(this).parents('.message').find('.newshow').css({display:'block'})
           console.log($(this)) 
        })
    
})