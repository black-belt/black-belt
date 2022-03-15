import styled from "styled-components";
import { colors, fontSize } from "_foundation";

// export const GoogleLoginBtn = styled.button`
//   width: 305px;
//   height: 55px;

//   background-color: ${colors.gray0};
//   align-items: center;

//   border-radius: 8px;
//   border: 1px solid ${colors.gray5};

//   cursor: pointer;
// `;

export const GoogleLoginBtn = styled.button`
  width: 305px;
  height: 55px;

  background-color: ${colors.gray1};
  align-items: center;

  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  border: none;

  cursor: pointer;
`;

export const GoogleWrapper = styled.div`
  width: 240px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  margin: 15px 28px 12px 28px;
`;

export const GoogleContent = styled.div`
  svg {
    width: 23px;
    height: 23px;
  }

  span {
    font-size: ${fontSize.lg};
    color: ${colors.gray7};
    margin-left: 0.5rem;
  }
`;
