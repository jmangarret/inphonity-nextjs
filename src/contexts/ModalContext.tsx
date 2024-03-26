import React, {ReactNode} from 'react';

interface ModalContextProps {
  openModal: (content: ReactNode, header?: string, fullScreen?: boolean) => Promise<void>;
  closeModal?: () => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
  openModal: async () => {},
  closeModal: () => {},
});
