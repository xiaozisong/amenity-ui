import { createFromIconfontCN } from '@ant-design/icons';

export interface IconProps {
  scriptUrl: string;
}

const icon = ({ scriptUrl }: IconProps) => createFromIconfontCN({ scriptUrl });

export default icon;