import { Button } from "reactstrap"
import { useEffect, useState } from "react";

const ButtonExportExcel = ({ isfloatend }) => {
    const [classFloat, setClassFloat] = useState('')
    useEffect(() => { isfloatend ? setClassFloat('float-end') : null }, [])
    return (
        <Button className={"btn-label btn-soft-success  rounded btn-border " + classFloat}>
            <i className="mdi mdi-tray-arrow-down  label-icon align-middle fs-3 me-2"></i>

            {'Exportar Excel'}
        </Button>
    )
}

export default ButtonExportExcel