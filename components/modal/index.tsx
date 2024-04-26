import { Modal as AntdModal, ModalProps as AntdModalProps, ConfigProvider } from 'antd';
import { memo } from 'react';
import { createStyles } from 'antd-style';
import { useContentSize } from './hook';
import React from 'react';

interface StylesType {
  modal: string;
  body: string;
}
interface StyleHooksType {
  size?: 'default' | 'large' | 'small';
}
const useStyles = createStyles<StyleHooksType, StylesType>(
  ({ css, token, }) => {
    const { contentHeight, paddingContentHorizontal, paddingContentVertical } = useContentSize('large');

    return {
      modal: css`
        &.ant-modal {
          .ant-modal-content {
            padding: 0px;
            padding-top: 1px;
            padding-bottom: 1px;
            background: var(--bgContainerGradient);
          }
          .ant-modal-header {
            padding: ${paddingContentVertical}px ${paddingContentHorizontal}px
              0px ${paddingContentHorizontal}px;
            height: ${contentHeight}px;
            margin: 0px;
            box-sizing: content-box;
            background: transparent;
            .ant-modal-title {
              line-height: ${contentHeight}px;
            }
          }
          .ant-modal-body {
            margin: ${paddingContentVertical}px ${paddingContentHorizontal}px;
            padding: ${paddingContentVertical}px ${paddingContentHorizontal}px;
            background-color: ${token.colorBgContainer};
            min-height: ${contentHeight}px;
            border-radius: ${token.borderRadius}px;
            box-shadow: ${token.boxShadowTertiary};
          }
          .ant-modal-footer {
            padding: 0px ${paddingContentHorizontal}px
              ${paddingContentVertical}px ${paddingContentHorizontal}px;
            height: ${contentHeight}px;
            box-sizing: content-box;
            margin: 0;
          }
          .ant-modal-close {
            top: ${paddingContentVertical}px;
            height: ${contentHeight}px;
            width: ${contentHeight}px;
          }
        }
      `,
      body: css``,
    };
  },
);
export interface ModalProps extends AntdModalProps {
  size?: SizeType;
}
const ModalCompoent = memo((props: ModalProps) => {
  const { componentSize } = ConfigProvider.useConfig();
  const {
    className,
    size = componentSize,
    children,
    styles,
    title,
    ...restProps
  } = props;
  const { styles: csjStyles, cx } = useStyles({ size });
  return (
    <ConfigProvider componentSize={size}>
      <AntdModal
        title={title}
        closeIcon
        {...restProps}
        className={cx(csjStyles.modal, className)}
      >
        {children}
      </AntdModal>
    </ConfigProvider>
  );
});

const Modal = ModalCompoent as React.MemoExoticComponent<
  (props: ModalProps) => JSX.Element
> & {
  useModal: typeof AntdModal.useModal;
  destroyAll: () => void;
  config: typeof AntdModal.config;
  /** @private Internal Component. Do not use in your production. */
  _InternalPanelDoNotUseOrYouWillBeFired: typeof AntdModal._InternalPanelDoNotUseOrYouWillBeFired;
};

Modal.useModal = AntdModal.useModal;

Modal.destroyAll = AntdModal.destroyAll;

Modal.config = AntdModal.config;

Modal._InternalPanelDoNotUseOrYouWillBeFired =
  AntdModal._InternalPanelDoNotUseOrYouWillBeFired;

export default Modal;
