import { useSetRecoilState } from "recoil";
import { gyeorugiMsgState } from "recoils";
import {
  ModalBox,
  ModalContent,
  ModalHeader,
  ModalSection,
  OverLay,
} from "./PushAlarm.styled";

const PushAlarm = () => {
  const isAlarm = useSetRecoilState(gyeorugiMsgState);
  return (
    <>
      <OverLay>
        <ModalBox>
          <ModalSection>
            <ModalHeader></ModalHeader>
            <ModalContent></ModalContent>
          </ModalSection>
        </ModalBox>
      </OverLay>
      <></>
    </>
  );
};
export default PushAlarm;
