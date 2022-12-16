import styled from "styled-components"
import BoxView from "./BoxView.js"

export const StyledBoxView = styled(BoxView)`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100vh;

    & > * {
        overflow: hidden;
    }
`