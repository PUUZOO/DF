import { FC } from "react";
import styled from "styled-components";

interface Props {
  name: string;
}

const PlusButton: FC<Props> = ({ name, ...props }) => {
  const getInitials = (name: string) => {
    const firstNameLetter = name.split(" ")[0][0].toUpperCase();
    const lastNameLetter = name.split(" ")[1][0].toUpperCase();

    return firstNameLetter + lastNameLetter;
  };

  const getRandomColor = () => {
    const colors = ["#FF0A80", "#16D479", "#FF8E0A"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const color = getRandomColor();

  const initials = getInitials(name);

  return (
    <AvatarStyled
      color={color}
      className='rounded-circle p-2 me-6 d-flex align-items-center justify-content-center'
      {...props}
    >
      <InitialsStyled>{initials}</InitialsStyled>
    </AvatarStyled>
  );
};

const AvatarStyled = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${(props) => props.color};
`;

const InitialsStyled = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
`;

export default PlusButton;
