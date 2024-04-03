import { useRouteMeta } from "dumi";
import React, { useMemo } from "react";
import DocAnchor from "./DocAnchor";
import { Col } from "antd";
import classNames from "classnames";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ token, css }) => ({
  articleWrapper: css`
    padding: 0 170px 32px 64px;
    &.rtl {
      padding: 0 64px 144px 170px;
    }
    @media only screen and (max-width: ${token.screenLG}px) {
      &,
      &.rtl {
        padding: 0 48px;
      }
    }
  `,
}));

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const DocAnchor = React.lazy(() => import('./DocAnchor'));
  const meta = useRouteMeta();
  const debugDemos = useMemo(
    () => meta.toc?.filter((item) => item._debug_demo).map((item) => item.id) || [],
    [meta],
  );
  const { styles } = useStyle()
  return  <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
      <DocAnchor showDebug={false} debugDemos={debugDemos} />
      <article className={classNames(styles.articleWrapper, { rtl: false }, 'markdown')}>
        <div style={{ minHeight: 'calc(100vh - 64px)', width: '100%' }}>
          {children}
        </div>
      </article>
    </Col>
}

export default Content