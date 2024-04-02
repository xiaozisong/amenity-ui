import React from "react";
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';
import { createStyles } from 'antd-style';
import classNames from "classnames";
import { Col, Row } from "antd";
import useLocation from '../../../hooks/useLocation'
import { Link } from "dumi";
import Navigation from "./Navigation";
import { SharedProps } from "./interface";
const useStyle = createStyles(({ token, css }) => {
  const searchIconColor = '#ced4d9';

  return {
    header: css`
      position: sticky;
      top: 0;
      z-index: 1000;
      max-width: 100%;
      background: ${token.colorBgContainer};
      box-shadow: ${token.boxShadowTertiary};
      backdrop-filter: blur(8px);

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        text-align: center;
      }

      .nav-search-wrapper {
        display: flex;
        flex: auto;
      }

      .dumi-default-search-bar {
        border-inline-start: 1px solid rgba(0, 0, 0, 0.06);

        > svg {
          width: 14px;
          fill: ${searchIconColor};
        }

        > input {
          height: 22px;
          border: 0;

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${searchIconColor};
          }
        }

        .dumi-default-search-shortcut {
          color: ${searchIconColor};
          background-color: rgba(150, 150, 150, 0.06);
          border-color: rgba(100, 100, 100, 0.2);
          border-radius: 4px;
        }

        .dumi-default-search-popover {
          inset-inline-start: 11px;
          inset-inline-end: unset;

          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
        }
      }
    `,
    menuRow: css`
      display: flex;
      align-items: center;
      margin: 0;

      > * {
        flex: none;
        margin: 0;
        margin-inline-end: 12px;

        &:last-child {
          margin-inline-end: 40px;
        }
      }
    `,
    dataDirectionIcon: css`
      width: 16px;
    `,
    popoverMenu: {
      width: 300,

      [`${token.antCls}-popover-inner-content`]: {
        padding: 0,
      },
    },
    banner: css`
      width: 100%;
      text-align: center;
      word-break: keep-all;
      user-select: none;
    `,
    link: css`
      margin-left: 10px;

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        margin-left: 0;
      }
    `,
    icon: css`
      margin-right: 10px;
      width: 22px;
      height: 22px;
    `,
  };
});
const Header: React.FC = () => {
  const { styles } = useStyle();
  const headerClassName = classNames(styles.header, 'clearfix', {
    'home-header': true,
  });
  const location = useLocation();
  const { pathname, search } = location;
  const isHome = ['', 'index', 'index-cn'].includes(pathname);
  const colProps = isHome
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
        { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
        { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
      ];
  const sharedProps: SharedProps = {
    isZhCN: true,
    isRTL: true,
  };
  const NavigationNode = (
    <Navigation 
      key="nav"
      {...sharedProps}
      responsive={'narrow'}
      isMobile={false}
      directionText={''}
      onLangChange={() => {}}
      onDirectionChange={() => {}}
    />
  )
  return <header className={headerClassName}>
    <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <Col {...colProps[0]}>
          <Link to={'/index-cn'} >go home</Link>
        </Col>
        <Col {...colProps[1]} className={styles.menuRow}>
          <div className="nav-search-wrapper">
            <DumiSearchBar />
          </div>
          {NavigationNode}
        </Col>
      </Row>
  </header>
}

export default Header;