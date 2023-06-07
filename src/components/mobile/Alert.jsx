'use client';

import * as Alertstyled from "components/style/mobile/Alert.style";
import * as Buttonstyled from "components/style/common/Button.style";
import { useDispatch } from "react-redux";
import { setOpenInNew } from "redux/store/store";
import useBodyScrollLock from 'hooks/useBodyScrollLock';

const Alert = () => {
    const { openScroll } = useBodyScrollLock();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setOpenInNew(false));
        openScroll();
    }

    const gotoNewPage = () => {
        window.open('https://kartdrift.nexon.com/kartdrift/ko/main','_blank');

        let timer = setTimeout(() => {
            handleClose();
        }, 1000);
        
        return () => {clearTimeout(timer)};
    }    

    return ( 
        <Alertstyled.Wrap>
            <Alertstyled.Inner>
                <Alertstyled.TitleArea>
                    <Alertstyled.Title>페이지가 이동됩니다.</Alertstyled.Title>
                </Alertstyled.TitleArea>
                <div className="paragraphArea">
                    <Alertstyled.Paragraph>카트라이더 홈페이지 (https://kartdrift.nexon.com/kartdrift/ko/main) 로 페이지가 이동됩니다.</Alertstyled.Paragraph>
                    <Alertstyled.Paragraph>이동할까요?</Alertstyled.Paragraph>
                </div>
                <Alertstyled.BtnArea>
                    <Buttonstyled.Btn height="44px" radius="4px" padding="0 16px" color="#000" background="#ccc" fontSize="1rem" onClick={handleClose}>아니요</Buttonstyled.Btn>
                    <Buttonstyled.Btn height="44px" radius="4px" padding="0 16px" color="#fff" background="#333" fontSize="1rem" onClick={gotoNewPage}>이동할래요</Buttonstyled.Btn>
                </Alertstyled.BtnArea>
            </Alertstyled.Inner>
        </Alertstyled.Wrap>
    );
}

export default Alert;