import { isEmpty } from "@/helpers";
import { Dispatch, useReducer } from "react";

type Status = "loading" | "success" | "error";

export interface FetchReducerState<T> {
  data?: T;
  error?: Error;
  status: Status;
}

type Action<T> =
  | { type: "loading" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: Error };

const useFetchReducer = <T = any>(): [
  FetchReducerState<T>,
  Dispatch<Action<T>>,
] => {
  const initialState: FetchReducerState<T> = {
    error: undefined,
    data: undefined,
    status: "loading",
  };

  const fetchReducer = (
    state: FetchReducerState<T>,
    action: Action<T>,
  ): FetchReducerState<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: "loading" };
      case "success":
        return {
          ...initialState,
          status: isEmpty(action.payload) ? "loading" : "success",
          data: action.payload,
        };
      case "error":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  };

  return useReducer(fetchReducer, initialState);
};

export default useFetchReducer;
