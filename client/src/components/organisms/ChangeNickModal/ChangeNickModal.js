import { useSetRecoilState } from "recoil";
import { changeNickname } from "recoils";
import Icon from "components/atoms/Icons/Icon";
import {
  ButtonLight,
  ModalBox,
  ModalContent,
  ModalHeader,
  ModalSection,
  NicknameInput,
  OverLay,
} from "./ChangeNickModal.styled";

const ChangeNickModal = () => {
  const isOpen = useSetRecoilState(changeNickname);

  return (
    <OverLay>
      <ModalBox>
        <ModalSection>
          <ModalHeader>
            <Icon icon="xBtn" onClick={() => isOpen(false)} />
          </ModalHeader>
          <ModalContent>
            <NicknameInput />
            <ButtonLight>yes</ButtonLight>
          </ModalContent>
        </ModalSection>
      </ModalBox>
    </OverLay>
  );
};
export default ChangeNickModal;
