import styled from "styled-components"
import Tool from "./Tool"

export const StyledTool = styled(Tool)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;

    &:hover {
        & .tool-tip {
            transition: 0.5s;
            color: white;
            transition-delay: 0.3s;
            transform: translate(-50%, 0);
            visibility: visible;
            opacity: 1;
        }
    }

    & .tool {
        position: relative;
        transition: 0.2s;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px;
    }

    & .tool-tip {
        bottom: 50px;
        font-size: 12px;
        line-height: 3px;
        width: max-content;
        position: absolute;
        left: 50%;
        right: 50%;
        padding: 2px 10px 2px 10px;
        background-color: black;
        box-sizing: border-box;
        visibility: hidden;
        opacity: 0;
        transition: 0.5;
        border-radius: 5px;
        transform: translate(-50%, 0px);
        z-index: 10000001;
    }

    & .default:hover {
        transition: 0.2s;
        border-radius: inherit;
        color: rgb(145, 145, 145);
        background-color: rgb(247, 247, 247);
        cursor: pointer;
    }

    & .active {
        background-color: black;
        color: white;
    }


`