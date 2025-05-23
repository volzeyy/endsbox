import styled from "styled-components"
import ToolBar from "./ToolBar"

export const StyledToolBar = styled(ToolBar)`
    --background-color: #e4e4e4;
    --selected-background-color: #000000;
    background-color: ${({show}) => show ? "white" : "rgba(0,0,0,0)"};
    z-index: 1000000;
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: ${({mobile}) => mobile ? "60px" : "0px"};

    & .action-group {
        background-color: var(--background-color);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 6px;
    }
`
