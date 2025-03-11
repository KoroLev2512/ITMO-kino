import React from "react";
import {IconProps} from "./types";

const LogoHorizontalIcon = (
    {
        height = 14,
        width = 14,
    }: IconProps) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
        >
            <circle
                cx="7"
                cy="7"
                r="7"
                fill="white"
            />
            <path
                d="M9.49756 6.30436L6.0174 4.56428C5.39683 4.254 4.66667 4.70526 4.66667 5.39908V8.60097C4.66667 9.2948 5.39683 9.74606 6.0174 9.43577L9.49756 7.69569C10.0708 7.40906 10.0708 6.59099 9.49756 6.30436Z"
                fill="black"
            />
        </svg>
    );
};

export default LogoHorizontalIcon;
