import { useTheme } from 'antd-style';

export const useContentSize = (size?: 'small' | 'large' | 'compact') => {
  const token = useTheme();
  let contentHeight = token.controlHeight;
  let paddingContentVertical = token.paddingContentVertical;
  let paddingContentHorizontal = token.paddingContentHorizontal;
  let borderRadius = token.borderRadius;
  let borderCardRadius = token.borderRadiusLG;
  switch (size) {
    case 'small':
      contentHeight = token.controlHeightSM;
      paddingContentVertical = token.paddingContentVerticalSM;
      paddingContentHorizontal = token.paddingContentHorizontalSM;
      borderRadius = token.borderRadiusSM;
      borderCardRadius = token.borderRadius;
      break;
    case 'large':
      contentHeight = token.controlHeightLG;
      paddingContentVertical = token.paddingContentVerticalLG;
      paddingContentHorizontal = token.paddingContentHorizontalLG;
      borderRadius = token.borderRadiusLG;
      borderCardRadius = token?.borderRadiusXXL;
      break;
    case 'compact':
      contentHeight = token.controlHeightXS;
      paddingContentVertical = token.paddingXXS;
      paddingContentHorizontal = token.paddingXS;
      borderRadius = token.borderRadiusXS;
      borderCardRadius = token.borderRadius;
      break;
    default:
      break;
  }
  return {
    contentHeight,
    paddingContentVertical,
    paddingContentHorizontal,
    borderRadius,
    borderCardRadius
  };
};
