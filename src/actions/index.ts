import { Action } from 'redux';
/**
 * 汎用 action
 * @param type
 * @param payload
 */
export const action = (type: string, payload:any = {}): Action => {
  return {type, ...payload}
}
