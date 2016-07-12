# jQuery vs React

## 1. React 런칭 배경

React는 Facebook에서 내부적으로 개발하고 2013년에 오픈소스로 런칭한 js 라이브러리이다.  
Facebook은 자체적으로 XHP라는 PHP를 사용하여 개발했으나 PHP는 결국 원하는 요청에 대한 결과를 서버에서 처리 후 전송되기 때문에 사용자 경험 면에서 부족한 면들이 있기 마련이다.  
  
이러한 제약 사항을 빠르게 해결하기 위한 가장 좋은 방향은 사용자 경험의 부족한 면을 가장 빠르게 해소할 수 있는 방향으로의 개발이 필요했고,  
결국 서버측은 PHP 그대로, 클라이언트측은 새로운 라이브러리를 사용하도록 개발하여 서버측 자원은 그대로 쓸 수 있도록 진행이 되었고,  
결국 View만을 다루는 Library를 탄생시키게 되었다.  
다른 Angular나 Backbone 처럼 양방향이 아니기 때문에 반드시 다른 Framework와 결합해야만 한다.(물론 M, C를 직접 설계해도 됨)

## 2. DOM 업데이트

### jQuery

jQuery의 경우 DOM을 업데이트하기 위해서는 이벤트의 발생에 따라 뷰 데이터를 갱신해 줘야 한다.  
[버튼 클릭시 텍스트 변경](http://codepen.io/luensys/pen/QEOEmy)  
문제는 이러한 컴포넌트가 증가하게 된다면 각 이벤트에 따른 DOM 변경이 복잡해지며,  
관리도 매우 어려줘지게 된다.

### React

React의 경우 Vitual DOM을 변경하도록 해주므로 뷰 데이터 갱신을 위한 로직이 따로 필요하지는 않다.
DOM에 해당하는 부분의 변경시 즉각적으로 DOM이 변경되기 때문이다.


### 가장 큰 차이

jQuery의 경우 각 이벤트에 따른 해당 DOM 변경을 전체적으로 관리를 하여야 하므로 여러 이벤트가 한 DOM을 볼 때 관리가 점점 더 어려워지게 될 것이다.  
하지만 React의 경우는 해당 DOM의 값이 변할 때 마다 자동으로 갱신이 되므로 좀 더 쉬운 View 처리가 가능할 것으로 보인다.
[버튼 클릭시 테이블 추가 삭제](http://codepen.io/luensys/pen/Eybgjp)



###참조
[React에 관해서](http://lazydev.tistory.com/entry/React1-React%EC%97%90-%EA%B4%80%ED%95%B4%EC%84%9C)
[React 배우는 방법](http://mobicon.tistory.com/461)