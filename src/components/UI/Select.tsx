import { useState } from 'react'

export interface ISelectOption<T = {}> {
    label: string
    value: string | number
    meta?: T
}

interface IPropsSelect {
    options: ISelectOption<any>[]
    state: [
        ISelectOption<any> | undefined,
        (option: ISelectOption<any>) => void
    ]
    title?: string
    unknownValue?: string
}

export const Select = ({
    options,
    state,
    title,
    unknownValue,
}: IPropsSelect) => {
    const [show, setShow] = useState(false)
    const [st, setSt] = state

    function selecting(option: ISelectOption) {
        setShow(false)
        setSt(option)
    }

    return (
        <div className="select">
            {title ? <div className="select__title">{title}</div> : null}
            <div className="select__body" onClick={() => setShow(!show)}>
                <div className="select__field">{st?.label || unknownValue}</div>
                <div
                    className={`select__options ${
                        show ? 'select__options--show' : ''
                    }`}
                >
                    {options.map((option) => (
                        <div
                            className={`select__option ${
                                option.value === st?.value
                                    ? 'select__option-active'
                                    : ''
                            }`}
                            onClick={() => selecting(option)}
                            key={option.value}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
