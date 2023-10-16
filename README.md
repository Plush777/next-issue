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

<br/>

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

<br/>

## 4. 페이지 타이틀 및 메타태그 설정
https://velog.io/@sky/Next.js-13%EB%B2%84%EC%A0%84-app%EC%97%90%EC%84%9C-metaTag-title-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

<br/>

## 5. 네이버 검색 api cors 우회요청

```js
const url = `https://openapi.naver.com/v1/search/news.xml?`
```
네이버 검색 api 호출 시 url을 위와같이 작성하면 cors 오류가 발생한다. <br/>
네이버에서 클라이언트의 요청을 허용하고 있지 않기 때문에, **프록시** 를 사용하여 우회요청 해야한다.

```js
//next.config.js
async rewrites() {
    return [{
        source: "/api/:path*",
        destination: "https://openapi.naver.com/:path*"
    }, ];
}
```
next config에서 `rewrites()` 를 추가해준다. <br/>
`rewrites()` 는 request url의 패턴을 확인하고 일치하게되면 페이지 이동이 아닌 매핑주소로 요청을 하게된다. <br/>
즉, 요청 주소와 실제로 요청하는 주소가 분리되게 되어 민감한 데이터 (api키 같은 것) 들을 숨길 수도 있다. <br/>

내 상황은 get 요청에서 api 키를 숨기거나 하는 용도는 아니기 때문에 약간 다르다. <br/>
네이버 api 자체가 서버요청만 허용하기 때문에, `/api/:path*` 경로로 호출하면 destination에 설정 된 경로로 요청을 하게 된다. 
(여기서 `:path*` 는 어떠한 문자열도 올 수 있다는 뜻이다. `/abc/:path*` 면 `/abc/123` , `/abc/aaa` 등... 처럼 다 올 수 있게된다.)

<br/>

```js
const url = `/api/v1/search/news.xml?`
```
destination에 기본 api url 적어준 다음에, 호출할 때는 source에 적힌 url대로 (/api로 시작하는) 설정해주면 된다. <br/>
`/:path*` 로 설정하면 모든 url을 다 감지하기 때문에 사이트 url이 바뀌었을 때 이상하게 동작될 수 있다.

<br/>

## 6. API 중복 호출 문제

![image](https://github.com/Plush777/next-issue/assets/87457620/6f7d153f-6ac8-45ba-9740-ba4a89dff334)

현재 메인 페이지에는 위와같은 셀렉트 박스가 있다.
옵션 값을 누르면 해당 api의 url이 동적으로 바뀌어서 호출되는 형식이다.

해당 옵션 값에 맞는 결과물을 렌더링 해야했기에, 동적 라우팅으로 구현을 했다. <br/>
처음엔, 옵션 값을 클릭했을 때 ` location.reload()` 로 페이지 전체를 새로고침 하는 방법을 생각했으나, <br/>
이렇게 하면 UX적으로 안좋을거 같기도 하고 자꾸 새로고침 되는게 마음에 안들어서 이 방법은 안썼다. <br/>

순조롭게 잘 구현이 된 줄 알았으나... 옵션 값을 한 두번 누를 땐 괜찮았는데, <br/>
수십번 누르니까 브라우저가 먹통이 되는 문제가 발생했다. 정확히는 브라우저가 먹통이 된다기 보단, 내 페이지가 먹통이 됬다. <br/>
(브라우저 자체 기능은 잘 동작을 했다.)

<br/>

하나의 페이지에 API를 너무 많이 불러와서? 인가도 생각해봤지만 개발 오픈채팅방에 물어보니까 <br/>
그건 아닐 것이라고 하여 원인을 계속 분석해보았다. <br/>

3일 넘게 삽질만 하다가 결국은 개발자 도구에서 네트워크 탭을 보니 **동일한 api가 계속 호출**되고 있었다는 것을 확인했다!

![image](https://github.com/Plush777/next-issue/assets/87457620/789773ee-40f4-468b-be04-c4f69d22cbb8)

해당 페이지에서 youtube api로 유튜브 영상 6개를 가져와서 출력하는데, <br/>
셀렉트 옵션 값을 누를 때마다 youtube api를 계속 호출하는 것이였다. <br/>
기본으로 6개를 출력하니까 누를 때마다 6개의 api 요청이 추가 되는 것이다. 그래서 먹통이 되었던 것!

<br/>

원인은 동적 라우팅으로 구현해서 라고 생각된다.

/main/(id값 1) <br/>
/main/(id값 2) <br/>
/main/(id값 3) 

<br/>

이렇게 url이 바뀌어버리면 페이지 자체가 리로드 되기때문에 다른 api들도 자동으로 계속 호출이 되는 것이다.

<br/>

### 해결

동적 라우팅 대신 쿼리스트링으로 처리하고, 해당 api 함수에 제한을 걸어주었더니 해결이 되었다!

```js
const handleRouter = () => {
    router.push(`/main?select=${getChannel}`);
}
```
위처럼 쿼리스트링으로 url을 구성해주니까 페이지 리로드 없이 말끔하게 처리 되었고,

```js
const fetchVideos = useCallback(async () => {
    if (videos.length > 5) {
        return;
    }

    try {
       ...
    } catch (error) {
       ...
    }
}, [videos]);
```

위와 같이 조건을 추가해주었더니 옵션 값을 클릭 해도 api 요청이 6개 이상 초과 되지 않는다!
`videos.length > 5` 의 의미는 `videos` 가 해당 api의 데이터들인데, 이 데이터가 5개를 초과하면 하던 동작을 멈춘다는 뜻이다.

<br/>

이 이슈를 해결하기 위해 다음 사이트들을 참고했다.
- https://www.kakaocorp.com/page/news
- https://velog.io/trending/week

<br/>

이번 이슈를 해결 해보면서 동적 라우팅이나 쿼리스트링은 어떤 상황일 때 처리하는지 알게되었고, 정답은 다 개발자 도구에 있다는 것! 을 알았다. 😊😊

<br/>

## 7. &lt;Link&gt; 클릭 시 스크롤이 최상단으로 이동하는 문제

![image](https://github.com/Plush777/next-issue/assets/87457620/3f971761-2d98-47e2-be9d-f90ea46d7bbc)

위 커스텀 셀렉트 박스에서 아이템들을 `li > a` 형태로 렌더링을 했다. <br/>
작동은 잘되나, 클릭 했을 때 스크롤이 최상단으로 가는 문제가 생겼다. 별거 아닌거 같지만 사용자 입장에선 불편할 것 같아서 없애는걸 찾아봤는데... <br/>
해결법이 너무 간단했다.

```js
<Link scroll={false} href={href}>{text}</Link>
```
https://nextjs.org/docs/pages/api-reference/components/link#scroll

클릭 했을 때 최상단으로 이동하지 않으려면 Link 컴포넌트에 scroll 옵션을 false로 주면 된다 🥲 <br/>
(기본 값은 true)

<br/>

## 8. 새로고침 시 Swiper 움직임 문제

![image](https://github.com/Plush777/next-issue/assets/87457620/2a134a5c-27f4-41e1-98a9-4ef91a68c384)

서브 페이지에 위와 같이 탭 ui가 있다. 이걸 처음에는 ul li로 구성했다가, Swiper로 바꿔서 구현했다. <br/>
이유는, 모바일처럼 화면이 줄어들면 탭 전체에 스크롤이 생기게 되는데, 사용자가 스크롤을 넘기고 탭을 클릭했을 때 <br/>
누른 탭으로 스크롤 위치가 이동되는 동작을 구현하고 싶어서이다. <br/>

구현한다면 Swiper 없이도 할 수 있겠으나, Swiper로 하는게 제일 간단해보여서 선택했다.


![ezgif com-video-to-gif](https://github.com/Plush777/next-issue/assets/87457620/defd98f3-9011-4e8e-9799-0111ab596509)

구현은 됐으나, 위와 같은 문제가 생겼다. <br/>
스크롤을 땡겨서 탭을 누른 후 페이지가 로드되거나 하면 순간적으로 스크롤 위치가 이동되는 현상이 있었다. 

```js
useLayoutEffect(() => {
    if(swiper){
        swiper.slideTo(getTabActiveIndex);
    }
}, [swiper]);
```
해당 문제는 위 코드때문인 것으로 보인다. 렌더링 이전에 미리 swiper slide 위치를 누른 탭 위치로 이동시키는 코드이다.

<br/>

해결은 다음과 같이 했다.

![ezgif com-video-to-gif (4)](https://github.com/Plush777/next-issue/assets/87457620/9a3c1fe2-22b4-47fe-a31f-d508ab1a2ea6)

swiper-wrapper 자체에 트랜지션이 걸려있어서 저런 불필요한 움직임이 발생하는 것이다. <br/>
(해당 트랜지션은 처음에 0초였다가 swiper 스크롤하고 끝날 때 0.3초로 변했다가 다시 0초로 바뀐다.)

```js
const [touchMove, setTouchMove] = useState(false);

