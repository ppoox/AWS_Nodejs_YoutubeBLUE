	// 서버 통신을 통하여 app.js의 test DB에 접근하기 위해
	// 콘텐츠 id를 저장 할 변수
	var contentId;
	// 검색바의 내용을 담아올 변수
	var searchText;
	// 드래그 상태 확인을 위한 변수
	var isDrag=false;
	// 로그인 상태를 나타내는 변수
	var isLogin=false;
	// 기능 설명을 위한 modal
	$("#myModal").modal("show");

	// 로그인 상태를 확인하기 위하여 페이지 로딩시 통신
	$.ajax({
		url:"/ajax/isUsing",
		method:"GET",
		data:{data:isLogin},
		success:function(data){
			if(data.isUsing){
				console.log("as");
				isLogin=true;
				$("#loginBtn").hide();
				$("#logoutBtn").show();
			}else{
				isLogin=false;
				$("#logoutBtn").hide();
				$("#loginBtn").show();
			}
		},
		error:function(xhr, status, error) {
                 
        }
	});

	// 로그인 상태에서 로그아웃 버튼 클릭시
	$("#logoutBtn").click(function(){
		isLogin=false;
		location.href="/index.html";

		$.ajax({
			url:"/ajax/logout",
			method:"get",
			data:{data:isLogin},
			success:function(data){
				if(data.isUsing){
					$("#logoutBtn").hide();
					$("#loginBtn").show();
				}
			}
		});
	});

	// 광고닫기 버튼 클릭시 버튼과 광고를 닫고 videoBox를 보여준다.
	$("#adCloseBtn").click(function(){
		console.log("asd");
		document.querySelector("#adCloseBtn").style.display="none";
		console.log("a2");

		//$(this).hide();
		$("#myCarousel").hide();
		$("#videoBox")
		.show();
	});

	// 검색버튼 클릭시 submit 되는 함수
	$("#searchForm").on("submit",function(){
		searchText=$("#serahInput").val();
		$.ajax({
			url:"/ajax/search",
			method:"get",
			data:{text:searchText},
			success:function(data){
				location.href=data;
			}
		});
	});

	$("#loginBtn").click(function(){
		location.href="/login";
	});

	// 콘텐츠들을 mousedown했을때
	$(".content").on("mousedown",function(){
		$(this)	// poster에 드래그 함수 추가하기
		.attr("ondrop","drop(event)")
		.attr("ondragover","allowDrop(event)");
		isDrag=true;
		$("#vid").hide();

		// 콘텐츠 클릭시 해당 id를 받아와 ajax통신 하기위해
		contentId=$(this).attr("id");
	});

	// 콘텐츠를 mousedown만 하고 드래그 했을경우를 배제하기위해
	// videoBox를 제외한 window에서 mouseup했을시 isDrag=false
	$(window).on("mouseup",function(){
		isDrag=false;
	});

	//드래그 이벤트
	function allowDrop(ev) {
 	   ev.preventDefault();
	}
	function drag(ev) {		// 드래그
  	  ev.dataTransfer.setData("text", ev.target.id);
	}
	function drop(ev) {		// 드래그 후 드롭했을때
  	  ev.preventDefault();
  	  // var data = ev.dataTransfer.getData("text");
  	 	if(ev.offsetX<=1138 &&
			ev.offsetX>-3 &&
			ev.offsetY>=-2 &&
			ev.offsetY<497) {
  	 		if(isDrag){	
  	 			isDrag=false;

  	 			$.ajax({
  	 				url:"/ajax/links",
  	 				method:"get",
  	 				data:{contentId:contentId},
  	 				success:function(data){
  	 					// #vid에 해당 영상 띄우기
		   				$("#vid")
						.show()
						.attr("src",data);
  	 				}
  	 			});

				// 객체 타입일때 JSON형식으로 변환
	  	 		JSON.stringify(contentId);				

	  	 		// ajax 통신을 위한 요청 객체 생성
				// var req=new XMLHttpRequest();
				// req.open('GET', '/ajax/links');
				// //req.setRequestHeader('Content-Type', 'text/html');
				// req.send(contentId);

				// req.onreadystatechange = function(){
					
				// 	if(req.readyState===4){
				// 		if(req.status===200){
				// 			console.log(req.responseText);
				// 			//#vid에 해당 영상 띄우기
			 //   				$("#vid")
				// 			.show()
				// 			.attr("src",req.responseText);
				// 		}else{
				// 			console.log("status ERROR");
				// 		}
				// 	}else{
				// 		console.log("ready state error");
				// 	}
				// }

  	 		}
		} 
	}