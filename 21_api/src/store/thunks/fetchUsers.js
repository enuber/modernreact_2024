import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');

  //dev only
  await pause(1000);

  return response.data;
});

//dev only - used to create a small pause to test out code loading users.
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
