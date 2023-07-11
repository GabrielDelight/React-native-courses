export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const ICREASE_AGE = 'ICREASE_AGE';
export const GET_COUNTRIES = 'GET_COUNTRIES';

const api_url = 'https://mocki.io/v1/c9e17fd5-6307-4d31-8f06-9ff298c5e122';

export const getCountries = () => {
  try {
    return async dispatch => {
      const result = await fetch(api_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const josn = await result.json();
      if (josn) {
        dispatch({
          type: GET_COUNTRIES,
          payload: josn,
        });
      } else {
        console.log('Unable to connect');
      }
    };
  } catch (error) {
    console.log("Can't connect");
  }
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};

export const increaseAge = age => dispatch => {
  dispatch({
    type: ICREASE_AGE,
    payload: age,
  });
};
