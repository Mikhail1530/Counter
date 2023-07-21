import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "./Button"
import { toBeValid } from "@testing-library/jest-dom/matchers"


export const Calc = () => {

    const [value, setValue] = useState<number>(0)
    const [v, setV] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    let classScreen = (value >= maxValue || maxValue <= value || value < 0 || maxValue < 0) ? ' red' : ''
    useEffect(() => { SetStart() }, [])

    const OnChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        let n = Number(e.currentTarget.value)
        if (n < 0 || maxValue < 0 || n >= maxValue) { setError(true) }
        else setError(false);
        localStorage.setItem('startValue', e.currentTarget.value);
        setV(n)
        setValue(n)
        setDisable(false)
    }

    const OnChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        let n = Number(e.currentTarget.value)
        if (n < 0 || value < 0 || n <= value) { setError(true) }
        else setError(false)
        localStorage.setItem('maxValue', e.currentTarget.value)
        setMaxValue(n)
        setDisable(false)
    }

    const SetStart = () => {
        let s = localStorage.getItem('startValue')
        let m = localStorage.getItem('maxValue')
        if (s) { setValue(JSON.parse(s)); setV(JSON.parse(s)) }
        if (m) { setMaxValue(JSON.parse(m)) }
        setDisable(true)
    }

    const getStartValue = () => {
        let valueAsString = localStorage.getItem('startValue')
        if (valueAsString) {
            let startValue = JSON.parse(valueAsString)
            setValue(startValue)
        }
    }

    const screen =
        error ?
            'crazy shit' :
            !disable ?
                'set value' :
                value


    return (
        <>
            < div className="calc" >
                <div className='screen2'>
                    <div>
                        max value
                        <input value={maxValue} onChange={OnChangeMax} className='input' type='number' />
                    </div>
                    <div>
                        start value
                        <input value={v} onChange={OnChangeStart} className='input' type='number' />
                    </div>
                </div>
                <div className="buttons">
                    <Button name='set' onClick={SetStart} disabled={disable} />
                </div>
            </div >

            < div className="calc" >
                <div className={'screen' + classScreen}>
                    {screen}
                </div>
                <div className="buttons">
                    <Button name='inc' onClick={() => { setValue(value + 1) }} disabled={value === maxValue || !disable} />
                    <Button name='reset' onClick={getStartValue} disabled={!disable} />
                </div>
            </div >
        </>

    )
}