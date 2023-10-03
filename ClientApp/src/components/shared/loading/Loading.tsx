import * as React from "react";
import { FC } from "react";

export enum LoadingTheme {
    big = "big",
    bird = "bird",
    medium = "medium",
    chips = "chips",
    select = "select",
}
export interface LoadingProps {
    theme?: LoadingTheme;
    /**
     * set this flag for centring loading inside window
     */
    fixed?: boolean;
    /**
     * set this flag for centering loading inside relative parent
     */
    absolute?: boolean;
    /**
     * set this flag for covering whole window with loading container
     */
    covered?: boolean;

    withDelay?: boolean;
    className?: string;
    /**
     * set this flag for loader that need paddings in 16px
     */
    withPaddings?: boolean;
    dataTestId?: string;

    message?: string;
}

export const Loading: FC<LoadingProps> = ({message = "Loading..."}) => {
    return (
        <div role="status" aria-label="loading">
            <p><em>{message}</em></p>
        </div>
    );
};

export default Loading;
