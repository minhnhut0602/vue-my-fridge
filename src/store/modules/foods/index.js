import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import defaultState from './defaultState';
const state = defaultState;

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
