import React from "react";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip"
const LogoWrapper = styled.div`
  display: inline;
  height: 20px;
  width: 20px;
`;




const Logo = ({ children, tip }) => {

 
  return (
    <Tooltip title={tip}>
      <LogoWrapper>{children}</LogoWrapper>
    </Tooltip>
  );
};

export default Logo;