const handleTouchEnd = () => {
    setTouchMove(true);

    setTimeout(() => {
        setTouchMove(false);
    }, 300);
}
```
swiper-wrapper의 트랜지션을 css 클래스로 제어할 것이기 때문에 state 하나 생성 하고, <br/>
0.3초 뒤에 false가 되도록 해준다. 이렇게 해주면 처음엔 false, 해당 함수가 호출되면 true가 되었다가 0.3초 뒤에 다시 false가 된다. <br/>
(굳이 0.3초인 이유는 해당 swiper-wrapper의 트랜지션이 0.3초로 설정되있기 때문)


```js
<SubTabstyled.TabListSwipe {...swiperParams} onSwiper={(swiper) => setSwiper(swiper)}
onTouchEnd={handleTouchEnd} className={touchMove && 'touchMoveActive'}>
    ...
</SubTabstyled.TabListSwipe>
```

만들어둔 함수는 swiper-wrapper가 되는 컴포넌트에 onTouchEnd 이벤트 안에 넣어주고, className에는 touchMove state가 true일 때만 touchMoveActive 클래스를 추가하도록 조건을 넣어준다. <br/>
여기서 onTouchEnd는 swiper 스크롤이 끝나는 시점에서 해당 함수를 호출하게 하는 이벤트이다.

```css
export const TabListSwipe = styled(Swiper)`
    &.touchMoveActive{
        .swiper-wrapper{
            transition-duration: 300ms !important;
        }
    }

    .swiper-wrapper{
        transition-duration: 0ms !important;
    }
`;
```
마지막으로 css는 위와같이 작성해주면 끝이다! <br/><br/>

1. 처음에 swiper-wrapper 트랜지션을 없앤다.
2. swiper-wrapper 스크롤 후 끝나는 시점에 touchMoveActive 클래스를 추가하여 트랜지션을 추가한다.
3. 위에서 만들었던 handleTouchEnd 함수에 의해 추가 된 클래스는 0.3초 뒤에 다시 제거되면서 트랜지션을 제거 시킨다.

<br/>

![ezgif com-video-to-gif (2)](https://github.com/Plush777/next-issue/assets/87457620/17d6c5f5-4924-4775-910f-5685e5f720bd)


그냥 트랜지션만 없애주면 간단하게 해결되지 않을까란 생각도 해봤는데, <br/>
새로고침 했을 때의 문제는 해결되나, 위처럼 스와이퍼를 스크롤 했을 때 움직임이 뚝뚝 끊기게 되서 상당히 부자연스럽게 되버린다.

<br/>

![ezgif com-video-to-gif (3)](https://github.com/Plush777/next-issue/assets/87457620/342c4c03-3f00-4d4f-a456-df4188b630fe)

그래서 스와이퍼 스크롤이 끝나는 시점에 맞춰서 트랜지션을 제어해주면 위와같이 2개의 문제 모두 해결이 되었다 !!
