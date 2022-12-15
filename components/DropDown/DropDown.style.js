import styled from "styled-components";
import DropDown from "./DropDown";

export const StyledDropDown = styled(DropDown)`
    position: absolute;
    top: 40px;
    right: 15px;
    color: black;
    background-color: white;
    border-radius: 6px;
    width: auto;
    height: auto;
    box-shadow: 0px 2px 5px;

    & p {
        margin: 0px;
    }

    & .dropdown-header {
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        & img {
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }

        & .user-info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 4px;

            & .user-display-name {
                font-size: 1.4rem;
            }

            & .user-username {
                font-size: 0.8rem;
            }
        }
    }

    & .dropdown-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        & .sign-out {
            padding: 10px;
            width: 100%;
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
                cursor: pointer;
            }
        }

        & .dropdown-body-section {
            padding: 10px;
            width: 100%;
        }
    }

    & .log-in {
        font-weight: 500;
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        & p {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }

        &:hover {
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.1);
            color: black;
            border-radius: 6px 6px 0px 0px;
        }
    }

    & .legals-container {
        padding: 4px 10px;
        border-top: 1px rgba(0, 0, 0, 0.1) solid;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 6px;

        & {
            font-size: 14px;

        }
    }
`