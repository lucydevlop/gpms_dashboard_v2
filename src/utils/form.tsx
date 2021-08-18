import React, { InputHTMLAttributes } from 'react';
import { ColProps } from 'antd/lib/grid';
import { Form } from '@ant-design/compatible';
import {
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect
} from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';
import { FormItemProps } from 'antd/lib/form';
import moment, { Moment } from 'moment';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { FormType } from '@/constants/form';
import { GetFieldDecoratorOptions } from '@ant-design/compatible/lib/form/Form';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import styled from 'styled-components';
import { color } from 'echarts/core';
import { parkinglotStore } from '@/store/parkinglotStore';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const InputGroup = Input.Group;

export interface ISelectOptions {
  value: string | number | undefined;
  label: string;
  color?: string;
}

// todo 这个类型不够精确
export type IComponentOption =
  | InputHTMLAttributes<any>
  | SelectProps<any>
  | InputProps
  | RangePickerProps
  | DatePickerProps
  | TextAreaProps
  | ButtonProps
  | any;

export interface IFormFieldOption {
  type: FormType;
  option?: IComponentOption;
  selectOptions?: ISelectOptions[];
  handler?: () => void;
}

export interface IFromFieldBaseConfig {
  formItemProps?: FormItemProps;
  colProps?: ColProps;
  label?: string;
  fieldOption?: GetFieldDecoratorOptions;
  formSubItemProps?: IFormFieldConfig;
  hidden?: boolean;
  firstColProps?: ColProps;
}

export interface IFormFieldConfig<T = string> extends IFromFieldBaseConfig {
  id: T;
  component: IFormFieldOption;
}

interface IGetFieldDecorator {
  <T extends Record<string, any> = {}>(id: string, options?: GetFieldDecoratorOptions): (
    node: React.ReactNode
  ) => React.ReactNode;
}

/**
 * @method getFormComponent
 * @description 描述：根据参数获取form组件
 * @param { IFormFieldOption } component
 * @return return antd 的 form 组件
 */
const getFormComponent = (component: IFormFieldOption) => {
  const { type, selectOptions = [], option } = { ...component };
  switch (type) {
    case FormType.Input:
      return <Input size="middle" {...option} />;
    case FormType.Select:
      return (
        <Select style={{ width: '60%' }} size="middle" {...option}>
          {selectOptions.map(
            (item) =>
              item.value && (
                <Option key={item.value} value={item.value} title={item.label}>
                  {item.label}
                </Option>
              )
          )}
        </Select>
      );
    case FormType.Radio:
      return (
        <Radio.Group size="middle" {...option} className="radio-group">
          {selectOptions.map((item) => (
            <Radio
              key={item.value}
              value={item.value}
              onChange={(e) => {
                e.target.value === 'On' ? option.open() : option.close();
              }}
            >
              {item.label}
            </Radio>
          ))}
          <span style={{ fontSize: '12px' }}>{option.note}</span>
        </Radio.Group>
      );
    case FormType.RangePicker:
      return <RangePicker size="middle" {...option} />;
    case FormType.TimePicker:
      return <TimePicker.RangePicker size="middle" {...option} />;
    case FormType.DatePicker:
      return <DatePicker size="middle" {...option} />;
    case FormType.DateTimePicker:
      return (
        <>
          <DatePicker size="middle" {...option} />
          <TimePicker size="middle" defaultValue={moment('00:00', 'HH:mm')} format={'HH:mm'} />
        </>
      );
    case FormType.TextArea:
      return <TextArea size="middle" {...option} />;
    case FormType.Checkbox:
      return (
        <Checkbox size="middle" {...option}>
          {option.text || ''}
        </Checkbox>
      );
    case FormType.Slider:
      return <Slider size="middle" {...option} />;
    case FormType.Cascader:
      return <Cascader size="middle" {...option} />;
    case FormType.InputNumber:
      return <InputNumber size="middle" {...option} />;
    case FormType.TreeSelect:
      return <TreeSelect size="middle" {...option} />;
    case FormType.Switch:
      return <Switch size="middle" {...option} />;
    case FormType.Button:
      return (
        <Button size="middle" {...option}>
          {option.text || ''}
        </Button>
      );
    case FormType.SelectWithRangePicker:
      return (
        <>
          <Select size="middle" initialValue={option.value} {...option}>
            {selectOptions.map(
              (item) =>
                item.value && (
                  <Option key={item.value} value={item.value} title={item.label}>
                    {item.label}
                  </Option>
                )
            )}
          </Select>
          <RangePicker size="middle" {...option} />
        </>
      );
    default:
      return <Input size="middle" {...option} />;
  }
};

