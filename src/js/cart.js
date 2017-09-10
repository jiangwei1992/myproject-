/* 
* @Author: Marte
* @Date:   2017-09-10 11:28:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-10 22:50:22
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
    }
})

require(["jquery"],function($){
    $('.footer').load('./footer.html .Copyright');
    require(['../lib/common'],function(){

        // 注册登录
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
                    // console.log(name)
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

        var cookies=document.cookie;

        var goods = [];
         if(cookies.length>0){
            // 拆分成数组
            cookies = cookies.split('; ');//['cartlist=[{},{}]','myname=laoxie','myClass=h51704']

            cookies.forEach(function(item){
                var arr = item.split('=');//['cartlist','[{},{}]'] , ['myname','laoxie']
                if(arr[0] === 'goods'){
                    goods = JSON.parse(arr[1]);
                }
            })
         }
         
        // console.log(goods);

        $(goods).each(function(idex,item){
            // console.log(item)
            var goodsnum=item.goodsnums;
            var qty=item.qtys;
            // console.log(goodsnum)
            $.ajax({
                url:"../api/cart.php",
                type:"get",
                async:true,
                data:{goodsnum:goodsnum},
                // 防止出现中文乱码
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                success:function(data){
                    structure(data,qty,'.trade')
                    // console.log(data)

                    // 商品总数
                    var result=$(".corresl .qty")
                    var sult=0;
                    $(result).each(function(i,item){
                        sult=$(item).text()*1+sult*1;
                    })
                    // console.log(sult)
                    $('.checknum .num').html(sult);
                    remove();

                }
            })
        })
        var totalPrice = 0;
        var nums=0;
        function structure( data,num,ele) {
            var res=$.parseJSON(data);
            // 截取所需要长度数组
            // console.log(res)
            var eles= $(res).map(function(idex,item){
                totalPrice += item.nowprice * num;
                return `<li class="comm fl">
                            <input type="checkbox" name="qx" id="dxk"/> 
                        </li>
                        <li class="fl">
                            <a href="/src/html/goods.html?goodsnum=${item.goodsnum}"><img src="/src/img/${item.imgurl}" alt="" /></a>
                        </li>
                        <li class="title fl">
                            ${item.title}
                        </li>
                        <li class="fr price_btn" >
                            <span class="newprice">￥ ${item.nowprice}</span>
                            <span class="qty">${num}</span>
                            <span class="btn-close" data-guid="${item.goodsnum}">删除</span>
                        </li>
                        `
            }).get().join(" ")
           var ul =$('<ul></ul>').addClass('clearfix corresl').attr({}).append(eles);
           $(".total_prices").html(totalPrice.toFixed(2))
           // console.log(ele)
            $(ele).append(ul);
            // console.log(res)
        }

        // 删除单个商品
        function remove(){
            var trade=$(".trade")
            $(".trade").on('click',".btn-close",function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className === 'btn-close'){
                // 获取当前li
                // var currentLi = target.parentNode.parentNode;
                console.log(target)
                var guid = $(target).attr('data-guid');
                console.log(guid)
                goods.forEach(function(item,idx){
                    if(item.goodsnums === guid){
                        goods.splice(idx,1);
                    }
                });
                console.log(goods)
                var now = new Date();
                now.setDate(now.getDate()+8);
                Cookie.set('goods',JSON.stringify(goods),now);
                var currentul=$(target).closest('ul');
                console.log(currentul);
                currentul.remove();
                // // 再次发送一遍请求
                // console.log(goods)
                // $('.trade').empty();
            //     $(goods).each(function(idex,item){
            // // console.log(item)
            //         var goodsnum=item.goodsnums;
            //         var qty=item.qtys;
            //     $.ajax({
            //         url:"../api/cart.php",
            //         type:"get",
            //         async:true,
            //         data:{goodsnum:goodsnum},
            //         // 防止出现中文乱码
            //         contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            //         success:function(data){
                        
            //             structure(data,qty,'.trade')

            //         }
            //     })
            //     })
            }
        })
        }
       
    })
})