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
                           <a href="#" className="button" onClick={action.action}>{action.name}</a> 
                        )}
                    </div>
                ) : (null)
            }
        </div>
    );
}

export default Modal;