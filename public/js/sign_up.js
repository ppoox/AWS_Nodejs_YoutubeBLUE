var signId;
var signPwd;
var signPwdOk;

$.fn.extend({
       animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
           });
    }
});

$("#signForm").on("submit",function(){
    console.log("asd");
    signId=$("#inputId").val();
    signPwd=$("#inputPwd").val();
    signPwdOk=$("#inputPwdOk").val();

    if(!(signPwd==signPwdOk)){
        alert("비밀번호를 확인해주세요.!");
        return false;
    }
    $.ajax({
        url:"/ajax/sign_up",
        method:"post",
        data: {
            id:signId,
            pwd:signPwd
        },
        success:function(data){
            if(data.sign_up){
                location.href="/login.html";
                alert("회원가입을 축하드립니다.!");
            }else{
                alert("아이디가 존재 합니다.");
            }
        }
    });
});