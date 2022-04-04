import PushAlarmBtn from "components/atoms/Buttons/pushAlarmBtn";
import Icon from "components/atoms/Icons/Icon";
import { Accept } from "pages/MainPage/startWS";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { gyeorugiMsg, gyeorugiMsgState, message } from "recoils";
import {
  ButtonBox,
  ModalBox,
  ModalContent,
  ModalHeader,
  ModalSection,
  OverLay,
} from "./PushAlarm.styled";

const PushAlarm = () => {
  const isAlarm = useSetRecoilState(gyeorugiMsgState);
  const savedMsg = useRecoilValue(gyeorugiMsg);
  const test = useRecoilState(gyeorugiMsgState);
  const resetMsg = useResetRecoilState(message);
  const data = {
    hostId: savedMsg.hostId,
    guestId: savedMsg.guestId,
  };

  const Delete = () => {
    resetMsg();
  };

  console.log(savedMsg);
  console.log(test);

  return (
    <>
      <OverLay>
        <ModalBox>
          <ModalSection>
            <ModalHeader>
              <span>BlackBelt</span>
              <Icon icon="xBtn" onClick={() => Delete()} />
            </ModalHeader>
            <ModalContent>{savedMsg.message}</ModalContent>
            <ButtonBox>
              <PushAlarmBtn onClick={() => Accept(data)}>Yes</PushAlarmBtn>
              <PushAlarmBtn>No</PushAlarmBtn>
            </ButtonBox>
          </ModalSection>
        </ModalBox>
      </OverLay>
    </>
  );
};
export default PushAlarm;
