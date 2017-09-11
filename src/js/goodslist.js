/* 
* @Author: Marte
* @Date:   2017-09-08 09:14:44
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 16:38:40
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
        var names;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(item){
                var arr = item.split('=');

                if(arr[0] == 'username'){
                    console.log(arr[1])
                    names = arr[1];
                    console.log(names)
                    $('.names').html(names);
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
             $('.logo_right span').html(0)
        })

        // 购物车
        var cookies = document.cookie;
        var numb=0;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(item){
                var arr = item.split('=');
                if(arr[0] == 'goods'){
                    arr_goods = JSON.parse(arr[1]);
                }
                if(arr[0] == 'numb'){
                   numb=arr[1];
                }
            })
        }
       if(numb!=0&&names!=undefined){
            $('.logo_right span').html(numb);
        }
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
        // 封装一个生成结构的函数{data：请求返回的数据}{num:需要的数据条数}{ele:结构导入的节点}
        
    function structure( data,num,ele) {
        var arr=$.parseJSON(data);
        var res=arr.data;
        var total=arr.total;
        var pageNo=Math.ceil(total/num);
        // console.log(pageNo)

       //  // 截取所需要长度数组
       //  console.log(res)
        res=res.splice(0,num);
        var eles= $(res).map(function(idex,item){
            return `<li class="goods_comm fl">
                        <a href="/src/html/goods.html?goodsnum=${item.goodsnum}"><img src="/src/img/${item.imgurl}" alt="" /></a>
                        <p class="title">${item.title}</p>
                        <span class="newprice">￥ ${item.nowprice}</span>
                        <span class="oldprice"><del>￥ ${item.oldprice}</del></span>
                    </li>`
        }).get().join(" ")
       var ul =$('<ul></ul>').addClass('clearfix goodslist_cen').append(eles);
        $(ele).empty();
        $(ele).append(ul);
        // 页码
        
         $('.selfpage').empty();
        for(var i=1;i<=pageNo;i++){
            $('<span></span>').text(i).appendTo($('.selfpage'));
        }
        $('.nowpage').html(1);
        $('.allpage').html(pageNo);
        $('.allnum').html(total);
        
    }
        // 读取链接数据
        var name= location.search.substring(1);
        var cates=name.split('=');
        var cate=decodeURI(cates[1]);
        console.log($('.classify'))
        $('.classify').html(cate);
        // console.log(cate)
        var pageNo=1;
        $.ajax({
            url:"../api/goodslist.php",
            type:"get",
            async:true,
            data:{pageNo:pageNo,qty:20,cate:cate},
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
              success:function(data){

                // console.log(data)
                // 调用封装好的函数
                structure(data,20,".goodslist")
                $('.selfpage span').eq(pageNo-1).attr('id','actives');
              }
        })

        // 页码绑定点击事件
        $('.selfpage').on('click','span',function(){ 
               pageNo = $(this).index(".selfpage span")+1
                console.log(pageNo)
            $.ajax({
                url:"../api/goodslist.php",
                type:"get",
                async:true,
                data:{pageNo:pageNo,qty:20,cate:cate},
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                  success:function(data){

                    // console.log(data)
                    // 调用封装好的函数
                    structure(data,20,".goodslist")
                    $('.selfpage span').eq(pageNo-1).attr('id','actives');
                    $('.nowpage').html(pageNo);
                    console.log(pageNo)
                    console.log($('.selfpage span'));
                }
            })
            var scrollTop = $(window).scrollTop();
            $('html,body').stop().animate({'scrollTop':0},0);
        })

        // 封装一个获取拥有某个id在父元素中的位置索引
        function idx(id){
            // 根据参数id取得该节点
            var obj = document.getElementById(id);
            // 获取该节点的父节点
            var p = obj.parentNode;
            // 取得父节点下的所有节点
            var tags = p.getElementsByTagName('*');
            // 在父节点的所有子节点中查找自己所在的位置
            for(var i=0,len=tags.length;i<len;i++){
                // 找到节点，返回下标
                if(tags[i] == obj){
                    return i;
                }
            }
            // 不在父节点中，返回-1
            return -1;
        }
        
        // 上一页
        $('.prepage').on('click',function(){

                pageNo=idx('actives')+1;
                pageNo--;
                if(pageNo==0){
                    pageNo=1;
                }
                console.log(pageNo)
                if(pageNo==1){
                   $('.prepage').css({display:"none"});
                    $('.nextpage').css({display:"block"}) ;
                }else if(pageNo==$(".selfpage span").length){
                   $('.nextpage').css({display:"none"});
                    $('.prepage').css({display:"block"});  
                }else{
                     $('.prepage').css({display:"block"});
                     $('.nextpage').css({display:"block"}) 
                }
               // pageNo = $(this).index(".selfpage span")+1
                console.log(pageNo)
            $.ajax({
                url:"../api/goodslist.php",
                type:"get",
                async:true,
                data:{pageNo:pageNo,qty:20,cate:cate},
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                  success:function(data){

                    // console.log(data)
                    // 调用封装好的函数
                    structure(data,20,".goodslist")
                    $('.selfpage span').eq(pageNo-1).attr('id',"actives");
                    $('.nowpage').html(pageNo);
                    console.log(pageNo)
                    console.log($('.selfpage span'));
                  }

            })
            var scrollTop = $(window).scrollTop();
            $('html,body').stop().animate({'scrollTop':0},0);
        })
        
        // 下一页
                // 默认没有上一页
                console.log(pageNo)
                if(pageNo==1){
                   $('.prepage').css({display:"none"}) 
                }

        $('.nextpage').on('click',function(){

                pageNo=idx('actives')+1;
                pageNo++;
                console.log(pageNo)
 
                if(pageNo==$(".selfpage span").length){
                   $('.nextpage').css({display:"none"})
                    $('.prepage').css({display:"block"}); 
                }else{
                     $('.prepage').css({display:"block"});
                     $('.nextpage').css({display:"block"}) 
                }
               // pageNo = $(this).index(".selfpage span")+1
                console.log(pageNo)
            $.ajax({
                url:"../api/goodslist.php",
                type:"get",
                async:true,
                data:{pageNo:pageNo,qty:20,cate:cate},
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                  success:function(data){

                    // console.log(data)
                    // 调用封装好的函数
                    structure(data,20,".goodslist")
                    $('.selfpage span').eq(pageNo-1).attr('id',"actives");
                    $('.nowpage').html(pageNo);
                    console.log(pageNo)
                    console.log($('.selfpage span'));
                  }

            })
             var scrollTop = $(window).scrollTop();
            $('html,body').stop().animate({'scrollTop':0},0);
        })
    })
    

})