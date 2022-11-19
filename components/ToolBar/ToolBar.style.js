import styled from "styled-components"
import ToolBar from "./ToolBar"

export const StyledToolBar = styled(ToolBar)`
    --background-color: #e4e4e4;
    --selected-background-color: #000000;
    background-color: white;
    z-index: 1000000;
    width: inherit;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px rgb(227, 227, 227) solid;   

    & .action-group {
        background-color: var(--background-color);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 10px;
    }
`
