/* 
* @Author: jiangwei
* @Date:   2017-09-02 17:42:46
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 23:00:30
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
        "commom":"../lib/common"
    }
})

require(["jquery","commom"],function($){
    $('footer').load('./footer.html .Copyright')
    $('#name').focus(function(){
        $(".username").removeClass("active_fail active_true").html("中文、字母、数字、-")
        $('.jg').removeClass("active_fail active_true").html('&#xe638;')
        $('.legal').removeClass("active_fail active_true").html('')
    })
   // 名字输入框的验证
    $('#name').blur(function(){
        $(".username").html("")
        $('.jg').html('')
        var name=$('#name').val()
        $.ajax({
            url:"../api/reg.php",
            type:"get",
            async:true,
            data:{username:name},
            success:function(data){
                console.log(data)
                // 名字的简单合法性验证
                console.log(name)
                var reg = /^[\u2E80-\u9FFF\da-z\-]+$/;
                if(!reg.test(name)){
                    $('.jg').addClass('active_fail').html('&#xe638;')
                    $('.legal').addClass('active_fail').html('名字不能含有特殊字符且不能为空')
                return false;
                }else if(data=="fail"){
                    $(".username").addClass('active_fail').html("已有人注册，请换一个吧")
                     return false;
                }
                else{
                     $('.jg').addClass('active_true').html('&#xe621;')
                     $('.legal').addClass('active_true').html('名字可用')
                }
            }
        })     
    })
    // 邮箱的验证码
    // 聚焦
   $('#email').focus(function(){
        $(".ema").removeClass("active_fail active_true").html("6-50位字符组成");
        $('.em').removeClass("active_fail active_true").html('&#xe638;');
        $('.legal_email').removeClass("active_fail active_true").html('')
    })
   // 失去焦点
    $('#email').blur(function(){
        $(".ema").html("");
        $('.em').html('');
        var email=$('#email').val()
        console.log(email)
        $.ajax({
            url:"../api/reg.php",
            type:"get",
            async:true,
            data:{email:email},
            success:function(data2){
                console.log(data2)
                // 名字的简单合法性验证
                console.log(email)
                var reg = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
                if(!reg.test(email)){
                    $('.em').addClass('active_fail').html('&#xe638;')
                    $('.legal_email').addClass('active_fail').html('邮箱不合法')
                    return false;
                }
                else if(data2=="fail"){
                    $(".ema").addClass('active_fail').html("此邮箱已注册过")
                     return false;
                }
                else{
                     $('.em').addClass('active_true').html('&#xe621;')
                     $('.legal_email').addClass('active_true').html('邮箱可用')
                }
            }
        })  
    })
    // 密码框的强度
    $("#pass").focus(function(){
         $('.legal_pas').removeClass("active_fail active_true").html('6-20位不含空格')
         $('.font_pass').removeClass("active_fail active_true").html('&#xe638;')
    })
    $('#pass').blur(function(){
      $('.legal_pas').html('') ;
        var password=$('#pass').val();
        console.log(password)
        var reg_pas = /^\S{6,19}$/;
            if(!reg_pas.test(password)){
               $('.legal_pas').addClass('active_fail').html("密码长度只能在6-12字符之间且不能有空格")
               $('.font_pass').addClass("active_fail").html('&#xe638;')
                return false;
            }else{
                $('.font_pass').addClass('active_true').html('&#xe621;')
                 $('.legal_pas').addClass('active_true').html("密码可用")
            }
    })
    // 确认密码
    $("#confirm").focus(function(){
         $('.legal_pas2').removeClass("active_fail active_true").html('请再次输入密码')
         $('.font_pass2').removeClass("active_fail active_true").html('&#xe638;')
    })
    $('#confirm').blur(function(){
        $('.legal_pas2').html('');
         $('.font_pass2').html('');
        var confirm=$('#confirm').val();
        var password=$('#pass').val();
        var reg_pas2 = /^\S{6,19}$/;
        if(confirm!=password||!reg_pas2.test(confirm)){
            $('.legal_pas2').addClass("active_fail").html('两次输入密码不相等');
            $('.font_pass2').addClass("active_fail").html('&#xe638;')
            return false
        }else{
            $('.font_pass2').addClass("active_true").html('&#xe621;')
            $('.legal_pas2').addClass("active_true").html('密码输入正确');
        }

    })
    // 验证码框
    $("#verify").focus(function(){
         $('.legal_ver').removeClass("active_fail active_true").html('请输入验证码，不区分大小写')
         $('.font_ver').removeClass("active_fail active_true").html('&#xe638;')
    })
    var res= vCodenum();
    $('.btn').click(function(){
        res=vCodenum()
        console.log(666)
        $(".ver").html('').html(res)
        return res;
    })
       $(".ver").html(res)
    $('#verify').blur(function(){
        $(".ver").html(res)
        var verify=$('#verify').val()
         console.log(verify)
       if(res!==verify){
        $('.font_ver').addClass("active_fail").html('&#xe638;')
            $('.legal_ver').addClass("active_fail").html('验证码错误');
            return false
       }else{
            $('.font_ver').addClass("active_true").html('&#xe621;')
            $('.legal_ver').addClass("active_true").html('验证码正确');
       }

    })
    // if($('#statement').is(':checked')) {
    //     $("div").addClass('active');  
    // }else{
    //      $("div").removeClass('active');
    // }
    function check(){
    if($('#statement').prop('checked')){
        $("div").addClass('active') 
        }
        else{
        $("div").removeClass('active') 
        }
    }check()
    $("#statement").click(function(){
        check()
    })

   
    $("div").click(function(){
        var i=$('i');
        var k=0;
        var name=$('#name').val();
        var email=$('#email').val();
        var password=$('#pass').val();

        for(var j=0;j<i.length;j++){
            if($(i[j]).hasClass("active_true")){
                    k++;
                    console.log(k)
            }
        }
            console.log(k)

        if(k==5&&$('#statement').prop('checked')){        
                
                $.ajax({
                    url:"../api/regsub.php",
                    type:"get",
                    async:true,
                    data:{username:name,email:email,password:password},
                    success:function(data){
                        console.log(data)
                        if(data=="true"){
                            console.log(666)
                           window.location.href="login.html";
                        }
                        if(data=='fail'){
                            
                           alert("已经有人注册了呦")

                        }
                    }
                })
        }
       


    })
     
   
       
})