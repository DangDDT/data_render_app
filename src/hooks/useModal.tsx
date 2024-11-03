import { memo, useCallback, useMemo, useRef } from "react";

const useModal = () => {
  const modelRef = useRef<HTMLDialogElement | null>(null);

  const showModal = useCallback(() => {
    const model = modelRef.current;
    if (model) {
      model.showModal();
    }
  }, []);

  const Modal = useMemo(
    () =>
      memo(
        ({
          children,
          ...props
        }: {
          children: React.ReactNode;
        } & React.ComponentProps<"dialog">) => (
          <dialog ref={modelRef} className="modal rounded-md p-4" {...props}>
            <div className="modal-box p-12">{children}</div>
            <form method="dialog" className="modal-backdrop">
              <button className="float-end rounded-md bg-gray-500 p-2 text-white">
                Đóng
              </button>
            </form>
          </dialog>
        ),
      ),
    [],
  );

  const api = useMemo(
    () => ({
      showModal,
    }),
    [showModal],
  );

  return { ...api, Modal };
};

export default useModal;
