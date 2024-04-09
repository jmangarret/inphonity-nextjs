import React, { useEffect, useRef, ReactNode, CSSProperties } from 'react';
import Image from "next/image";

interface ModalProps {
  header?: string | ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  fullScreen?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ header, children, className, style, fullScreen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fullScreen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [fullScreen, onClose]);

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 flex items-center justify-center z-50 text-black ${fullScreen ? 'w-screen h-screen' : 'w-auto h-auto'} ${className}`}
      style={style}
    >
      <div
        className={`modal ${fullScreen ? '' : 'bg-black bg-opacity-50 backdrop-blur-sm'} absolute inset-0`} onClick={onClose}
      ></div>
      <div
        className="modal-content relative border-20"
      >
        <div
          className={`w-full border-20 modal-header flex justify-between items-center bg-black text-white p-2 md:p-3 ${!fullScreen ? 'rounded-t-md' : ''}`}
        >
          <h2 className='w-full'>{header}</h2>
          <button onClick={onClose} className="focus:outline-none">
            <Image
              src={`/img/close-modal-icon.svg`}
              alt={`Cerrar ventana emergente`}
              width={50}
              height={24}
            />
          </button>
        </div>
        <div
          className="overflow-auto modal-content bg-black rounded-b-md grid flex flex-col items-center border-20"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
