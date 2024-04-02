import React from "react";
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';
import { createStyles } from 'antd-style';
import classNames from "classnames";
const useStyle = createStyles(() => {
  const searchIconColor = '#ced4d9';

  return {
    header: ''
  };
});
const Header: React.FC = () => {
  const { styles } = useStyle();
  const headerClassName = classNames(styles.header, 'clearfix', {
    'home-header': true,
  });
  return <div style={{ display: 'flex' }}>
    header
    <DumiSearchBar />
  </div>
}

export default Header;