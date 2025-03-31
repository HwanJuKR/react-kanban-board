import { styled } from "styled-components";

const FooterWrap = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 16px;
  color: #fff;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrap>© 2025 Created by HwanJu</FooterWrap>
  )
}

export default Footer;