import styled from "styled-components";
import UserAvatar from "./UserAvatar";

export const StyledUserAvatar = styled(UserAvatar)`
    width: 35px;
    height: 35px;
    border-radius: 100%;

    & img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    &:hover {
        cursor: pointer;
    }
`