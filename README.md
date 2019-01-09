# AWS_Nodejs_YoutubeBLUE

**1. 개요 :**

      평소 자주 이용 하던 Youtube의 불편했던 점을 개선해 보기 위하여 제작하게 되었습니다. 
      처음 Youtube에 뜨게 되는 맞춤 동영상 중에서 보고 싶은 영상이 2개 이상일 경우 하나를 보고 홈으로 다시 오게 
      되면 영상 목록이 바뀌어있어 못 보게 될 때가 있었습니다. 
      이런 점을 해소하기 위해 광고를 닫고 동영상을 드래그만 하게 함으로써 
      페이지 이동 없이 영상 시청이 가능하며 효과적인 광고를 할 수 있습니다.
      
      
      
      
      
### YoutubeBLUE 메인



![readme1](https://user-images.githubusercontent.com/28284285/50890520-b2647780-143d-11e9-8454-0f8369123888.png)







### YoutubeBLUE 핵심 기능


![readme2](https://user-images.githubusercontent.com/28284285/50890562-cb6d2880-143d-11e9-8ae4-45ed4ed2feb8.JPG)






**2. 기능 구현 상세**
      
      
      Bootstrap의 grid 시스템을이용하여 반응형
      
      Glyphicon과 Font-awesome를 사용하여 Youtube와 비슷한 UI 구현
      
      검색 요청시 Youtube의 url에 GET방식으로 검색어를 붙여 Youtube 검색 결과 페이지로 이동
      
      광고를 닫은 후 영상 목록에서 이미지를 video box에 drag 할 시, ajax통신을 app.js에 있는 영상 공유 url을 
       가져와 페이지 이동 없이 재생
       
      Node.js를 이용하여 웹서버 구동(express 등)
      
      로그인/회원가입 및 부적합한 로그인일 경우 animate.css 효과를 사용하여 비동기 반응
      
      AWS EC2 가상 서버(ubutu16.04, nodejs)에서 보안 그룹 설정 및 웹 서버 접속 확인 (SSH client: FileZilla)
      



**3. 사용 기술**


      Javascript, jQuery, ajax, bootstrap, nodejs
      
      font_awesome, animate

