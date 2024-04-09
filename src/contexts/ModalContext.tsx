import React, {ReactNode} from 'react';

interface ModalContextProps {
  openModal: (content: ReactNode, header?: string | ReactNode, fullScreen?: boolean, bgFull?: string) => Promise<void>;
  closeModal?: () => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
  openModal: async () => {},
  closeModal: () => {},
});
