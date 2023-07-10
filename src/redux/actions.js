export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = "SET_USER_AGE";
export const ICREASE_AGE = "ICREASE_AGE";

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
  