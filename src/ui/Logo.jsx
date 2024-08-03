import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 23rem;
  width: auto;
  margin: -4rem;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode
    ? './../public/default_transparent_1000x1000.png'
    : './../public/default_transparent_1000x1000.png';

  return (
    <StyledLogo>
      <Img src={src} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
