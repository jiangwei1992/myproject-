/* 
* @Author: Marte
* @Date:   2017-09-04 20:13:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-07 22:57:47
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
        // 判断是否有用户名
         $(".log a").html("登录")
        $(".log span").css({display:'none'})
        var cookies = document.cookie;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(item){
                var arr = item.split('=');

                if(arr[0] == 'username'){
                    console.log(arr[1])
                    var name = arr[1];
                    $('.names').html(name);
                    $('')
                    $(".log a").html("");
                    $(".log span").css({display:'block'})

                }
            })
        }
        // 点击退出
        $(".log span").click(function(){
            var now = new Date()
            now.setDate(now.getDate()-100);
                // 删除cookie
            document.cookie = 'username=' +""+';path=/'+ ';expires=' + now.toString();

            $('.names').html("");
            $(".log span").css({display:'none'});
            $(".log a").html("登录");
           
        })
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
        // 每日上新部分
// 封装一个生成结构的函数{data：请求返回的数据}{num:需要的数据条数}{ele:结构导入的节点（类）}
// 
    function structure( data,num,ele) {
        var res=$.parseJSON(data);
        // 截取所需要长度数组
        res=res.splice(0,num);
       var eles= $(res).map(function(idex,item){
            return `<li class="comm fl">
                        <a href="#"><img src="img/${item.imgurl}" alt="" /></a>
                        <p class="title">${item.title}</p>
                        <span class="newprice">￥ ${item.nowprice}</span>
                        <span class="oldprice"><del>￥ ${item.oldprice}</del></span>
                    </li>`
        }).get().join(" ")
       var ul =$('<ul></ul>').addClass('clearfix').append(eles);
       console.log(ele)
        $(ele).append(ul)
        console.log(res)
    }
        // 每日上新部分
        $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"母婴"},
              success:function(data){
                // 调用封装好的函数
                structure(data,5,".new_arrival")
              }
        })

    // 母婴专区
     $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"母婴"},
              success:function(data){
                // 调用封装好的函数
                structure(data,6,".child .cen_mid")
              }
        })
     //美容专区
     $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"美妆"},
              success:function(data){
                // 调用封装好的函数
                structure(data,6,".hairdress .cen_mid")
              }
        })
     // 家居
         $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"家居"},
              success:function(data){
                // 调用封装好的函数
                structure(data,6,".home .cen_mid")
              }
        })
         // 营养保健
         $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"家居"},
              success:function(data){
                // 调用封装好的函数
                structure(data,6,".health .cen_mid")
              }
        })
          $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"数码"},
              success:function(data){
                // 调用封装好的函数
                structure(data,6,".appliances .cen_mid")
              }
        })
          $.ajax({
            url:"api/index.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:6,cate:"户外"},
              success:function(data){
                // 调用封装好的函数
                structure(data,6,".food .cen_mid")
              }
        })
       /*--------------------------尾部-------------------------*/ 
    $('.Copyright p img').attr({src:"./img/footer.gif"})

  })      
})