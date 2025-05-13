import {
  useImperativeHandle,
  useRef,
  type PropsWithChildren,
  type Ref,
} from "react";

export type Modal = {
  open: () => void;
};

export const Modal = ({
  children,
  ref,
}: PropsWithChildren<{ ref: Ref<Modal> }>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
  }));

  return (
    <dialog
      ref={dialogRef}
      className="top-1/2 left-1/2 -translate-1/2 rounded-lg bg-stone-800"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      <div className="bg-stone-800 p-4 rounded-lg text-stone-50">
        {children}
      </div>
    </dialog>
  );
};
