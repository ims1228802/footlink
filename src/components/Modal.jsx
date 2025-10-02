import React from "react";
import ReactDOM from "react-dom/client";
import "../css/Modal.css";

export default function Modal({isOpen, onClose, children}){
    if (!isOpen){
        return null;    // isOpen이 false면 아무것도 렌더링되지 않음
    }

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()      /*모달창 클릭시 닫히지 않도록 이벤트 버블링 방지*/}>
                {children}
            </div>
        </div>
    );
}