import * as React from 'react';
import { Action } from 'redux';
import { is } from 'immutable';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LocalFormStore } from '../services/form';

import { changeValue } from '../actions/form';

export namespace Control {
  export interface IProps {
    model?: string;
    component?: any;
    inputType?: string;
    changeValue?: (
      orm: string,
      key: string,
      value: any,
      field?: string
    ) => Action;
    selector?: (value: any) => any;
    updater?: (value: any) => any;
    select?: boolean;
    form?: any;
  }
  export interface IState {}
}

@(connect as any)(state => ({ form: state.forms }), { changeValue })
class Control extends React.Component<Control.IProps, Control.IState> {
  public localStore: LocalFormStore;

  public static contextTypes = {
    formName: PropTypes.string,
    fieldName: PropTypes.string,
    multiRecord: PropTypes.bool,
    record: PropTypes.any
  };

  constructor(props) {
    super(props);
    const { model } = this.props;
    this.localStore = new LocalFormStore(model);
  }

  private handleChange = event => {
    let { value } = event.target;
    if (value == null) {
      return;
    }
    if (this.props.updater) {
      value = this.props.updater(value);
    }
    this.localStore.set(value);
    if (this.context.multiRecord) {
      this.props.changeValue(
        this.context.formName,
        this.props.model,
        value,
        this.context.fieldName
      );
    } else {
      this.props.changeValue(this.context.formName, this.props.model, value);
    }
  };

  // ここか?

  /**
   * インプットタイプごとにイベントハンドラ設定する
   * @param inputType
   * @param componentProps
   */
  private setupUserAction(inputType: string, componentProps: any) {
    if (!inputType || inputType === 'input') {
      componentProps['onKeyDown'] = this.handleChange;
      componentProps['onKeyUp'] = this.handleChange;
      return componentProps;
    }
    switch (inputType) {
      case 'select':
        componentProps['onChange'] = this.handleChange;
        break;
      default:
        break;
    }
    return componentProps;
  }

  /**
   * aaaa
   */
  // public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
  //   if (!is(this.props.form, nextProps.form)) {
  //     return true;
  //   }
  //   return false;
  // }

  public render() {
    const {
      component,
      inputType,
      model,
      selector,
      updater,
      ...componentProps
    } = this.props;
    const props = this.setupUserAction(inputType, componentProps);

    // if (!this.props.form) {
    //   return null;
    // }
    delete props['changeValue'];

    // TODO: multiple val 対策
    if (this.context.record && this.context.record.get(model)) {
      let val = this.context.record.get(model);
      if (val.toJS) {
        val = val.toJS();
      }
      // toJS を先にしないでリレーションされてるモデルに toSelectInput とかを定義したほうが?
      if (val instanceof Array) {
        if (selector) {
          val = selector(val);
        } else {
          val = val.length < 1 ? '' : val[0] ? val[0] : null;
        }
      }

      if (this.props.select) {
        if (this.props.form && this.props.form.get(this.context.formName)) {
          let storeVal;
          if (this.context.multiRecord) {
            storeVal = this.props.form
              .get(this.context.formName)
              .get(this.context.fieldName)
              .get(model);
          } else {
            storeVal = this.props.form.get(this.context.formName).get(model);
          }

          if (storeVal) {
            val = storeVal;
          }

          if (val && val.toJS) {
            val = val.toJS();
          }
          if (selector) {
            val = selector(val);
          }
        }

        props['SelectProps']['value'] = val || '';
      } else {
        props['defaultValue'] = String(val);
      }
    }
    const content = component ? (
      React.createElement(component, props || {})
    ) : (
      <input />
    );

    return <div>{content}</div>;
  }
}

export default Control;
