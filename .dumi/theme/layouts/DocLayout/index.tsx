import React from "react"
import { Helmet, useOutlet } from "dumi"
import useLocale from "../../../hooks/useLocale";
import useLocation from "../../../hooks/useLocation";
import classNames from "classnames";
import Header from "../../slots/Header";
import IndexLayout from "../IndexLayout";
import ResourceLayout from "../ResourceLayout";
import GlobalStyles from '../../common/GlobalStyles';
import SidebarLayout from "../SidebarLayout";

const locales = {
  cn: {
    title: 'AMENITY-UI - 一套面向企业级的大数据密集型 UI 设计语言和 React 组件库',
    description: '基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。',
  },
  en: {
    title: "Ant Design - The world's second most popular React UI framework",
    description:
      'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises',
  },
};

const DocLayout: React.FC = () => {
  const [locale, lang] = useLocale(locales);
  const location = useLocation();
  const { pathname, search, hash } = location;
  const outlet = useOutlet();

  const content = React.useMemo<React.ReactNode>(() => {
    if (
      ['', '/'].some((path) => path === pathname) ||
      ['/index'].some((path) => pathname.startsWith(path))
    ) {
      return (
        <IndexLayout title={locale.title} desc={locale.description}>
          {outlet}
        </IndexLayout>
      );
    }
    // if (pathname.startsWith('/docs/resource')) {
    //   return <ResourceLayout>{outlet}</ResourceLayout>;
    // }
    // if (pathname.startsWith('/theme-editor')) {
    //   return outlet;
    // }
    return <SidebarLayout>{outlet}</SidebarLayout>;
  }, [pathname, outlet]);

  return <>
    <Helmet encodeSpecialCharacters={false}>
      <html
        lang={lang === 'cn' ? 'zh-CN' : lang}
        className={classNames({ rtl: 'rtl' })}
      />
      <link
        sizes="144x144"
        href="https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"
      />
      <meta property="og:description" content={locale.description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"
      />
    </Helmet>
    <GlobalStyles />
    <Header />
    {content}
  </>
}

export default DocLayout