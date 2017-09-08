/* 
* @Author: Marte
* @Date:   2017-09-08 09:14:44
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-08 22:54:38
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
    }

})

require(["jquery"],function($){
    $('.goodslist_top').load('./footer.html header');
    $('.goodslist_footer').load('./footer.html footer');
    require(["nav","youcebase"],function(){
        // 注册登录的书写------------------------
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
                    console.log(name)
                    $('.names').html(name);
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
/*------------------------------登录注册完成----------------------------*/

    // 列表页左侧--------------------------------------
       $('.tit span').html('')  
        function jw_goodslist(data){           
        var $arr_nav=JSON.parse(data);
        var arr_side=$arr_nav[1]
        console.log(arr_side)
        var $ul=$('<ul></ul>').addClass('sidebar').appendTo($('.cen_left'))
            $(arr_side).each(function(idex,item){
                var $h4=$('<h4></h4>').addClass('side_h4').append($('<a href="/src/html/goodslist.html?cate='+item.name+'"></a>').addClass('side_a').text(item.name))
                var $li=$('<li></li>').append($h4).addClass('side_li').appendTo($ul);
                var $ul2=$('<ul></ul>') .addClass('sidebar2 clearfix').appendTo($li)
                console.log(item)
                $(item.h4).each(function(idex2,item2){
                    var li2=$("<li></li>").addClass('side_li2 fl').appendTo($ul2).append($('<a href="/src/html/goodslist.html?cate='+item2+'"></a>').addClass('side_a2').text(item2));
                })

            })
        }

        $.ajax({
            url:"/src/api/nav.php",
            type:"get",
            async:true,
            success:function(data){
                jw_goodslist(data)   
            }
        })
/*--------------------------------列表页左侧完成--------------------------------*/

//列表页中间部分--------------------------------------------------
        // 生成商品部分
        // 生成结构的函数
        // 封装一个生成结构的函数{data：请求返回的数据}{num:需要的数据条数}{ele:结构导入的节点（类）}
        
    function structure( data,num,ele) {
        var arr=$.parseJSON(data);
        var res=arr.data;
        var total=arr.total;
        var pageNo=Math.ceil(total/num);
        console.log(pageNo)

       //  // 截取所需要长度数组
       //  console.log(res)
        res=res.splice(0,num);
        var eles= $(res).map(function(idex,item){
            return `<li class="goods_comm fl">
                        <a href="#"><img src="/src/img/${item.imgurl}" alt="" /></a>
                        <p class="title">${item.title}</p>
                        <span class="newprice">￥ ${item.nowprice}</span>
                        <span class="oldprice"><del>￥ ${item.oldprice}</del></span>
                    </li>`
        }).get().join(" ")
       var ul =$('<ul></ul>').addClass('clearfix goodslist_cen').append(eles);
        $(ele).append(ul)
        var div=$('<div></div>').addClass('page').appendTo(ul);
        for(var i=1;i<=pageNo;i++){
            $('<span></span>').text(i).appendTo(div);
        }
        $('<span></span>').html("我").appendTo(div).append($('<i class="pages"></i>'));
        $('<b></b>').append().appendTo(div)

    }
        // 读取链接数据
        var name= location.search.substring(1);
        var cates=name.split('=');
        var cate=decodeURI(cates[1])
        console.log(cate)
        $.ajax({
            url:"../api/goodslist.php",
            type:"get",
            async:true,
            data:{pageNo:1,qty:20,cate:cate},
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
              success:function(data){

                console.log(data)
                // 调用封装好的函数
                structure(data,20,".goodslist")
              }
        })
    })
    

})