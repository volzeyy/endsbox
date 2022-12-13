import styled from "styled-components";
import PropertyBar from "./PropertyBar";

export const StyledPropertyBar = styled(PropertyBar)`
    display: ${({show}) => { return show ? "flex" : "none" }};
    padding: 10px 20px;
    overflow: auto;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    background-color: white;
    border-top: 1px solid rgb(233, 233, 233);
    width: 100%;
    z-index: 99999;
`