'use client';

import useYoutubeVideos from 'hooks/useYoutubeVideos';
import * as Videostyled from 'components/style/layout/VideoList.style';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState , useLayoutEffect } from 'react';

const VideoList = () => {
    const videos = useYoutubeVideos();
    const { t } = useTranslation();
    const language = useSelector(state => state.language);
    const [videoIntroTxt,setVideoIntroTxt] = useState({
        txt1: "이런 영상은 어때요?",
        txt2: "KARTRIDER TIPS의 추천 영상들을 만나보세요."
    });

    const videoFilter = videos.filter((item,index) => {
        return index < 3;
    });

    const videoRecommendFilter = videos.filter((item,index) => {
        return index > 2;
    });

    const videoFilterFunc = v => {
        const filteredVideos = v.map(item => {
            const snippet = item[0].snippet;
            const id = item[0].id;
            const dateSlice = snippet.publishedAt.slice(0,10); 
            
            return {
                snippet,
                dateSlice,
                id
            }
        });

        return filteredVideos;
    }

    useLayoutEffect(() => {
        if(language === 'ko'){
            setVideoIntroTxt({
                txt1: "이런 영상은 어때요?",
                txt2: "KARTRIDER TIPS의 추천 영상들을 만나보세요."
            });
        } else if(language === 'en'){
            setVideoIntroTxt({
                txt1: "How about this video?",
                txt2: "Check out the recommended videos of KARTRIDER TIPS."
            });
        } else if(language === 'ja'){
            setVideoIntroTxt({
                txt1: "このような映像はどうですか？",
                txt2: "KARTRIDER TIPSのおすすめのビデオをご覧ください。"
            });
        } else if(language === 'zh'){
            setVideoIntroTxt({
                txt1: "这样的视频怎么样？",
                txt2: "看看KARTRIDER TIPS的推荐视频。"
            });
        }
    },[language])

    return ( 
        <>
            <Videostyled.Box>
                <Videostyled.Title className="thinking">{t(videoIntroTxt.txt1)}</Videostyled.Title>
                <Videostyled.Group display="flex">
                    {videoFilterFunc(videoFilter).map((item,index) => {
                        const snippet = item.snippet;
                        const dateSlice = item.dateSlice; 
                        const id = item.id;

                        return(
                            <Videostyled.Item key={index} flex="1">
                                <Videostyled.Link href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
                                    <Videostyled.Thumbnail>
                                        <Videostyled.Img src={snippet.thumbnails.high.url} alt={snippet.title}/>
                                    </Videostyled.Thumbnail>

                                    <Videostyled.Head>
                                        <Videostyled.HeadTitle>
                                            {snippet.title}
                                        </Videostyled.HeadTitle>
                                    </Videostyled.Head>

                                    <Videostyled.Bottom>
                                        <Videostyled.BottomDescription>By&nbsp;{snippet.channelTitle}</Videostyled.BottomDescription>
                                        <Videostyled.BottomDescription>{dateSlice}</Videostyled.BottomDescription>
                                    </Videostyled.Bottom>
                                </Videostyled.Link>
                            </Videostyled.Item>
                        )
                    })}
                </Videostyled.Group>
            </Videostyled.Box>

            <Videostyled.Box>
                <Videostyled.Title className="fire">{t(videoIntroTxt.txt2)}</Videostyled.Title>
                <Videostyled.Group display="grid" gtc="repeat(3, 1fr)" rg="60px">
                    {videoFilterFunc(videoRecommendFilter).map((item,index) => {
                        const snippet = item.snippet;
                        const dateSlice = item.dateSlice; 
                        const id = item.id;

                        return(
                            <Videostyled.Item key={index}>
                                <Videostyled.Link href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
                                    <Videostyled.Thumbnail>
                                        <Videostyled.Img src={snippet.thumbnails.high.url} alt={snippet.title} aspectRatio="5.339/3"/>
                                    </Videostyled.Thumbnail>

                                    <Videostyled.Head>
                                        <Videostyled.HeadTitle>{snippet.title}</Videostyled.HeadTitle>
                                    </Videostyled.Head>

                                    <Videostyled.Bottom>
                                        <Videostyled.BottomDescription>By&nbsp;{snippet.channelTitle}</Videostyled.BottomDescription>
                                        <Videostyled.BottomDescription>{dateSlice}</Videostyled.BottomDescription>
                                    </Videostyled.Bottom>
                                </Videostyled.Link>
                            </Videostyled.Item>
                        )
                    })}
                </Videostyled.Group>
            </Videostyled.Box>
        </>
    );
}

export default VideoList;