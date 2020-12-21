import axios from 'axios';
import * as Cookies from 'js-cookie';

export const useTodoAPI = () => {
  const apiUri = process.env.REACT_APP_API_URI;
  const accessToken = `Bearer ${Cookies.get('access_token')}`;
  const reqConfig = {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  };

  const getAll = async () => {
    const response = await axios.get(
      `${apiUri}/api/todos`,
      reqConfig,
    );
    return response;
  };

  const create = async (title) => {
    const { _id } = Cookies.getJSON('user');
    const response = await axios.post(
      `${apiUri}/api/todos`,
      {
        title,
        createdBy: _id,
      },
      reqConfig,
    );
    return response;
  };

  const update = async (id, updateDto) => {
    const response = await axios.put(
      `${apiUri}/api/todos/${id}`,
      updateDto,
      reqConfig,
    );
    return response;
  };

  const remove = async (id) => {
    const response = await axios.delete(
      `${apiUri}/api/todos/${id}`,
      reqConfig,
    );
    return response;
  };

  return {
    getAll,
    create,
    update,
    remove,
  };
};

export const example = 1;
