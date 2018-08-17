import logger from '@/utils/logger';
import defaultState from './defaultState';
import foodsData from '@/store/json/foods.json';

const fetchFoods = ({ commit, state }) => {
  if (state) {
    Object.assign(state, {}, defaultState);
  }
  logger.debug('fecth foods=', foodsData);
  commit('setFoods', foodsData);
};

export {
  fetchFoods
};
