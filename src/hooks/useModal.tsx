import classNames from "classnames";
import { memo, useCallback, useMemo, useRef } from "react";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const showModal = useCallback(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.showModal();
    }
  }, []);

  const hideModal = useCallback(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
    }
  }, []);

  const isOpen = useCallback(() => {
    const modal = modalRef.current;
    if (modal) {
      return modal.open;
    }
    return false;
  }, []);

  const Modal = useMemo(
    () =>
      memo(
        ({
          children,
          scaleIn = false,
          hasCloseButton = true,
          overrideClassName,
          ...props
        }: {
          scaleIn?: boolean;
          hasCloseButton?: boolean;
          overrideClassName?: string;
          children: React.ReactNode;
        } & React.ComponentProps<"dialog">) => (
          <dialog
            ref={modalRef}
            className={classNames(
              "modal",
              overrideClassName ?? "rounded-md p-4",
              scaleIn ? "animate-scaleIn" : null,
            )}
            {...props}
          >
            <div className="modal-box p-12">{children}</div>
            {hasCloseButton && (
              <form method="dialog" className="modal-backdrop">
                <button className="float-end rounded-md bg-gray-500 p-2 text-white">
                  Đóng
                </button>
              </form>
            )}
          </dialog>
        ),
      ),
    [],
  );

  const api = useMemo(
    () => ({
      showModal,
      hideModal,
      isOpen,
    }),
    [showModal, hideModal, isOpen],
  );

  return { ...api, Modal };
};

export default useModal;
