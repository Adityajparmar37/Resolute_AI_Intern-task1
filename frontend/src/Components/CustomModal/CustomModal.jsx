import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";

const CustomModal = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          maxWidth: "30%",
          maxHeight: "20%",
          overflow: "auto",
        },
      }}>
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="flex w-full">
          <button
            onClick={onRequestClose}
            className="absolute right-1">
            <IoCloseSharp className="text-2xl" />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
