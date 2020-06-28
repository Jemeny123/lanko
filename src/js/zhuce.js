// $("#sjh").blur(function(){
//     // $.get()函数发送的是get请求
//     $.get(
//         "checkUser.php",
//         {"username":this.value},
//         (str)=>{
//             if(str=="0"){ //用户名存在
//                 $('#p1').html('亲，用户名存在，请重新思考')
//             }else if(str=="1"){
//                 $('#p1').html('亲，用户名没有人使用，赶紧注册吧')
//             }
//         },
//         "json"
//         );
// });


// 一、先做前端的表单验证
//功能：所有前端的验证；
function isTest(){
	return isUserName()&&isPass();
}

//1、用户名的前端验证
function isUserName(){
	//1)、非空判断
	if($("#sjh").val()==""){
		return false;
	}
	//2)、格式判断
	// 用户名有数字，字母下划线组成，但不能以数字开头，2-10位
	let reg = /^[a-zA-Z_]\w{1,9}$/;
	if(!reg.test($("#sjh").val())){
		return false;
	}
	return true;
}

//2、密码的前端验证
function isPass(){
	//1)、非空判断
	if($("#mm").val()==""){
		return false;
	}
	//2)、格式判断
	// 数字，6-16位
	let reg = /^\d{6,16}$/;
	if(!reg.test($("#mm").val())){
		return false;
	}
	return true;
}

//二、后端验证
let hasUser = false;//该用户名不存在
function hasUserBack(){
	//后端验证用户名是否存在
	$.get("./php/checkUser.php",{"username":$("#sjh").val()},function(data){
		if(data=="0"){
			$("#p1").html("亲，该用户名已经存在，请重新思考！");
			$("#p1").css({"color":"red"});
			hasUser = true;
		}else{
			$("#p1").html("亲，该用户名可以使用，赶紧注册吧！");
			$("#p1").css({"color":"green"});
			hasUser = false;
		}
	})
}

$(function(){
    $("#sjh").blur(function(){
        //1、前端验证
        if(isUserName()==false){
            $("#p1").html("亲，用户名的格式不正确！");
            return;
        }
        //2、后端的验证
        hasUserBack();
    });

    $("#mm").blur(function(){
        //1、前端验证
        if(isPass()==false){
            $("#p2").html("亲，密码格式不正确	！");
            return;
        }else{
            $("#p2").html("√");
        }
    });

    $("#ljzc").click(function(){
        // 1、前端验证
        if(isTest()==false){
            $("#h3").html("亲，您的信息输入不全");
            return;
        }
        //2、用户名是否存在(后端验证)
        if(hasUser){
            return;
        }		

        $.post(
            "./php/addUser.php",
            {
                "username":$("#sjh").val(),
                "userpass":$("#mm").val()
            },
            function(data){
                if(data=="success"){
                    $("#h3").css({"color":"green"});
                    $("#h3").html("恭喜您，注册成功！2秒后跳转到<a href='denglu.html'>登录</a>页面");
                    setTimeout(()=>{
                        location.href="denglu.html";
                    },2000);
                }else if(data=="fail"){
                    $("#h3").css({"color":"red"});
                    $("#h3").html("不好意思，注册失败!");
                }else{
                    $("#h3").css({"color":"red"});
                    $("#h3").html("不好意思，服务器出问题了!");
                }
            }
        );
    });
})
