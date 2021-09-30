import streamapi from '../apis/streams';
import ACTIONS from './constants.js';

export const signIn = (payload) => {
  return {
      type: ACTIONS.SIGN_IN,
      payload: payload
  };
}

export const signOut = () => {
  return {
      type: ACTIONS.SIGN_OUT
  };
}

export const createStream = async (payload) => {
    const response = await streamapi.post('/streams.json', payload);
    await streamapi.patch(`/streams/${response.data["name"]}.json`, {"key":response.data["name"]});
    return response.data["name"];
  }

export const fetchStreams = () => {
  return async (dispatch) => {
      const response = await streamapi.get('/streams.json');
      dispatch({
          type: ACTIONS.FETCH_STREAMS,
          payload: response.data
      })
  }
}

export const fetchStream = (id) => {
  return async (dispatch) => {
      const response = await streamapi.get(`/streams/${id}.json`);
      dispatch({
          type: ACTIONS.FETCH_STREAM,
          payload: response.data
      })
  }
}

export const editStream = (id, payload) => {
  return async (dispatch) => {
      const response = await streamapi.patch(`/streams/${id}.json`, payload);
      dispatch({
          type: ACTIONS.EDIT_STREAM,
          payload: response.data
      })
      window.location.replace("/studio");
  }
}
export const deleteStream = (id) => {
  return async (dispatch) => {
      await streamapi.delete(`/streams/${id}.json`);
      dispatch({
          type: ACTIONS.DELETE_STREAM,
          payload: id
      })
  }
}