import React, { memo } from "react";
import { useCallback, useMemo, useState } from "react";
import { BottomSheet as ReactSpringBottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
type BottomSheetProps = Partial<
  React.ComponentProps<typeof ReactSpringBottomSheet>
>;

const useBottomSheet = () => {
  const [isVisible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const BottomSheet = useMemo(() => {
    return memo(({ children, ...props }: BottomSheetProps) => (
      <div className="bg-neutral-500">
        <ReactSpringBottomSheet
          open={isVisible}
          onDismiss={hide}
          snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
          blocking={true}
          {...props}
        >
          {children}
        </ReactSpringBottomSheet>
      </div>
    ));
  }, [isVisible, hide]);

  const api = useMemo(
    () => ({
      isVisible,
      show,
      hide,
    }),
    [isVisible, show, hide],
  );

  return { ...api, BottomSheet };
};

export default useBottomSheet;
