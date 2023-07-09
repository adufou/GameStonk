import * as React from 'react';
import { createPortal } from 'react-dom';
import uuid from 'uuid';
import ReactChildren from '../../../types/ReactChildren';

// export class Modal extends React.Component<ModalProps> {
//     private container: HTMLDivElement;
//     private modalRoot: HTMLElement;

//     public constructor(props: ModalProps) {
//         super(props);

//         this.modalRoot = document.getElementById('root-modal') || document.createElement('div');
//         this.modalRoot.className = 'root-modal';
//         this.container = document.createElement('div');
//     }

//     public componentDidMount(): void {
//         this.modalRoot.appendChild(this.container);
//     }


//     public componentWillUnmount(): void {
//         this.modalRoot.removeChild(this.container);
//     }

//     public render(): React.ReactElement<ModalProps> {
//         return ReactDOM.createPortal(this.props.children, this.container);
//     }
// }

interface ModalProps {
    children: ReactChildren;
}

const Modal = ({ children }: ModalProps): React.ReactElement => {
    // Maybe should be inn a useEffect ? Not sure, but if there is a bug ?

    let modalId = uuid.v4();
    let modalRoot = document.getElementById(`modal-root-${modalId}`);
    while (modalRoot) {
        modalId = uuid.v4();
        modalRoot = document.getElementById(`modal-root-${modalId}`);
    }

    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', `modal-root-${modalId}`);

    return (
        < >
            {createPortal(
                <div>
                    {children}
                </div>,
                modalRoot,
            )}
        </>
    );
};

export default Modal;
