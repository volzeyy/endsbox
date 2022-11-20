import styled from "styled-components";
import NavBar from "./NavBar"

export const StyledNavBar = styled(NavBar)`
    z-index: 1000000;
    color: black;
    width: 100%;
    padding: 10px 20px;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px rgb(227, 227, 227) solid;
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    justify-content: space-between;
`