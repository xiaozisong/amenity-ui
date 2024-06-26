import type { PropsWithChildren } from 'react';
import React from 'react';
import { createStyles } from 'antd-style';

import Content from '../../slots/Content';
import Sidebar from '../../slots/Sidebar';

const useStyle = createStyles(({ css, token }) => ({
  main: css`
    display: flex;
  `,
}));

const SidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { styles } = useStyle();
  return (
    <main className={styles.main}>
      <Sidebar />
      <Content>{children}</Content>
    </main>
  );
};

export default SidebarLayout;
