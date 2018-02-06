import { Action } from 'redux';
import {
  ADD_FIELD,
  CHANGE_VALUE,
  CREATE_FORM,
  REMOVE_FIELD,
  SUBMIT_COMPLETE,
  SUBMIT_FORM
} from '../constants/form';
import { action } from './';

export const createForm = (
  formName: string,
  multiple: boolean = false,
  model: any = null,
  record: any = null
) => action(CREATE_FORM, { formName, multiple, model, record });

/**
 * ばりゅーがかわった
 * @param value
 */
export const changeValue = (
  form: string,
  key: string,
  value: any,
  field: string = null
) => action(CHANGE_VALUE, { form, key, value, field });

/**
 * フォームの送信
 * @param form
 */
export const submitForm = (form: string) => action(SUBMIT_FORM, form);

/**
 * フォームの送信完了
 * @param form
 */
export const submitComplete = (form: string) =>
  action(SUBMIT_COMPLETE, { form });

export const addField = (formName: string, model: any) =>
  action(ADD_FIELD, { formName, model });
export const removeField = (formName: string, model: any) =>
  action(REMOVE_FIELD, { formName, model });
