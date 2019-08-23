import * as api from './service';
import { findIndex } from 'lodash';

export default {

  namespace: 'medical',

  state: {

  },

  subscriptions: {
    setupHistory({ dispatch, history }) {// eslint-disable-line
      history.listen(({ pathname, query, state }) => { // eslint-disable-line
        if (/^\/sys\/snbThree\//.test(pathname)) {

        }
      });
    },
  },

  effects: {
    *getContent({ payload }, { call, put, select }) {
      const { data = {} } = yield call(api.fetch, { ...payload });
      yield put({
        type: 'save',
        payload: {
          canvasContent: data
        },
      });
    },
    *getDefects({ payload }, { call, put, select }) {
      const { data = {} } = yield call(api.getDefects, { ...payload });
      yield put({
        type: 'save',
        payload: {
          defectsSource: data.list
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};


