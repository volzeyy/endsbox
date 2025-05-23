import styled from "styled-components"
import SignInButton from "./SignInButton"

export const StyledSignInButton = styled(SignInButton)`
    --hover-color: rgb(0, 81, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 4px 10px;
    border: 1px black solid;
    color: rgb(0, 0, 0);
    background-color: inherit;
    background-color: white;

    & span {
        padding: 0px 5px 0px 0px;
    }

    &:hover {
        border: 1px solid white;
        cursor: pointer;
        background-color: white;
        color: var(--hover-color);
        border: 1px solid var(--hover-color);
    }
`