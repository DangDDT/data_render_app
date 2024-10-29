enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  EMPTY = "empty",
}
export const isIdle = (loadingState: LoadingState) =>
  loadingState === LoadingState.IDLE;
export const isLoading = (loadingState: LoadingState) =>
  loadingState === LoadingState.LOADING;
export const isSuccess = (loadingState: LoadingState) =>
  loadingState === LoadingState.SUCCESS;
export const isError = (loadingState: LoadingState) =>
  loadingState === LoadingState.ERROR;
export const isEmpty = (loadingState: LoadingState) =>
  loadingState === LoadingState.EMPTY;

export default LoadingState;
