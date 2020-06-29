$(function(){		
    $("#dl").click(function(){
        $.post(
            "login.php",
            {
                "username":$("#sjh").val(),
                "userpass":$("#dxyzm").val()
            },
            function(data){
                if(data=="success"){
                    $("#h3").html("亲，恭喜您，登录成功！2秒后跳转到<a href='index.html'>首页</a>！");
                    //保存cookie：
                    addCookie("username",$("#sjh").val(),7);
                    setTimeout(()=>{
                        location.href="index.html";
                    },2000);
                }else if(data=="fail"){
                    $("#h3").html("不好意思，亲，用户名或者密码错误！");
                }else{
                    $("#h3").html("不好意思，亲，服务器出错了！");
                }
            }
        );
    });
});