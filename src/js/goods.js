/* 
* @Author: Marte
* @Date:   2017-09-05 20:33:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 02:20:31
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
    }

})

require(["jquery"],function($){
    $('.goods_top').load('./footer.html header');
    $('.goods_footer').load('./footer.html footer');
    require(["nav","youcebase","../lib/jwzoom"],function(){

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
        console.log(names)
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

         new JwZoom({width:412,position:'right'}).init();
        // 请求传到详情页的数据
        var name= location.search.substring(1).split('&');
        console.log(name)
        var goodsnum="";
        // var cate="";
        name.forEach(function(item){
            var arr=item.split('=');
            if(arr[0]=='goodsnum'){
             goodsnum =decodeURI(arr[1]);
            }
           //  if(arr[0]=='cate'){
           // cate =decodeURI(arr[1]); 
           //  }
        })
        // function datalist (){


        // }
        // console.log(cate)

        // $('.cate').html(cate);
        $.ajax({
            url:"../api/goods.php",
            type:"get",
            async:true,
            data:{goodsnum:goodsnum},
            // 防止出现中文乱码
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            success:function(data){
                // 解码
                var arr=$.parseJSON(data)[0];
                var title=arr.title;
                var subclass=arr.subclassification;
                console.log(data)
                 console.log(title)
                $('.marked .cate').html(arr.category);
                $('.marked .title').html(title)
                // 调用封装好的函数
                $('.marked .subclass').html(subclass)
                $('.wares_top img').attr({src:"/src/img/"+arr.imgurl,"data-big":"/src/img/"+arr.imgurl});

                $('.wars_l img').attr({src:"/src/img/"+arr.imgurl,alt:title});
                $('.jwzoom-big img').attr({src:"/src/img/"+arr.imgurl})
                $('.goods_tit').html(title)
                console.log(arr.oldprice);
                if(arr.oldprice==null){
                    $('.price .oldprice').html(arr.oldprice)
                }else{
                    $('.price .oldprice').html('￥'+arr.oldprice)
                }
                $('.price .nowprice').html('￥'+arr.nowprice)
                $('.sales span').html(arr.sales);
                $('.comment span').html(arr.comment);

                $('.reportory i').html(arr.repertory)
                    // 根据达到的商品小分类得到
                    corre(subclass);

            }   
        })
        
   

        // 生成过程结构的函数
        function structure( data,num,ele) {
            var res=$.parseJSON(data);
            // 截取所需要长度数组
            res=res.splice(0,num);
            var eles= $(res).map(function(idex,item){
                return `<li class="comm fl">
                            <a href="/src/html/goods.html?goodsnum=${item.goodsnum}"><img src="/src/img/${item.imgurl}" alt="" /></a>
                            <p class="title">${item.title}</p>
                            <span class="newprice">￥ ${item.nowprice}</span>
                        </li>`
            }).get().join(" ")
           var ul =$('<ul></ul>').addClass('clearfix corres').append(eles);
           console.log(ele)
            $(ele).append(ul)
            console.log(res)
        }
        // 调用函数
        function corre (subclass){
                    console.log(subclass)
                    $.ajax({
                        url:"../api/goods.php",
                        type:"get",
                        async:true,
                        data:{subclassification:subclass},
                        // 防止出现中文乱码
                        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                        success:function(data){
                            structure(data,6,'.correlative')
                        // console.log(data)
                        }
                    })

        }


         var arr_goods=[];
         var numb=0;
         var cookies = document.cookie;

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
        console.log(numb)
        $('.logo_right span').html(numb);

        $('.btn .cart').click(function(){
            var now = new Date();
                now.setDate(now.getDate()+7);
            var qty=$('#num').val()*1
            var reportory=$('.reportory i').text()*1
            // console.log(qty>reportory)
            if(qty>reportory){
                $('.understock').css('display','block');
               $('.understock span').html(qty)
               setTimeout(function(){
                $('.understock').fadeOut()
               }, 4000)
            }else if(names!=undefined){
                console.log(names!=undefined)
                console.log(names)
                numb=numb*1+qty;
                for(var i=0;i<arr_goods.length;i++){
                    if(arr_goods[i].goodsnums === goodsnum){
                         arr_goods[i].qtys=arr_goods[i].qtys+qty;
                        break;
                    }
                }
                if(i==arr_goods.length){
                
                    var goods={
                    goodsnums:goodsnum,
                    qtys:qty
                    }
                    arr_goods.push(goods);
                }
                console.log(arr_goods);
                document.cookie="goods="+JSON.stringify(arr_goods)+';path=/src/html'+ ';expires=' + now.toString();
               document.cookie="numb="+numb+';path=/'+ ';expires=' + now.toString();
                alert('加入购车成功')
                $('.logo_right span').html(numb);

            }else{
                alert('请先登录')
            }
            
        })
         

    })


})