import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/interfaces/User";
import { login, logout, updateUser } from "../actions/user.actions";

export const initialState : User =
{
  
  expires : '',
  token : '',
  user: null,
  travels : null,
  role : null,
  error :null
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, user) => Object.assign({}, state,user)),
  on(logout, () => Object.assign({}, initialState)),
  on(updateUser, (state, {travels}) => ({...state, travels:{...state.travels, ...travels}}))

)
