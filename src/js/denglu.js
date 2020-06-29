$(function(){		
    // $("#dl").click(function(){
    //     $.post(
    //         "login.php",
    //         {
    //             "username":$("#sjh").val(),
    //             "userpass":$("#dxyzm").val()
    //         },
    //         function(data){
    //             if(data=="success"){
    //                 $("#h3").html("亲，恭喜您，登录成功！2秒后跳转到<a href='index.html'>首页</a>！");
    //                 //保存cookie：
    //                 addCookie("username",$("#sjh").val(),7);
    //                 setTimeout(()=>{
    //                     location.href="index.html";
    //                 },2000);
    //             }else if(data=="fail"){
    //                 $("#h3").html("不好意思，亲，用户名或者密码错误！");
    //             }else{
    //                 $("#h3").html("不好意思，亲，服务器出错了！");
    //             }
    //         }
    //     );
    // });


    //----------------
    let options = {
        "sjh": {
            reg: `/^[a-zA-Z_]\\w{1,9}$/.test(val)`,
            msg: "用户名不符合规范!!!"
        },
        "dxyzm": {
            reg: `/^\\d{6,16}$/.test(val)`,
            msg: "密码不符合规范!!!"
        },
    }
    $(".denglu-l input").blur(function() {
        let option_id = this.id;
        console.log("option_id", options[option_id]);

        let val = $.trim($(this).val());

        if (eval(options[option_id].reg)) {
            $(this).parent().next().text("");
            $(this).removeClass("btg");
        } else {
            $(this).parent().next().text(options[option_id].msg).css({"color":"red"});
            $(this).addClass("btg");
        }
    })

    // (4) 注册功能(获取参数并且发送网络请求， 在服务器端进行处理)
    $("#dl").click(function() {
        /* [1] 检查表单验证是否全部都通过，如果有一个没有通过那么就return  */
        $("#sjh,#mm").trigger("blur");

        if ($(".btg").length != 0) {
            return;
        }
 
        $.post(
            "./php/login.php",
            {
                "username":$("#sjh").val(),
                "userpass":md5($.trim($("#dxyzm").val())).slice(0, 15)
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