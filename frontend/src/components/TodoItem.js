import React from 'react';

export default function TodoItem(props) {
    const statusWord = props.status === 1 ? "done" : "incomplete"
    const newStatus = props.status ===1 ?  0 : 1
    return (
        <div className="TodoItem">
            <h2>
                {props.pk}: {props.title}
            </h2>
            <p>
                {props.description}
            </p>
            <p>
                <button onClick={(event)=>{
                    props.updateItem(props.pk,{
                        status: newStatus
                    })
                }}>
                    Toggle
                </button>
                Status: {statusWord}
            </p>
            <button onClick={(event)=>{
                    props.deleteItem(props.pk)
                }}>
                    X
                </button>
        </div>
    );
}