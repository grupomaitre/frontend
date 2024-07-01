import { FC, useEffect, useState } from 'react'
import { Save } from 'react-feather'
import { Button, Col, Row } from 'reactstrap'
//import { useDispatch } from "react-redux"
/* import {

    addNewProducts as onAddNewProducts

} from "../../../slices/thunks" */
interface IButtonSaveProductSer {
    items: any
}
const ButtonSaveProductSer: FC<IButtonSaveProductSer> = ({ items }) => {
    // const dispatch = useDispatch<any>()

    const [datos, setDatos] = useState<any>([])
    useEffect(() => { setDatos({ ...datos, items }) }, [items])
    const save = () => {
        //  dispatch(onAddNewProducts(datos, null))
    }


    return (
        <Row>
            <Col lg={12} >
                <Button className='float-end px-5 py-2' onClick={() => save()}>
                    <Save className='mx-2' />
                    <span>Guardar</span>
                </Button>
            </Col>
        </Row >
    )
}
export default ButtonSaveProductSer