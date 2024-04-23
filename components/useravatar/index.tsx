import React, { memo } from 'react';
import { Avatar, AvatarProps } from 'antd';

export interface UserAvatarProps extends AvatarProps {
  pictureId?: string;
  userName?: string;
  src: string;
}

const UserAvatar = memo(
  ({ pictureId, userName, src, ...restProps }: UserAvatarProps) => {
    if (pictureId) {
      return <Avatar {...restProps} src={src} />;
    }
    return <Avatar {...restProps}>{userName}</Avatar>;
  },
);

export default UserAvatar;
