var loginId;
var loginPwd;

$.fn.extend({
       animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
           });
    }
});

$("#nextBtn").click(function(){
    loginId=$("#inputId").val();
    $("#loginForm")
    .animateCss("slideOutLeft");

    $.ajax({
        url:"/ajax/validId",
        method:"get",
        data:{id:loginId},
        success:function(data){
            if(data.isValid){
                $("#id").hide();
                $("#pwd").show();
                $("#idForm").hide();
                $("#pwdForm").show();
            }else{
                alert("아이디를 확인해주세요");
            }
        }
    });
    return false;
});

$("#loginForm").on("submit",function(){
    loginPwd=$("#inputPwd").val();

    $.ajax({
        url:"/ajax/login",
        method:"post",
        data:{
            id:loginId,
            pwd:loginPwd
        },
        success:function(data){
            if(data.allowLogin){
                location.href="/index.html";
            } else{
                alert("아이디와 비밀번호를 확인해주세요.!");
            }
        }

    });
});