
interface Props{
    buttons: any[],
    slide: (text: String) => void
}

export const Button = ({buttons, slide}: Props) => {
    return(
        <ul id="buttons">
            {buttons.map(btn =>(
                <li onClick={() => slide(btn)} key={btn}>{btn}</li>
            ))}
        </ul>
    )
}