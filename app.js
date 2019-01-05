var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session =require('express-session');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '@#@$MYSIGN#@$#$', resave: false, saveUninitialized: true}));
app.use('/', routes);
app.use('/users', users);

// 회원들의 정보를 담을 배열
var members=[];

// 로그인 상태 정보를 담을 변수
var isUsing=false;

// 영상 링크를 가져오기 위한 test data
var links=[];
links.push({
  title:"con1",
  src:"https://www.youtube.com/embed/Z1J_7ENdg7s"
});
links.push({
  title:"con2",
  src:"https://www.youtube.com/embed/9qE2P9UvU38"
});
links.push({
  title:"con3",
  src:"https://www.youtube.com/embed/F8CBoKOK6m4"
});
links.push({
  title:"con4",
  src:"https://www.youtube.com/embed/YQLZbo9zhr4"
});
links.push({
  title:"con5",
  src:"https://www.youtube.com/embed/w_8oPI6Vexc"
});
links.push({
  title:"con6",
  src:"https://www.youtube.com/embed/mqhI-VRAIrs"
});
links.push({
  title:"con7",
  src:"https://www.youtube.com/embed/mTLEEct8Yj0"
});
links.push({
  title:"con8",
  src:"https://www.youtube.com/embed/K6d9JZspPEY"
});
links.push({
  title:"con9",
  src:"https://www.youtube.com/embed/4WfBg0C0Oks"
});
links.push({
  title:"con10",
  src:"https://www.youtube.com/embed/kBCzsrQAa4U"
});
links.push({
  title:"con11",
  src:"https://www.youtube.com/embed/KFTzerS0isA"
});
links.push({
  title:"con12",
  src:"https://www.youtube.com/embed/aGGikPMNn2w"
});


//로그인 페이지 이동
app.get("/login", function(req, res){
  console.log("/login");
  fs.readFile("public/login.html", function(error, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });

});


// 상단 검색바 요청 처리
app.get("/ajax/search",function(req,res){
  var text=req.query.text;
  console.log(text);
  res.end("https://www.youtube.com/results?search_query="+text);
});

// 동영상 링크 요청 처리
app.get("/ajax/links",function(req,res){
  console.log(req.query.contentId);
  var contentId=req.query.contentId;
  var index=0;
  console.log(contentId);
  for(i=0; i<links.length; i++){
    if(links[i].title==contentId){
       index=i;
       break;
    }
  }
  // res.json(links[index]);
  res.end(links[index].src);
});

// 회원가입 요청 처리
app.post("/ajax/sign_up",function(req,res){
  var id=req.body.id;
  var pwd=req.body.pwd;
  var isExist=false;
  console.log("회원가입: "+id+pwd);
  for(var i=0; i<members.length; i++){
    if(members[i].id==id){
      isExist=true;
      break;
    }
  }
  if(isExist){
     res.json({sign_up:false});
  }else{
     members.push({
    id:id,
    pwd:pwd
    });
    res.json({sign_up:true});
  }

});

// 아이디 확인 요청 처리
app.get("/ajax/validId",function(req,res){
  var id=req.query.id;
  var isValid=false;

  for(var i=0; i<members.length; i++){
    if(!(members[i].id==id)){
      isValid=false;
    }else{
      isValid=true;
      break;
    }
  }
  if(isValid){
    res.json({isValid:true});
  } else{
    res.json({isValid:false});
  }
});

// 로그인 요청 처리
app.post("/ajax/login",function(req,res){
  var id=req.body.id;
  var pwd=req.body.pwd;
  var loginOk=false;
  console.log("로그인: "+id+pwd);
  for(var i=0; i<members.length; i++){
    if(members[i].id==id && 
        members[i].pwd==pwd){
      loginOk=true;
      isUsing=true;
      break;
    }
  }
  if(loginOk){
   res.json({allowLogin:true});
  }else{
    res.json({allowLogin:false});
  }
});

// 로그인중 요청 처리
app.get("/ajax/isUsing",function(req,res){
  var isLogin=req.query.data;

  if(isUsing){
    res.json({isUsing:true});
     console.log("isLogin:"+isLogin);
     console.log("isUsing:"+isUsing);
  }else{
    res.json({isUsing:false});
     console.log("isLogin:"+isLogin);
     console.log("isUsing:"+isUsing);
  }
});

// 로그아웃 요청 처리
app.get("/ajax/logout",function(req,res){
  isUsing=false;
  res.json({isUsing:false});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
