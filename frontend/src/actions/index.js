import api from '../apis/axios';
import ACTIONS from './constants.js';

export const createimage = (payload) => {
  return async (dispatch) => {
    const response = await api.post('/image', payload);
    dispatch({
      type: ACTIONS.CREATE_IMAGE,
      payload: response.data
    })
    window.location.replace('/');
  }
}

export const fetchimages = () => {
  return async (dispatch) => {
      const response = await api.get('/image');
      dispatch({
          type: ACTIONS.FETCH_ALL_IMAGE,
          payload: response.data
      })
  }
}

export const fetchimage = (id) => {
  return async (dispatch) => {
      const response = await api.get(`/image/${id}`);
      dispatch({
          type: ACTIONS.FETCH_IMAGE,
          payload: response.data
      })
  }
}

export const updateimage = (id, payload) => {
  return async (dispatch) => {
      const response = await api.put(`/image/${id}`, payload , );
      dispatch({
          type: ACTIONS.UPDATE_IMAGE,
          payload: response.data
      })
  }
}

export const deleteimage = (id) => {
  return async (dispatch) => {
      await api.delete(`/image/${id}`);
      dispatch({
          type: ACTIONS.DELETE_IMAGE,
          payload: id
      })
      window.location.replace("/");
  }
}