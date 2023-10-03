import * as React from "react";
import { ApplicationPaths } from "../api-authorization/ApiAuthorizationConstants";

interface AvatarProps {
    userId: string;
    size?: number;
    round?: boolean;
    username: string;
}

export const userAvatarDefaultSize = 32;
// TODO. Add hash to user avatar and caching mechanism
export const getAvatarUrl = (userId: string, size: number, hash?: string) =>
    `${ApplicationPaths.users.getAvatar(userId)}?size=${size}` + (hash ? `&hash=${hash}` : "");

export const UserAvatar = ({userId, size = userAvatarDefaultSize, round = true, username }: AvatarProps) => {
    const url = getAvatarUrl(userId, size)

    return (
        <div
            title={username}
            style={{
                width: size,
                height: size,
                borderRadius: round ? "50%" : 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <img src={url} style={{ width: "100%" }} alt=""/>
        </div>
    );
} 