/**
 * @method getFormFields
 * @description 描述：获得表单组件
 * @param { IGetFieldDecorator } getFieldDecorator 需要绑定的 props.form 的 getFieldDecorator 函数
 * @param { IFormFieldConfig[] } config form配置
 * @param { putAway } putAway 是否收起（只展示前六个）
 * @return return formItem[]
 */
export const getFormFields = (
  getFieldDecorator: IGetFieldDecorator,
  config: IFormFieldConfig[],
  putAway?: boolean,
  putAwayNum?: Number
) => {
  const maxIndex = config.length > 7 ? 7 : 3;
  return config.map((formField, index) => {
    const {
      fieldOption,
      label = '',
      formItemProps,
      colProps,
      firstColProps
    } = {
      ...formField
    };

    const key = formField.id + index;
    const optional: ColProps = { span: 8, xs: 24, md: 24, xl: 8 };
    let requireTag = null;
    if (fieldOption !== null && fieldOption !== undefined) {
      if (fieldOption.rules !== null && fieldOption.rules !== undefined) {
        requireTag = <span style={{ color: 'red' }}>*</span>;
      }
    }
    const labelStyle = (
      <label style={{ fontWeight: 600 }}>
        {requireTag}
        {label}
      </label>
    );
    if (formField.hidden) return;
    if (formField.formSubItemProps) {
      // return (
      //   <Col {...colProps} key={key} style={{ display: 'flex' }}>
      //     <Col {...firstColProps}>
      //       <FormItem label={labelStyle} {...formItemProps} style={{ marginBottom: 10 }}>
      //         {getFieldDecorator(formField.id, fieldOption)(getFormComponent(formField.component))}
      //       </FormItem>
      //     </Col>
      //     <Col>
      //       <FormItem
      //         // label={formField.formSubItemProps.label}
      //         {...formField.formSubItemProps.formItemProps}
      //         style={{ marginBottom: 10 }}
      //       >
      //         <InputGroup compact style={{ width: '100%' }}>
      //           {getFieldDecorator(
      //             formField.formSubItemProps.id,
      //             formField.formSubItemProps.fieldOption
      //           )(getFormComponent(formField.formSubItemProps.component))}
      //         </InputGroup>
      //       </FormItem>
      //     </Col>
      //   </Col>
      // );
      return (
        <Col
          {...(colProps === null || colProps === undefined ? optional : colProps)}
          key={key}
          style={{}}
        >
          <FormItem
            label={labelStyle}
            // labelAlign={'right'}
            {...formItemProps}
            style={{ marginBottom: 10 }}
          >
            <InputGroup compact style={{ width: '100%', flex: 1, display: 'flex' }}>
              {getFieldDecorator(formField.id, fieldOption)(getFormComponent(formField.component))}
              {getFieldDecorator(
                formField.formSubItemProps.id,
                formField.formSubItemProps.fieldOption
              )(getFormComponent(formField.formSubItemProps.component))}
            </InputGroup>
          </FormItem>
        </Col>
      );
    }
    return (
      <Col
        {...(colProps === null || colProps === undefined ? optional : colProps)}
        key={key}
        style={{ display: putAway && index >= (putAwayNum || maxIndex) ? 'none' : 'block' }}
      >
        <FormItem
          label={labelStyle}
          // labelAlign={'right'}
          {...formItemProps}
          style={{ marginBottom: 10 }}
        >
          {getFieldDecorator(formField.id, fieldOption)(getFormComponent(formField.component))}
        </FormItem>
      </Col>
    );
  });
};

