import React, {useState} from "react";
import classes from './style.module.scss'

export interface InputProps {
    setValue: (val: string) => void
    value: string
    label: string
    validate?: RegExp
}

const Input = ({value, label, setValue, validate}: InputProps) => {
    const [text, setText] = useState(value || '')
    const [errorMessage, setErrorMessage] = useState('')
    const onBlurHandler = () => {
        if (text) {
            if (validate && !validate.test(text)) {
                setErrorMessage('Неверные данные')
                setValue('')
            } else {
                setErrorMessage('')
                setValue(text)
            }
        } else {
            setErrorMessage('Введите данные')
            setValue(text)
        }
    }
    return (
        <div className={classes.wrapper}>
            <p className={classes.label}>{label}</p>
            <input type="text"
                   onBlur={onBlurHandler}
                   value={text}
                   onChange={event => setText(event.target.value)}
            />
            <div className={classes.error}>{errorMessage}</div>
        </div>
    )
}

export default Input