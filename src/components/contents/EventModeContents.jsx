'use client';

import * as Substyled from 'components/style/common/Area.style';
import BtnTop from 'components/article/BtnTop';
import React from 'react'; 
import { useTranslation } from 'react-i18next';
import { Min768 } from 'components/style/mobile/MediaQuery';
import { useSelector } from 'react-redux';
import BtnClipBoard from 'components/article/BtnClipBoard';
import ClipBoardAlert from 'components/article/ClipBoardAlert';
import SeasonOne from 'components/contents/rank/SeasonOne';
import SeasonTwo from 'components/contents/rank/SeasonTwo';
import Accordion from 'components/contents/rank/Accordion';

const EventContents = ({ eventContents }) => {

    let clipBoardDisplay = useSelector(state => state.toggle.clipBoard);
    const { t } = useTranslation();

    const accordions = [
        {
            id: 1,
            title: t(`evItem.evDepth1.group2.title`),
            content: <SeasonOne eventContents={eventContents}/>,
        },
        {
            id: 2,
            title: t(`evItem.evDepth2.group1.title`),
            content: <SeasonTwo eventContents={eventContents}/>,
        },
    ];

    return ( 
        <>
            <ClipBoardAlert active={clipBoardDisplay && 'active'}/>
            <Min768>
                <ClipBoardAlert active={clipBoardDisplay && 'active'}/>
            </Min768>

            <Substyled.Wrap>
                <Substyled.Inner>
                    <div className="container">
                        <div className="titleArea">
                            <Substyled.Title>{t(`evItem.evDepth1.group1.title`)}</Substyled.Title>
                            <Substyled.Desc>{t(`evItem.evDepth1.group1.description`)}</Substyled.Desc>
                        </div>
                    </div>

                    {accordions.map((item,index) => {
                        return(
                            <Accordion
                                key={index}
                                title={item.title}
                                accordionContent={item.content}
                            />
                        )
                    })}

                    <BtnClipBoard/>
                    <BtnTop/>
                </Substyled.Inner>
            </Substyled.Wrap>
        </>
    );
}

export default EventContents;