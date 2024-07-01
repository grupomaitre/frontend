import { Link } from "react-router-dom";
import { useEffect, useState, FC } from "react";
interface ButtonNewRisterProps {
    text?: string,
    link?: string,
    isfloatend?: boolean
}


const ButtonNewRister: FC<ButtonNewRisterProps> = ({ text, link, isfloatend }) => {
    const [classFloat, setClassFloat] = useState('')
    useEffect(() => { isfloatend ? setClassFloat('float-end') : setClassFloat('') }, [])
    return (

        <Link to={link || '/dashboard'} className={"btn  btn-label btn-info  rounded btn-border" + `${classFloat}`}>

            <i className="mdi mdi-plus label-icon align-middle fs-2 me-2"></i>
            {text || 'Nuevo'}
        </Link>

    )
}

export default ButtonNewRister