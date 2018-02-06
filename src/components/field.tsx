import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Map } from 'immutable';

import { submitForm } from '../actions/form';

export namespace Field {
  export interface IProps {
    record: any;
    fieldName: string;
    form?: Map<string, any>;
  }
  export interface IState {}

  export interface IChildContext {
    fieldName: string;
    record?: any;
  }
}

@(connect as any)(state => ({}), {})
class Field extends React.Component<Field.IProps, Field.IState> {
  public static childContextTypes: React.ValidationMap<Field.IChildContext> = {
    fieldName: PropTypes.string,
    record: PropTypes.any
  };

  public getChildContext(): any {
    return {
      fieldName: this.props.fieldName,
      record: this.props.record
    };
  }

  public render() {
    return <div>{this.props.children}</div>;
  }
}

export default Field;
