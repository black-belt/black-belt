import Icon from "components/atoms/Icons/Icon";
import GoogleButton from "components/atoms/Buttons/GoogleButton/GoogleButton";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  Overlay,
  ModalBox,
  ModalSection,
  ModalContent,
  ModalHeader,
  Logo,
  Footer,
  FooterLink,
} from "./LoginModal.styled";
import { loginModalState } from "recoils";

const LoginModal = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(loginModalState);
  const closeModal = useCallback(() => {
    setIsModalOpen(null);
  }, [setIsModalOpen]);
  return (
    <>
      <Overlay>
        <ModalSection>
          <ModalContent>
            <ModalHeader>
              <Icon icon="xBtn" onClick={() => setIsModalOpen(null)} />
            </ModalHeader>
            <ModalBox>
              <Logo>
                <img src="/images/logo.png" alt="" />
              </Logo>
              <GoogleButton />
              <Footer>
                New to BlackBelt?
                <FooterLink to="/main">Create an Account</FooterLink>
              </Footer>
            </ModalBox>
          </ModalContent>
        </ModalSection>
      </Overlay>
    </>
  );
};
export default LoginModal;
