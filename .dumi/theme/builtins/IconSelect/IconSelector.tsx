import * as React from 'react';
import { Empty, Select } from 'antd';
import { createStyles } from 'antd-style';
import icon from './icon';
export interface IconType {
  icon_id: string;
  name: string;
  font_class: string;
  unicode: string;
  unicode_decimal: number;
}

export interface SelectIconProps {
  scriptUrl: string;
  iconList: IconType[];
}

const useStyle = createStyles(({ css }) => {
  return {
    li: css`
      list-style-type: none;
      text-align: center;
      height: 80px;
      line-height: 30px;
      cursor: pointer;
      padding: 10px 0 0 0;
      &:hover {
       background: #1677ff;
       color: white;
      }
    `,
    iconName: css`
      display: block;
      font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
        monospace;
      white-space: nowrap;
      text-align: center;
      transform: scale(0.83);
      icon-badge {
        transition: color .3s ease-in-out;
      }
    `,
    activeBorderColor: css`
      border-color: #0958d9;
    `,
    iconContainer: css`
      display: grid;
      grid-template-columns: repeat(5, 20%);
      height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
    `,
    icon: css`
      font-size: 24px;
      &:hover {
      }
    `
  }
});

const SelectIcon: React.FC<SelectIconProps> = ({
  scriptUrl = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  iconList = [],
  ...restProps
}) => {

  const { styles } = useStyle();
  const [searchVal, setSearchVal] = React.useState('');
  const [value, setValue] = React.useState<IconType | null>();
  const selectRef = React.useRef(null);

  const options = iconList.map(item => ({ label: item.name, value: item.font_class }))
  const Icon = icon({ scriptUrl })

  const onSearch = (value: string) => {
    setSearchVal(value)
  }

  const onClick = (icon: IconType) => {
    setValue(icon)
    // @ts-ignore
    selectRef.current && selectRef.current.blur()
  }

  const dropdownRender = () => {
    const filterRenderItems = iconList.filter(item => item.name.includes(searchVal))
    return filterRenderItems.length ? <div className={styles.iconContainer}>
      {
        filterRenderItems.map(item => {
          return <li className={styles.li} onClick={() => onClick(item)} key={item.icon_id}>
            <Icon type={`icon-${item.font_class}`} className={styles.icon} {...restProps} />
            <span className={styles.iconName}>
              {item.name}
            </span>
          </li>
        }) 
      }
    </div> : <Empty />
  }

  let labelRender = () => {
    return <div>
      <Icon type={`icon-${value?.font_class}`} style={{ marginRight: 5 }} />
      {value?.name}
    </div>
  }

  const onClear = () => setValue(null)

  return (
    <>
      <Select
        style={{
          width: '40%'
        }}
        showSearch
        placeholder='请选择icon'
        ref={selectRef}
        onClear={onClear}
        allowClear
        value={value?.font_class}
        labelRender={labelRender}
        onSearch={onSearch}
        optionFilterProp='label'
        options={options}
        dropdownRender={dropdownRender}
        {...restProps}
      />
    </>
  );
};

export default SelectIcon;
