"use client";
import { ReactNode, useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  toggleModal: () => void;
  noClose?: boolean;
};

export const Modal = ({ children, toggleModal, noClose }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current || !event.target) return;

      if (!ref.current.contains(event.target as HTMLElement)) {
        toggleModal();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/85 z-[1000]">
      <div
        ref={noClose ? null : ref}
        className="animate-in zoom-in-70 duration-500 w-fit md:min-w-[550px] my-2 md:max-w-fit max-w-[95vw] min-h-[450px] bg-gray-100 rounded-lg p-4 relative overflow-y-auto zoom-out-125"
      >
        {!noClose && (
          <button
            onClick={toggleModal}
            className="absolute top-4 right-4 text-brand-200 hover:text-red-500 transition-transform hover:scale-105 cursor-pointer"
          >
            <IconX size={20} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};