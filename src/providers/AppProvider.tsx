import { ReactNode, useEffect, useMemo } from "react";
import MultiProvider from "./MultiProvider";

const AppProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {}, []);

  children = useMemo(() => {
    return children;
  }, [children]);

  return (
    <MultiProvider
      providers={
        [
          // <SampleContext.Provider value={}/>
        ]
      }
    >
      {children}
    </MultiProvider>
  );
};

export default AppProvider;
