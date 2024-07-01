import Flatpickr from "react-flatpickr";
import Select from 'react-select'
import { Button, Col, Container, Input, Label, Row } from 'reactstrap'

interface IitemsInputs {
    label?: string,
    type: string,
    options?: any[],
    value: string,
    onchange: any,
    function: any
}

const FilterComp = () => {

    const itemsInputs: IitemsInputs[] = [

        {
            label: 'Documento',
            type: 'Select',
            options: [],
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            label: 'Serie',
            type: 'Select',
            options: [],
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            label: 'Estado',
            type: 'Select',
            options: [],
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            label: 'Por Fechas',
            type: 'Radio',
            options: [],
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            type: 'date',
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            type: 'radio',
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            label: 'Desde',
            type: 'text',
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            label: 'Hasta',
            type: 'text',
            value: '',
            onchange: () => { },
            function: () => { }

        },
        {
            label: 'Documento',
            type: 'radio',
            value: '',
            onchange: () => { },
            function: () => { }
        },
        {
            label: 'Actualizar',
            type: 'button',
            value: '',
            onchange: () => { },
            function: () => { }
        }
    ]


    return (
        <>
            <Container>
                {
                    itemsInputs.map((item, index) => {
                        if (item.type === 'Select') {
                            return (
                                <Row key={index} className='mt-2 fs-11'>
                                    <Col xs='3'>
                                        <Label>{item.label}</Label>
                                    </Col>
                                    <Col xs='3'>
                                        <Select
                                            options={item.options}
                                            onChange={item.onchange}
                                            value={item.value}
                                            styles={
                                                {
                                                    control: (base: any) => ({
                                                        ...base,
                                                        height: '30px',
                                                        minHeight: '30px',
                                                        fontSize: '11px',
                                                        borderRadius: '0px',
                                                        boxShadow: 'none',
                                                        backgroundColor: '#fff'
                                                    })
                                                }
                                            }
                                        />
                                    </Col>
                                </Row>
                            )
                        } else if (item.type === 'Radio') {
                            return (
                                <Row key={index} className='mt-2 fs-11 text-white'>
                                    <Col xs='3'>
                                        <Label>{item.label}</Label>
                                    </Col>
                                    <Col xs='3'>
                                        <Input
                                            className='rounded-0'
                                            bsSize='sm'
                                            styles={{ 'font-size': '11px' }}
                                            onChange={item.onchange}
                                            value={item.value}
                                        />
                                    </Col>
                                </Row>
                            )
                        } else if (item.type === 'date') {
                            return (
                                <Row key={index} className='mt-2'>
                                    <Col xs='3'>
                                        <Label>{item.label}</Label>
                                    </Col>
                                    <Col xs='3'>
                                        <Flatpickr
                                            className='form-control rounded-0'
                                            value={item.value}
                                            onChange={item.onchange}
                                        />
                                    </Col>
                                </Row>
                            )
                        } else if (item.type === 'text') {
                            return (
                                <Row key={index} className='mt-2'>
                                    <Col xs='3'>
                                        <Label>{item.label}</Label>
                                    </Col>
                                    <Col xs='9'>
                                        <Input
                                            type={item.type}
                                            onChange={item.onchange}
                                            value={item.value}
                                        />
                                    </Col>
                                </Row>
                            )
                        } else if (item.type === 'button') {
                            return (
                                <Row key={index} className='mt-2'>
                                    <Col xs='3'>
                                        <Label>{item.label}</Label>
                                    </Col>
                                    <Col xs='9'>
                                        <Button
                                            color='primary'
                                            onClick={item.function}
                                        >
                                            {item.label}
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        }
                    })
                }
            </Container>

        </>
    )
}

export default FilterComp