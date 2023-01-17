import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [toggle, setToggle] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')

    const switchToggle = () => setToggle(!toggle)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const changeTitle = () => {
        props.changeTaskTitle(newTitle)
        switchToggle()
    }

    return (
        <div>
        {toggle
            ? <input
                type="text"
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={changeTitle}
                autoFocus
            />
            : <span onDoubleClick={switchToggle}>{props.title}</span>
        }
        </div>
    );
};