/**
 * @method createCommonFormLayout
 * @description 描述：创建 Form.Item 的 文本 和 容器 的栅格配置
 * @param { number } labelColSpan
 * @return return FormItemProps
 */
export const createFormItemProps = (labelColSpan: number): FormItemProps => ({
  labelCol: {
    span: labelColSpan
  },
  wrapperCol: {
    span: 24 - labelColSpan
  },
  children: null
});

/**
 * @method createCommonFormLayout
 * @description 描述：创建表单布局配置
 * @param { number } colPropsSpan
 * @param { number } labelColSpan
 * @param { string } className
 * @return return IFromFieldBaseConfig
 */
export const createCommonFormLayout = (
  colPropsSpan: number,
  labelColSpan: number,
  className = ''
): IFromFieldBaseConfig => ({
  colProps: {
    span: colPropsSpan,
    className
  },
  formItemProps: {
    labelCol: {
      span: labelColSpan
    },
    wrapperCol: {
      span: 24 - labelColSpan
    },
    children: null
  }
});

export const formColProps2Config: IFromFieldBaseConfig = createCommonFormLayout(2, 8, 'formField2');
// 宽为 六分之一
export const formColProps4Config: IFromFieldBaseConfig = createCommonFormLayout(4, 6, 'formField4');

// 宽为 四分之一
export const formColProps6Config: IFromFieldBaseConfig = createCommonFormLayout(6, 8, 'formField6');

// 宽为 三分之一
export const formColProps8Config: IFromFieldBaseConfig = createCommonFormLayout(8, 9, 'formField8');

// 宽为 二分之一
export const formColProps12Config: IFromFieldBaseConfig = createCommonFormLayout(
  12,
  6,
  'formField12'
);

export const formColProps13Config: IFromFieldBaseConfig = createCommonFormLayout(
  13,
  7,
  'formField13'
);

export const formColProps14Config: IFromFieldBaseConfig = createCommonFormLayout(
  14,
  8,
  'formField14'
);

// 宽为 三分之二
export const formlabel8ColProps8Config: IFromFieldBaseConfig = createCommonFormLayout(
  9,
  8,
  'formField88'
);

export const formlabel8ColProps18Config: IFromFieldBaseConfig = createCommonFormLayout(
  18,
  4,
  'formField818'
);

export const formColProps16Config: IFromFieldBaseConfig = createCommonFormLayout(
  16,
  9,
  'formField16'
);

// 宽度 百分百
export const formColProps24Config: IFromFieldBaseConfig = createCommonFormLayout(
  24,
  4,
  'formField24'
);

export const formColProps28Config: IFromFieldBaseConfig = createCommonFormLayout(
  30,
  4,
  'formField30'
);

// 时间选择框宽度
export const formColPropsTimeConfig: IFromFieldBaseConfig = createCommonFormLayout(
  8,
  6,
  'formFieldTime'
);

// 设置 fieldsConfig 中表单的 disabled 的状态
export const setOptionDisabled = (
  configs: IFormFieldConfig[],
  isEdit: boolean
): IFormFieldConfig[] =>
  configs.map((config) => {
    if (config.component.option) {
      if (!config.component.option.disabled) {
        config.component.option.disabled = !isEdit;
      }
    }
    return config;
  });

/**
 * 禁止 DatePicker 选择今天以后的时间
 * @param current Moment
 */
export const disabledDateAfterToday = (current: Moment) =>
  current && current > moment().endOf('day');

// 禁止选择今天以前的时间
export const disabledDateBeforToday = (current: Moment) =>
  current && current < moment().startOf('day');

export const disabledThreeMonth = (current: Moment) =>
  current && (current > moment().add(3, 'month') || current < moment().subtract(3, 'month'));
