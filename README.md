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

<br/

## 3. 다크모드 구현 시 화면 깜빡임

### 구현 코드

#### app/main/page.jsx
```js
const Main = ({ videoIds }) => {
  const [themeMode, setThemeMode] = useState(window.localStorage.getItem('theme'));

  return(
    ...
    <Header themeMode={themeMode} setThemeMode={setThemeMode}/>
  )
}
```

#### components/layout/Header.jsx
```js
const Header = ({ themeMode , setThemeMode }) => {
  return(
     ...
     <Settings themeMode={themeMode} setThemeMode={setThemeMode} display={settingToggle} />
  )
}
```

#### components/article/Settings.jsx
```js
const Settings = ({ display , themeMode , setThemeMode , setDisplay }) => {
  const handleTheme = (index) => {
        if(index === 0){
            setThemeMode('light');
        } else if(index === 1){
            setThemeMode('dark');
        }
  }

  useEffect(() => {
        document.body.dataset.theme = themeMode;
        window.localStorage.setItem('theme', themeMode);
    },[themeMode]);

    useLayoutEffect(() => {
        if(!window.localStorage.getItem('theme')){
            setThemeMode('light');
        }

        function getThemeMode() {
            const theme = window.localStorage.getItem('theme')
            return theme ? theme : 'dark'
        }
        document.body.dataset.theme = getThemeMode()
    },[themeMode]);
  }

  return(
    <Headerstyled.SettingItem>
        <Headerstyled.SettingTitle>{t(`settingTitles.group1.txt3`)}</Headerstyled.SettingTitle>
        
        <Headerstyled.SettingButtonList>
            {Object.values(settingData.settingButtons.group2).map((item,index) => {
                const fixActive = 
                themeMode === 'light' && index === 0 ? 'fixed' : 
                themeMode === 'dark' && index === 1 ? 'fixed' : 
                null;

                return(
                    <Buttonstyled.BtnSetting key={index} onClick={() => {
                        handleTheme(index)
                        handleActive('theme',index)
                    }} className={`${fixActive}`} >{item}</Buttonstyled.BtnSetting>
                )
            })}
        </Headerstyled.SettingButtonList>
    </Headerstyled.SettingItem>
  )
```

구현코드는 위와같이 로컬스토리지에 테마값을 담아서 구현했다.
작동은 잘되나 한가지 문제점이 생겨버렸다.

![ezgif com-video-to-gif (2)](https://github.com/Plush777/next-issue/assets/87457620/aa10eaae-de11-4cf5-ba94-bdc5fbbbd7dc)

페이지 새로고침 할 때마다 하얀색 화면이 생겼다가 없어지는 플래시 현상이 생겼다.

https://velog.io/@seungchan__y/SSR-%ED%99%98%EA%B2%BD%EC%9D%98-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B9%9C%EB%B9%A1%EC%9E%84-%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0#%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%98-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4

위 글 참고 후 아래와 같은 코드로 일단 플래시 현상은 해결했다.

#### app/BeforeThemeRender.jsx
```js
'use client';

export default function BeforeThemeRender(){
    const script = `
        (function () {
            document.body.dataset.theme = window.localStorage.getItem("theme") || 'light';

            if (document.body.dataset.theme === 'dark') {
                document.body.style.backgroundColor = '#121212';
            } else if (document.body.dataset.theme === 'light') {
                document.body.style.backgroundColor = '#ffffff';
            }
        })();
    `

    return <script defer dangerouslySetInnerHTML={{ __html: script }} />
}
```
즉시 실행함수 (IIFE) 를 써서 페이지가 렌더링 될 때 안에 있는 코드가 바로 실행되도록 해주었다.
그리고, 작성한 코드를 script 태그로 연결해주었다.

* dangerouslySetInnerHTML 속성으로 자바스크립트에서의 innerHTML 처럼 HTML 코드를 그대로 삽입할 수 있다. <br/>
(물론 이 방법은 XSS 공격에 취약해서 좋은 방법은 아니다. https://junhyunny.github.io/javascript/react/security/xss-weakness-when-dangerously-set-inner-html-attribute/)

<br/>

#### app/layout.jsx
```js
<body suppressHydrationWarning>
  <BeforeThemeRender/>
  ...
</body>
```
테마 스크립트가 삽입된 컴포넌트를 최상위 컴포넌트로 가서 body 바로 밑에 넣어주면 된다.
이렇게 잘 해결 된줄 알았으나... 새로운 경고가 콘솔에 생겼다.

![image](https://github.com/Plush777/next-issue/assets/87457620/ec974498-c532-447a-a246-f327d82f479f)

대충 서버쪽 컨텐츠와 클라이언트쪽 컨텐츠가 서로 불일치할 때 나타나는 오류이다.

=> 다크모드 구현 후 새로고침 시 기존 라이트 모드가 잠깐 적용되면서 하얀색 화면이 나왔다가 다크모드가 적용된다. <br/>
다크모드가 페이지 로드 후에 적용되기 때문에 이러한 현상을 없애기 위하여 즉시 실행함수로 페이지가 로드 될 때 실행 시켜서 <br/>
문제를 해결했는데 사실 이러한 작업은 서버가 아닌 클라이언트에서만 적용 된다.

<br/>

```js
<body suppressHydrationWarning>
 ...                
</body>
```
https://react.dev/reference/react-dom/hydrate#suppressing-unavoidable-hydration-mismatch-errors <br/>
오류를 없애고싶으면 `suppressHydrationWarning` 이라는 속성을 추가해주면 되는데 이 속성은 <br/>
단지 콘솔에서 오류를 없애주는것 뿐, 서버와 클라이언트 불일치 문제는 계속 남아있기 때문에 근본적인 해결책은 아니다.

<br/>
고민 좀 해봐야겠다.
 



