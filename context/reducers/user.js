export function user(state, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };
    case "SET_LOGGED_IN_INFO":
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state;
  }
}