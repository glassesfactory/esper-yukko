import * as React from 'react';
import { Action } from 'redux';
import { is } from 'immutable';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Map } from 'immutable';

import { submitForm, createForm, submitComplete } from '../../actions/form';

export namespace Form {
  export interface IProps {
    record?: any;
    model?: any;
    formName: string;
    multiRecord?: boolean;
    form?: Map<string, any>;
    onSubmit: (record: any) => void;
    submitForm?: (form: string) => void;
    submitComplete?: (from: string) => void;
    createForm?: (
      formName: string,
      multiple: boolean,
      model: any,
      record: any
    ) => Action;
  }
  export interface IState {}

  export interface IChildContext {
    formName: string;
    record?: any;
    model?: any;
    multiRecord?: boolean;
  }
}

@(connect as any)(
  state => ({
    form: state.forms
  }),
  { submitForm, createForm, submitComplete }
)
class Form extends React.Component<Form.IProps, Form.IState> {
  public static childContextTypes: React.ValidationMap<Form.IChildContext> = {
    formName: PropTypes.string,
    record: PropTypes.any,
    model: PropTypes.any,
    multiRecord: PropTypes.bool
  };

  /**
   *
   */
  public getChildContext(): any {
    return {
      formName: this.props.formName,
      record: this.props.record,
      model: this.props.model,
      multiRecord: this.props.multiRecord
    };
  }

  /**
   *
   */
  public componentWillMount() {
    const { formName, multiRecord, model, record } = this.props;
    this.props.createForm(formName, multiRecord, model, record);
  }

  public componentWillUnmount() {
    const { formName } = this.props;
    this.props.submitComplete(formName);
  }

  /**
   *
   */
  private handleSubmit = event => {
    event.preventDefault();

    let record;
    if (this.props.multiRecord) {
      const form = this.props.form.get(this.props.formName);
      record = [];
      // うーん
      form.map(item => {
        record.push(item);
        return item;
      });
    } else if (this.props.record) {
      record = this.props.form.get(this.props.formName)
        ? this.props.record.merge(
            this.props.form.get(this.props.formName).toJS()
          )
        : this.props.record;
    }
    this.props.onSubmit(record);
  };

  public render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}

export default Form;
