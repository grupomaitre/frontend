import { useState } from 'react'
import UseCheckboxList from '../../Hooks/UseCheckboxList'
import { Card, CardBody, CardHeader, Col, Input, Label } from 'reactstrap'

const FilterProducts = () => {
    const [formCheck, setFromCheck] = useState({
        cuentas_mudadas: false,
        bares: false,
        cantidad: false,
        precio_neto: false,
        servicio: false,
        iva: false,
        total: false,
        nombre: false,
        todo: true,
        all_productos: false
    })
    const listCheck = [

        {
            value: 'cuentas_mudadas',
            label: 'Cuentas Mudadas',
            checked: formCheck.cuentas_mudadas,
            function: (e: any) => handleChecked(e, formCheck.cuentas_mudadas)

        },
        {
            value: 'bares',
            label: 'Bares',
            checked: formCheck.bares,
            function: (e: any) => handleChecked(e, formCheck.bares)
        }

    ]
    const listCheckOrder = [

        {
            value: 'cantidad',
            label: 'Cantidad',
            checked: formCheck.cantidad,
            function: (e: any) => handleChecked(e, formCheck.cantidad)
        },
        {
            value: 'precio_neto',
            label: 'Precio Neto',
            checked: formCheck.precio_neto,
            function: (e: any) => handleChecked(e, formCheck.precio_neto)
        },
        {
            value: 'servicio',
            label: 'Servicio',
            checked: formCheck.servicio,
            function: (e: any) => handleChecked(e, formCheck.servicio)
        },
        {
            value: 'iva',
            label: 'Iva',
            checked: formCheck.iva,
            function: (e: any) => handleChecked(e, formCheck.iva)
        },
        {
            value: 'total',
            label: 'Total',
            checked: formCheck.total,
            function: (e: any) => handleChecked(e, formCheck.total)
        },
        {
            value: 'nombre',
            label: 'Nombre',
            checked: formCheck.nombre,
            function: (e: any) => handleChecked(e, formCheck.nombre)
        }
    ]
    const handleChecked = (e: any, checked: boolean) => {
        setFromCheck((prev: any) => ({
            ...prev,
            [e.target.name]: !checked
        }))
    }
    return (
        <>
            <Col lg='' className=''>
                <Card className='h-100'>
                    <CardBody >
                        <UseCheckboxList
                            classDiv=' fs-12'
                            listCheck={listCheck}
                        />

                    </CardBody>
                </Card>
            </Col>
            <Col lg='' className=''>

                <Card className='h-100'>
                    <CardHeader className='p-0 px-1'>
                        <span className='fs-11 fw-bold'>Ordenar por</span>
                    </CardHeader>
                    <CardBody>
                        <UseCheckboxList
                            classDiv=' fs-12'
                            listCheck={listCheckOrder}
                        />
                    </CardBody>
                </Card>

            </Col>
            <Col>

                <Card className='h-100'>
                    <CardHeader className='p-0 px-1 '>
                        <UseCheckboxList
                            classDiv='m-0 fs-12'
                            listCheck={[
                                {
                                    value: "todo",
                                    label: 'Visualizar Todo',
                                    checked: formCheck.todo,
                                    function: (e: any) => handleChecked(e, formCheck.todo)
                                }]}
                        />
                    </CardHeader>

                    {formCheck?.todo &&
                        <CardBody>
                            <Label className='fs-11'>Visualizar Por Grupos</Label><br />
                            <Label className='fs-11'>Grupos</Label>
                            <Input type='select' className='fs-11' bsSize='sm'>
                                <option>Grupos</option>
                            </Input>
                            <Label className='fs-11'>Sub Grupos</Label>
                            <Input type='select' className='fs-11 mb-1' bsSize='sm' >
                                <option>Sub Grupos</option>
                            </Input>
                            <Label className='fs-11'>Sitio Impresora</Label>
                            < Input type='select' className='fs-11' bsSize='sm'>
                                <option>Cocina</option>
                            </Input>
                            <UseCheckboxList
                                classDiv=' fs-11'
                                listCheck={[{
                                    value: "all_productos",
                                    label: 'Por Producto',
                                    checked: formCheck.all_productos,
                                    function: (e: any) => handleChecked(e, formCheck.all_productos)
                                }]}
                            />
                            {formCheck.all_productos && < Input type='select' className='fs-11' bsSize='sm'>
                                <option>Productos</option>
                            </Input>}

                        </CardBody>}

                </Card>
            </Col >
        </>
    )
}

export default FilterProducts