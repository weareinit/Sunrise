import React, { useGlobal } from 'reactn';
import classNames from 'classnames';

function Modal({children, actions}){
    const [currentModal, setCurrentModal] = useGlobal('currentModal');
    return (
        <div className={classNames('modal', currentModal)}>
            
            <div className="modal-content">
                {children}
            </div>
            {
                (actions) ? (
                    <div className="actions">
                        {actions.map((action) => 
                           <button onClick={action.action}>{action.name}</button> 
                        )}
                    </div>
                ) : (null)
            }
        </div>
    );
}

export default Modal;