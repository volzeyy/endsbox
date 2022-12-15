import styled from "styled-components"

export const MainContainer = styled.main`
    overflow: hidden;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    grid-template-rows: ${({toolbar}) => {return toolbar ? '1fr auto auto' : '1fr'}};
`