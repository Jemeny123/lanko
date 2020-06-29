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
// function isTest(){
// 	return isUserName()&&isPass();
// }

// //1、用户名的前端验证
// function isUserName(){
// 	//1)、非空判断
// 	if($("#sjh").val()==""){
// 		return false;
// 	}
// 	//2)、格式判断
// 	// 用户名有数字，字母下划线组成，但不能以数字开头，2-10位
// 	let reg = /^[a-zA-Z_]\w{1,9}$/;
// 	if(!reg.test($("#sjh").val())){
// 		return false;
// 	}
// 	return true;
// }

// //2、密码的前端验证
// function isPass(){
// 	//1)、非空判断
// 	if($("#mm").val()==""){
// 		return false;
// 	}
// 	//2)、格式判断
// 	// 数字，6-16位
// 	let reg = /^\d{6,16}$/;
// 	if(!reg.test($("#mm").val())){
// 		return false;
// 	}
// 	return true;
// }

// //二、后端验证
// let hasUser = false;//该用户名不存在
// function hasUserBack(){
// 	//后端验证用户名是否存在
// 	$.get("checkUser.php",{"username":$("#sjh").val()},function(data){
// 		if(data=="0"){
// 			$("#p1").html("亲，该用户名已经存在，请重新思考！");
// 			$("#p1").css({"color":"red"});
// 			hasUser = true;
// 		}else{
// 			$("#p1").html("亲，该用户名可以使用，赶紧注册吧！");
// 			$("#p1").css({"color":"green"});
// 			hasUser = false;
// 		}
// 	})
// }

$(function(){
//     $("#sjh").blur(function(){
//         //1、前端验证
//         if(isUserName()==false){
//             $("#p1").html("亲，用户名的格式不正确！");
//             return;
//         }
//         //2、后端的验证
//         hasUserBack();
//     });	

//     $("#mm").blur(function(){
//         //1、前端验证
//         if(isPass()==false){
//             $("#p2").html("亲，密码格式不正确	！");
//             return;
//         }else{
//             $("#p2").html("√");
//         }
//     });

//     $("#ljzc").click(function(){
//         // 1、前端验证
//         if(isTest()==false){
//             $("#h3").html("亲，您的信息输入不全");
//             return;
//         }
//         //2、用户名是否存在(后端验证)
//         if(hasUser){
//             return;
//         }		

        // $.post(
        //     "addUser.php",
        //     {
        //         "username":$("#sjh").val(),
        //         "userpass":$("#mm").val()
        //     },
        //     function(data){
        //         if(data=="success"){
        //             $("#h3").css({"color":"green"});
        //             $("#h3").html("恭喜您，注册成功！2秒后跳转到<a href='denglu.html'>登录</a>页面");
        //             setTimeout(()=>{
        //                 location.href="denglu.html";
        //             },2000);
        //         }else if(data=="fail"){
        //             $("#h3").css({"color":"red"});
        //             $("#h3").html("不好意思，注册失败!");
        //         }else{
        //             $("#h3").css({"color":"red"});
        //             $("#h3").html("不好意思，服务器出问题了!");
        //         }
        //     }
        // );
//     });


//------------
    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 2, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#yzm").trigger("blur");
    });

        // (1) 正则校验
    // (2) 事件处理(表单)
    // (3) 图形验证码
    /* 思路：给输入框添加事件(失去焦点)监听，当失去焦点的时候，应该获取输入框的内容进行正则校验 */
    let options = {
        "sjh": {
            reg: `/^[a-zA-Z_]\\w{1,9}$/.test(val)`,
            msg: "用户名不符合规范!!!"
        },
        "mm": {
            reg: `/^\\d{6,16}$/.test(val)`,
            msg: "密码不符合规范!!!"
        },
        "qrmm": {
            reg: `$("#mm").val() === val`,
            msg: "两次输入的密码不相同!!!"
        },
        "yzm": {
            reg: "val == imgCode",
            msg: "图形验证码不正确！！！"
        }
    }
    $(".zhuce input").blur(function() {
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
    $("#ljzc").click(function() {
        /* [1] 检查表单验证是否全部都通过，如果有一个没有通过那么就return  */
        $("#sjh,#mm,#qrmm,#yzm").trigger("blur");

        if ($(".btg").length != 0) {
            return;
        }

        /* [2] 检查是否勾选 */
        let isCheck = $("#checkbox").is(":checked");
        if (!isCheck) {
            alert("请阅读并同意用户的注册协议!!!");
            return;
        }

        $.post(
            "./php/addUser.php",
            {
                "username":$("#sjh").val(),
                "userpass":md5($.trim($("#mm").val())).slice(0, 15)
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
                    $("#h3").html("注册失败,用户名已存在");
                }else{
                    $("#h3").css({"color":"red"});
                    $("#h3").html("不好意思，服务器出问题了!");
                }
            }
        );
    });

//------------
})
