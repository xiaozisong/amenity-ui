import React, { useState, useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Input, InputNumber as AntInputNumber } from 'antd';
import { isNumber, omit } from 'lodash';
import { NumericFormat } from 'react-number-format';
import { getNumberConfig } from './utils';
// import GridCellEditWrapper from '@/components/form/gridcelleditwrapper';
import { createStyles } from 'antd-style';
import StepHandler from './stepHandler';
import classname from 'classnames';
import type { InputAttributes, NumericFormatProps, NumberFormatValues, SourceInfo } from 'react-number-format/types';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

type Omits = 'value' | 'onChange' | 'isAllowed' | 'defaultValue' | 'prefix' | 'size' | 'suffix' | 'type' | 'onChange' | 'allowClear';

type Value = number | undefined;

export interface InputNumberProps
  extends Omit<NumericFormatProps<InputAttributes>, Omits> {
  onChange?: (value: Value) => void;
  max?: number;
  min?: number;
  precision?: number; //小数精度位数（正整数）
  defaultValue?: number;
  value?: number;
  step?: number; // 步进器数值（正数）
  size?: SizeType;
  isAllowed?: (value: Value) => boolean;
}
const useStyles = createStyles(({  css }) => {
  return {
    hack: css`
      width: 100%;
      .-input-number-handler-wrap {
        z-index: 2;
      }
      .-input {
        border: none;
      }
    `,
  };
});

const InputNumber = forwardRef((props: InputNumberProps, ref: any) => {
  const {
    max,
    min,
    step = 1,
    precision: propsPercision = 0,
    isAllowed: customIsAllowed,
    defaultValue,
    value: propsValue,
    size,
    onChange,
    ...restProps
  } = props;
  const inputRef = useRef<any>({});
  const [value, setValue] = useState<number | undefined>(defaultValue || propsValue);
  const { hashId }: any = useThemeToken();
  const { styles } = useStyles();
  const precision = useMemo(() => {
    const step_percision = ('' + step).split('.')[1]?.length || 0;
    return Math.max(step_percision, propsPercision);
  }, [step, propsPercision]);

  const numValue = useMemo(() => {
    if (typeof value === 'string') return Number(value);
    return value;
  }, [value]);

  useImperativeHandle(ref, () => inputRef.current);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const onValueChange = (values: NumberFormatValues, sourceInfo?: SourceInfo) => {
    if ('value' in props) {
      onChange?.(values?.floatValue);
    } else {
      setValue(values?.floatValue);
    }
  };

  const isAllowed = (values: NumberFormatValues) => {
    const { floatValue } = values;
    if (floatValue === undefined) return true;
    const judge = (target?: number, isMax?: boolean) => {
      return typeof target !== 'number' || (isMax ? floatValue <= target : floatValue >= target);
    };
    if (!judge(min) && isNumber(min) && min > floatValue) {
      onValueChange({ floatValue: min, formattedValue: '', value: '' });
    }
    if (!judge(max, true) && isNumber(max) && max < floatValue) {
      onValueChange({ floatValue: max, formattedValue: '', value: '' });
    }
    const custom = customIsAllowed ? customIsAllowed(floatValue) : true;
    return judge(min) && judge(max, true) && custom;
  };

  const onInternalStep = (up: boolean) => {
    if ((up && upDisabled) || (!up && downDisabled)) return;
    let floatValue: number | undefined;
    const stepAmount = up ? step : -step;
    if (numValue === undefined) {
      floatValue = min || 0;
    } else {
      floatValue = parseFloat(((numValue || 0) + stepAmount).toFixed(precision || 0));
    }
    inputRef.current?.blur();
    onValueChange({ floatValue, formattedValue: '', value: '' });
  };

  const { upDisabled, downDisabled } = useMemo(() => {
    return {
      upDisabled: numValue !== undefined && isNumber(max) ? numValue + Number(step) > max : false,
      downDisabled: numValue !== undefined && isNumber(min) ? numValue - step < Number(min) : false,
    };
  }, [max, min, step, numValue]);

  const prefixCls = 'ant-input-number';
  const defaultConfig = getNumberConfig();

  return (
    <div
      className={classname(
        hashId,
        prefixCls,
        props.disabled && 'ant-input-number-disabled',
        styles.hack
      )}
    >
      <StepHandler prefixCls={prefixCls} upDisabled={upDisabled} downDisabled={downDisabled} onStep={onInternalStep} />
      <AntInputNumber style={{ display: 'none' }} />
      <div className={`${prefixCls}-input-wrap`}>
        <NumericFormat
          // @ts-ignore 
          size={size} 
          autoComplete={'off'}
          isAllowed={isAllowed}
          fixedDecimalScale={!!precision}
          {...defaultConfig}
          {...omit(restProps, ['allowClear'])}
          value={value === undefined ? '' : value} // react-number-format/issues/500
          decimalScale={props.decimalScale ?? precision}
          getInputRef={inputRef}
          customInput={Input}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
});

export default InputNumber;
