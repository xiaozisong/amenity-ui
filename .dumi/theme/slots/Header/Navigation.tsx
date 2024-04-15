import * as React from 'react';
import { FormattedMessage, useFullSidebarData, useLocation, Link } from 'dumi';
import { MenuOutlined } from '@ant-design/icons';
import { createStyles, css } from 'antd-style';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import * as utils from '../../utils';
import type { SharedProps } from './interface';
import useLocale from '../../../hooks/useLocale';
// import Link from '../../common/Link';

// ============================= Theme =============================
const locales = {
  cn: {
    design: '设计',
    development: '研发',
    components: '组件',
    resources: '资源',
    blog: '博客',
  },
  en: {
    design: 'Design',
    development: 'Development',
    components: 'Components',
    resources: 'Resources',
    blog: 'Blog',
  },
};

// ============================= Style =============================
const useStyle = createStyles(({ token }) => {

  return {

  };
});

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  responsive: null | 'narrow' | 'crowded';
  directionText: string;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

export default ({
  isZhCN,
  isMobile,
  responsive,
  directionText,
  onLangChange,
  onDirectionChange,
}: NavigationProps) => {
  const { pathname, search } = useLocation();
  const [locale] = useLocale(locales);

  const sidebarData = useFullSidebarData();
  const blogList = sidebarData['/docs/blog']?.[0]?.children || [];

  const { styles } = useStyle();

  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname
    .split('/')
    .filter((path) => path)
    .slice(0, -1)
    .join('/');
  let activeMenuItem = module || 'home';
  if (pathname.startsWith('/changelog')) {
    activeMenuItem = 'docs/react';
  } else if (pathname.startsWith('/docs/resources')) {
    activeMenuItem = 'docs/resources';
  }

  let additional: MenuProps['items'];

  const additionalItems: MenuProps['items'] = [
    {
      label: (
        <a
          href="https://github.com/ant-design/ant-design"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      ),
      key: 'github',
    },
    {
      label: <FormattedMessage id="app.header.lang" />,
      onClick: onLangChange,
      key: 'switch-lang',
    },
    {
      label: directionText,
      onClick: onDirectionChange,
      key: 'switch-direction',
    },
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = [
      {
        label: <MenuOutlined />,
        key: 'additional',
        children: [...additionalItems],
      },
    ];
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN, search)}>
          {locale.design}
        </Link>
      ),
      key: 'docs/spec',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
          {locale.components}
        </Link>
      ),
      key: 'components',
    },
    {
      label: (
        <a href='https://xiaozisong.github.io' target='_blank'>
          {locale.blog}
        </a>
      ),
      key: 'docs/blog',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN, search)}>
          {locale.resources}
        </Link>
      ),
      key: 'docs/resources',
    },
    ...(additional ?? []),
  ];

  return (
    <Menu
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      disabledOverflow
      items={items}
      style={{ borderRight: 0 }}
    />
  );
};
