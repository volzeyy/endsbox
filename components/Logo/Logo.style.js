import styled from "styled-components"
import Logo from "./Logo"

export const StyledLogo = styled(Logo)`
    height: 20px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible !important;

    & .img-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & img {
        width: 35px;
    }
`