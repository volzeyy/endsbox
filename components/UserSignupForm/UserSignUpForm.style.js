import styled from "styled-components";
import UserSignUpForm from "./UserSignUpForm"

export const StyledUserSignUpForm = styled(UserSignUpForm)`
    & .background {
        width: 100%;
        height: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
    }

    & .form {
        background-color: white;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 5px;
        padding: 10px;
        display: grid;
    }
`