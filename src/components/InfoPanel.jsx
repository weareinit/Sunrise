import React, { useGlobal } from 'reactn';
import ModalRoot from './ModalRoot'

function InfoPanel(){
    // eslint-disable-next-line
    const [currentModal, setCurrentModal] = useGlobal('currentModal');

    return (
        <div className="content">
            <ModalRoot activeModal={currentModal}/>
        </div>
    );
}

export default InfoPanel;