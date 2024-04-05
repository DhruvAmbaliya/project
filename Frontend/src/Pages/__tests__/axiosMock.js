// axiosMock.js

// Import axios and the Axios mock adapter
import * as axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of the Axios mock adapter
const mock = new MockAdapter(axios, { delayResponse: 1000 }); // optional delayResponse to simulate network delay

// Mock POST request to '/addstudents/login'
mock.onPost('/addstudents/login').reply((config) => {
  // Parse request data
  const requestData = JSON.parse(config.data);
  const { email, password } = requestData;

  // Check credentials and return mock response
  if (email === 'test@example.com' && password === 'password') {
    return [200, {
      msg: 'ok',
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        type: 'student',
        _id: 'user_id',
        timing: { /* timing data */ },
        profilePhoto: null,
        skills: [],
      },
    }];
  } else {
    return [401, { msg: 'Invalid credentials' }];
  }
});
