import { List, Map } from "immutable";

import {
  ADD_FIELD,
  CHANGE_VALUE,
  CREATE_FORM,
  SUBMIT_COMPLETE,
  REMOVE_FIELD
} from "../constants/form";

export const forms = (state = Map<string, any>(), action) => {
  switch (action.type) {
    case CREATE_FORM:
      state = (act => {
        const { formName, multiple, model, record } = action;
        const initialSet = multiple
          ? Map<string, any>().set(formName + Date.now(), new model())
          : record;
        return state.set(formName, initialSet);
      })(action);
      return state;
    case CHANGE_VALUE:
      state = (act => {
        const { form, key, value, field } = action;
        const row: Map<string, any> = state.get(form) || Map<string, any>();
        if (field) {
          const clm = row.get(field) || Map<string, any>();
          return state.set(form, row.set(field, clm.set(key, value)));
        }
        return state.set(form, row.set(key, value));
      })(action);
      return state;
    case SUBMIT_COMPLETE:
      state = (act => {
        const { form } = act;
        return state.set(form, null);
      })(action);
      return state;
    case ADD_FIELD:
      return (act => {
        const { formName, model } = action;
        const formList: Map<string, any> = state.get(formName);
        return state.set(formName, formList.set(formName + Date.now(), model));
      })(action);
    case REMOVE_FIELD:
      return (act => {
        const { formName, model } = action;
        const formList: Map<string, any> = state.get(formName);
        return state.set(formName, formList.filter(item => item !== model));
      })(action);
    default:
      return state;
  }
};
