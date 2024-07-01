
import { Button, Col } from 'reactstrap'
import UseCheckboxList from '../../Hooks/UseCheckboxList'
const Facturados = () => {
    const listCheck = [

        {
            value: "canceladas",
            label: 'Canceladas'
        },
        {
            value: "credito",
            label: 'Credito'
        },
        {
            value: 'ambos',
            label: 'Ambos'
        },
        {
            value: 'cuentas_mudadas',
            label: 'Cuentas Mudadas'
        }

    ]
    return (
        <Col lg='4' className='border p-2 shadow-sm rounded px-3 bg-white'>
            <UseCheckboxList
                classDiv='fs-12'
                listCheck={listCheck}
            />
            <Button color='secondary' block outline>
                ventas
            </Button>
        </Col>
    )
}

export default Facturados