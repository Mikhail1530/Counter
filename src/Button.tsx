
type ButtonType = {
    onClick: () => void
    name: string
    disabled?: boolean
}


export const Button = (props: ButtonType) => {
    return (
        <button className={'button'} onClick={props.onClick} disabled={props.disabled}>{props.name} </button>
    )
}