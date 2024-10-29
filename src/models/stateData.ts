import { LoadingState } from "@enums";

type StateData<T> = {
  data?: T | null;
  state: LoadingState;
  error?: string | null;
};

export const initialStateData = <T>(data?: T | null): StateData<T> => {
  return {
    data: data ?? null,
    state: LoadingState.IDLE,
    error: null,
  };
};

export const setIdle = <T>(prev?: StateData<T>): StateData<T> => {
  return {
    data: prev?.data ?? null,
    state: LoadingState.IDLE,
    error: null,
  };
};

export const setLoading = <T>(prev?: StateData<T>): StateData<T> => {
  return {
    data: prev?.data ?? null,
    state: LoadingState.LOADING,
    error: null,
  };
};

export const setSuccess = <T>(data: T | null | undefined): StateData<T> => {
  return {
    data,
    state: LoadingState.SUCCESS,
    error: null,
  };
};

export const setEmpty = <T>(prev?: StateData<T>): StateData<T> => {
  return {
    data: prev?.data ?? null,
    state: LoadingState.EMPTY,
    error: null,
  };
};

export const setError = <T>(
  prev?: StateData<T>,
  error?: string | null,
): StateData<T> => {
  return {
    data: prev?.data ?? null,
    state: LoadingState.ERROR,
    error: error ?? null,
  };
};

export const isIdle = <T>(stateData: StateData<T>): boolean => {
  return stateData.state === LoadingState.IDLE;
};

export const isLoading = <T>(stateData: StateData<T>): boolean => {
  return stateData.state === LoadingState.LOADING;
};

export const isSuccess = <T>(stateData: StateData<T>): boolean => {
  return stateData.state === LoadingState.SUCCESS;
};

export const isEmpty = <T>(stateData: StateData<T>): boolean => {
  return stateData.state === LoadingState.EMPTY;
};

export const isError = <T>(stateData: StateData<T>): boolean => {
  return stateData.state === LoadingState.ERROR;
};

export default StateData;
