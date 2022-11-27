import styled from "styled-components";
import NavBar from "./NavBar"

export const StyledNavBar = styled(NavBar)`
    z-index: 1000000;
    color: black;
    width: 100%;
    padding: 10px 20px;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px rgb(227, 227, 227) solid;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .right-side {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;

        & a {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`