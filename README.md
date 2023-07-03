# next-issue

## 1. next 캐시
https://cafe.naver.com/hacosa?iframe_url_utf8=%2FArticleRead.nhn%253Fclubid%3D12566436%2526articleid%3D320158

![image](https://github.com/Plush777/next-issue/assets/87457620/1bb9e7c8-2d66-4f52-be75-ffdb6743f982)

next 마이그레이션 중, 동적경로 작업을 하다가 폴더 이름 중복이 있었는지 자꾸 위와 같은 오류가 나서 문제가 되는 폴더를<br/>
전부 지움. 지웠는데도 슬러그 중복 오류가 계속 발생해서 다음과 같은 작업으로 해결!
<br/><br/>
1. .next 폴더를 지우고
2. 모듈 버전 문제일 수도 있으니 npm update 
3. 그리고 npm run dev! 

<br/>

## 2. not-found 컴포넌트 버그?

![ezgif com-video-to-gif (1)](https://github.com/Plush777/next-issue/assets/87457620/375f5eb7-2b20-4058-a36c-9a9cfa4dcfe5)

404 Not found 페이지를 구현하기위해 next 13에서 제공하는 not-found 컴포넌트를 만들었는데, 위처럼 약 1초? 간격으로 자동으로 새로고침이 되버림.

### app/not-found.jsx
```js
export default function Notfound() {
    return <div>31232131231231231222</div>
}
```
코드는 이거밖에 없는데 자꾸 페이지가 자동으로 새로고침이 된다...

https://stackoverflow.com/questions/75302340/not-found-page-does-not-work-in-next-js-13

검색해본결과... 동적경로 폴더를 만들고 그 안에 notfound를 호출하면 된다!

<br/>

### app/[...not_found]/page.jsx
```js
import Link from 'next/link'
import { notFound } from "next/navigation"

export default function NotFoundCatchAll() {
  notFound()
  return null
}
```
요렇게 해주니까 페이지가 더 이상 새로고침 되지 않는다! 왜 이렇게 해야 잘 되는지...는 더 검색해봐야겠다





