import React, {ChangeEvent, useState} from 'react';

type InputComponentPropsType = {
    callBack: (title: string) => void
}

export const InputComponent = (props: InputComponentPropsType) => {

    const [title, setTitle] = useState<string>('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (title !== '') {
            props.callBack(title.trim())
            setTitle('')
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeInputHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
    );
};
