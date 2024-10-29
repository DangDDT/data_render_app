import { LoadingState } from "@enums";
import { StateData } from "@models";

type StateDataRenderProps<T> = {
  stateData: StateData<T>;
  idleRender?: (stateData: StateData<T>) => React.ReactNode;
  loadingRender?: (stateData: StateData<T>) => React.ReactNode;
  errorRender?: (stateData: StateData<T>) => React.ReactNode;
  successRender?: (stateData: StateData<T>) => React.ReactNode;
  emptyRender?: (stateData: StateData<T>) => React.ReactNode;
};

const StateDataRender = <T,>({
  stateData,
  idleRender,
  loadingRender,
  errorRender,
  successRender,
  emptyRender,
}: StateDataRenderProps<T>) => {
  switch (stateData.state) {
    case LoadingState.IDLE:
      if (idleRender) {
        return idleRender(stateData);
      } else {
        console.warn("idleRender() is not defined");
        return;
      }
    case LoadingState.LOADING:
      if (loadingRender) {
        return loadingRender(stateData);
      } else {
        console.warn("loadingRender() is not defined");
        return;
      }
    case LoadingState.ERROR:
      if (errorRender) {
        return errorRender(stateData);
      } else {
        console.warn("errorRender() is not defined");
        return;
      }
    case LoadingState.SUCCESS:
      if (!stateData) {
        if (emptyRender) {
          return emptyRender(stateData);
        } else {
          return;
        }
      }
      if (successRender) {
        return successRender(stateData);
      } else {
        console.warn("successRender() is not defined");
        return;
      }
    case LoadingState.EMPTY:
      if (emptyRender) {
        return emptyRender(stateData);
      } else {
        console.warn("emptyRender() is not defined");
        return;
      }
    default:
      console.warn("Invalid state");
      return null;
  }
};

export default StateDataRender;
