import PushAlarmBtn from "components/atoms/Buttons/pushAlarmBtn";
import Icon from "components/atoms/Icons/Icon";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { gyeorugiMsg, message } from "recoils";
import {
  ButtonBox,
  ModalBox,
  ModalContent,
  ModalHeader,
  ModalSection,
  OverLay,
} from "./PushAlarm.styled";

import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { useTranslation } from "react-i18next";

const PushAlarm = () => {
  const sock = new SockJs("https://j6a506.p.ssafy.io/stomp/");
  const stomp = StompJs.over(sock);

  const { t } = useTranslation();
  const savedMsg = useRecoilValue(gyeorugiMsg);
  const resetMsg = useResetRecoilState(message);
  const navigate = useNavigate();

  console.log(savedMsg);

  const data = {
    hostId: savedMsg.hostId,
    guestId: savedMsg.guestId,
  };

  const Accept = (props) => {
    const data = {
      type: "ACCEPT",
      hostId: props.hostId,
      guestId: props.guestId,
    };
    stomp.send("/pub/api/que/user", {}, JSON.stringify(data));
    navigate("/gyeorugi/normal");
  };

  const Deny = (props) => {
    const data = {
      type: "REFUSE",
      hostId: props.hostId,
      guestId: props.guestId,
    };
    stomp.send("/pub/api/que/user", {}, JSON.stringify(data));
    resetMsg();
  };

  return (
    <>
      <OverLay>
        <ModalBox>
          <ModalSection>
            <ModalHeader>
              <span>BlackBelt</span>
              <Icon icon="xBtn" onClick={resetMsg} />
            </ModalHeader>
            <ModalContent>
              {savedMsg.hostNick} {t("push alarm request")}
            </ModalContent>
            <ButtonBox>
              <PushAlarmBtn onClick={() => Accept(data)}>
                {t("yes")}
              </PushAlarmBtn>
              <PushAlarmBtn onClick={() => Deny(data)}>{t("no")}</PushAlarmBtn>
            </ButtonBox>
          </ModalSection>
        </ModalBox>
      </OverLay>
    </>
  );
};
export default PushAlarm;
