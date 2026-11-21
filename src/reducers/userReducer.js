export const FETCH_USERS_REQUEST = 'user/FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'user/FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'user/FETCH_USERS_FAILURE';

export const ADD_USER_REQUEST = 'user/ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'user/ADD_USER_SUCCESS';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const addUserRequest = (userData) => ({
  type: ADD_USER_REQUEST,
  payload: userData,
});

export const addUserSuccess = (newUser) => ({
  type: ADD_USER_SUCCESS,
  payload: newUser,
});

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}