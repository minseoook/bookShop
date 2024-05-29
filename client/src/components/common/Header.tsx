import { styled } from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
      <h1>header</h1>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.color.background};
  h1 {
    color: white;
  }
`;
export default Header;
