export const authReducer = (state, action) => {
  switch(action.type){
    case "SIGNIN_USER":{
      return {
        ...state,
        user: action.payload
      }
    }
    case "SIGNOUT_USER":{
      return {
        ...state,
        user: action.payload
      }
    }
    case "VERIFY_USER":{
      return {
        ...state,
        user: action.payload
      }
    }
    case "IS_AUTH":{
      return {
        ...state,
        isAuth: action.payload
      }
    }
    default:{
      break;
    }
  }
}