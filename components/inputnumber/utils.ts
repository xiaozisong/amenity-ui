import { NumericFormatProps } from 'react-number-format/types';

export const numberFormatConfigMap = {
  '1234567.89': {},
  '1,234,567.89': {
    thousandSeparator: ',',
    decimalSeparator: '.',
  },
  '1 234 567.89': {
    thousandSeparator: ' ',
    decimalSeparator: '.',
  },
  '1.234.567,89 ': {
    thousandSeparator: '.',
    decimalSeparator: ',',
  },
  '1 234 567,89': {
    thousandSeparator: ' ',
    decimalSeparator: ',',
  },
  '123,4567.89': {
    thousandSeparator: ',',
    decimalSeparator: '.',
    thousandsGroupStyle: 'wan',
  },
  '123 4567.89': {
    thousandSeparator: ' ',
    decimalSeparator: '.',
    thousandsGroupStyle: 'wan',
  },
  '123.4567,89': {
    thousandSeparator: '.',
    decimalSeparator: ',',
    thousandsGroupStyle: 'wan',
  },
  '123 4567,89': {
    thousandSeparator: ' ',
    decimalSeparator: ',',
    thousandsGroupStyle: 'wan',
  },
};

export const DEFAULT_FORMAT = Object.keys(numberFormatConfigMap)[0];

export const getNumberConfig = () => {
  const userFormat = '1234567.89';
  const numberType = userFormat || DEFAULT_FORMAT;
  return numberFormatConfigMap[numberType] as NumericFormatProps;
}