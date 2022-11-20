import styled from "styled-components";
import UserAvatar from "./UserAvatar";

export const StyledUserAvatar = styled(UserAvatar)`
    width: 30px;
    height: 30px;
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