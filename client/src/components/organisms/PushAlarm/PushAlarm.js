import Icon from "components/atoms/Icons/Icon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gyeorugiMsg, gyeorugiMsgState } from "recoils";
import {
  ModalBox,
  ModalContent,
  ModalHeader,
  ModalSection,
  OverLay,
} from "./PushAlarm.styled";

const PushAlarm = () => {
  const isAlarm = useSetRecoilState(gyeorugiMsgState);
  const message = useRecoilValue(gyeorugiMsg);
  console.log(message);
  return (
    <>
      <OverLay>
        <ModalBox>
          <ModalSection>
            <ModalHeader>
              <span>BlackBelt</span>
              <Icon icon="xBtn" />
            </ModalHeader>
            <ModalContent>{message.message}</ModalContent>
          </ModalSection>
        </ModalBox>
      </OverLay>
    </>
  );
};
export default PushAlarm;
