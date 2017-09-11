/* 
* @Author: Marte
* @Date:   2017-09-03 19:43:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 16:32:39
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
        "commom":"../lib/common"
    }
})

require(["jquery","commom"],function($){
    $('footer').load('./footer.html .Copyright')
    var reg1;
    var reg2;
    var reg3;
    $("#username").blur(function() {
        var $username=$("#username").val();
        console.log($username)
        // 邮箱正则
         reg1 = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
        // 手机号正则
         reg2 = /^1[34578]\d{9}$/;

         reg3=/^[\u2E80-\u9FFF\da-z\-]+$/;

        if(reg1.test($username)||reg2.test($username)||reg3.test($username)){
            return true
        }else{
            $('.iconfont').addClass('active_fail').html('&#xe638;')
            $('.res').addClass('active_fail').html("用户名必须为邮箱手机号或者昵称")
            return false
        }
    });

   $("#username").focus(function() {
         $('.res').html("");
         $('.iconfont').html("");
   })

   // 绑定点击事件
   $('button').click(function(){console.log(666)
        var $username=$("#username").val();
        // 如果符合邮箱正则
    
        var $password=$("#password").val();
            $.ajax({
            url:"../api/login.php",
            type:"get",
            async:true,
            data:{username:$username,password:$password},
            success:function(data2){

                if(data2=="true"){
                    console.log($('#automatic').prop('checked'))
                    if($('#automatic').prop('checked')){
                    var now = new Date();
                    now.setDate(now.getDate()+7);
                    console.log(999)
                    document.cookie = 'username=' + $username +';path=/'+ ';expires=' + now.toString();
                    document.cookie = 'password=' + $password +';path=/'+ ';expires=' + now.toString();
                    }
                    else{
                    var now = new Date();
                    document.cookie = 'username=' + $username +';path=/' +';expires=' + now.toString();
                    document.cookie = 'password=' + $password +';path=/'+';expires=' + now.toString();

                    }
                    window.location.href="../index.html";
                }
                else{
                    $('.res').addClass('active_fail').html('密码或验证码错误')
                }
            }
        })

   })


})