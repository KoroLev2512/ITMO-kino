import React from "react";
import styled from "styled-components";
import { IconProps } from "./types";

const StyledPlayIcon = styled.svg`
    circle {
        fill: white;
    }
    path {
        fill: black;
    }
`;

const PlayIcon = ({ height = 14, width = 14 }: IconProps) => {
    return (
        <StyledPlayIcon
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
        >
            <circle cx="7" cy="7" r="7" />
            <path
                d="M9.49756 6.30436L6.0174 4.56428C5.39683 4.254 4.66667 4.70526 4.66667 5.39908V8.60097C4.66667 9.2948 5.39683 9.74606 6.0174 9.43577L9.49756 7.69569C10.0708 7.40906 10.0708 6.59099 9.49756 6.30436Z"
            />
        </StyledPlayIcon>
    );
};

export default PlayIcon;
