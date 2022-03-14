import Icon from "components/atoms/Icons/Icon";
import GoogleButton from "components/atoms/Buttons/GoogleButton/GoogleButton";
import React from "react";
import {
  Overlay,
  ModalBox,
  ModalSection,
  ModalContent,
  ModalHeader,
  Logo,
  Footer,
  FooterLink,
} from "./SignupModal.styled";

const SignupModal = ({ ...props }) => {
  return (
    <>
      <Overlay>
        <ModalSection>
          <ModalContent>
            <ModalHeader>
              <Icon icon="xBtn" />
            </ModalHeader>
            <ModalBox>
              <Logo>
                <img src="/images/logo.png" alt="" />
              </Logo>
              <GoogleButton />
              <Footer>
                Already have an Account?
                <FooterLink to="/main">Sign In</FooterLink>
              </Footer>
            </ModalBox>
          </ModalContent>
        </ModalSection>
      </Overlay>
    </>
  );
};
export default SignupModal;
