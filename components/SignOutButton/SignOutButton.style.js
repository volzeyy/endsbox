import styled from "styled-components"
import SignOutButton from "./SignOutButton"

export const StyledSignOutButton = styled(SignOutButton)`
    --hover-color: rgb(216, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 4px 10px;
    border: 1px black solid;
    color: rgb(0, 0, 0);
    background-color: inherit;
    background-color: white;

    &:hover {
        border: 1px solid white;
        cursor: pointer;
        background-color: white;
        color: var(--hover-color);
        border: 1px solid var(--hover-color);
    }
`