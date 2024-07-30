import { FC, useState } from 'react'
import Flatpickr from "react-flatpickr";
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
//import GoblaTable from '../../../../Components/Common/DataTables/GlobalTable';
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
const ModalReservas: FC<IProps> = ({ show, onCloseClick }) => {
    const [reservas, setReservas] = useState<any>({})
    const [data, setData] = useState<any>([])
    const inputs = [
        {
            id: 1, label: 'Reservado por', type: 'text', placeholder: 'Reservado por', value: reservas.reservadoPor, name: 'reservadoPor', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, reservadoPor: e.target.value })
            }
        },
        {
            id: 2, label: 'Telefono', type: 'text', placeholder: 'Telefono', value: reservas.telefono, name: 'telefono', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, telefono: e.target.value })
            }
        },
        {
            id: 3, label: 'Mesa', type: 'text', placeholder: 'Mesa', value: reservas.Mesa, name: 'mesa', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, Mesa: e.target.value })
            }
        },
        {
            id: 4, label: 'Pax', type: 'text', placeholder: 'Pax', value: reservas.Pax, name: 'pax', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, Pax: e.target.value })
            }
        },
        {
            id: 5, label: 'Correo', type: 'text', placeholder: 'Correo', value: reservas.Correo, name: 'correo', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, Correo: e.target.value })
            }
        },
        {
            id: 6, label: 'Observaciones', type: 'text', placeholder: 'Observaciones', value: reservas.Observaciones, name: 'observaciones', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, Observaciones: e.target.value })
            }
        },
        {
            id: 7, label: 'Ciudad', type: 'text', placeholder: 'Ciudad', value: reservas.Ciudad, name: 'ciudad', required: true, disabled: false,
            onChange: (e: any) => {
                setReservas({ ...reservas, Ciudad: e.target.value })
            }
        },
    ]
    const handleReserva = () => {
        //add reserva items inputs
        setData([...data, reservas])
        //clear inputs
        setReservas({
            reservadoPor: '',
            telefono: '',
            Mesa: '',
            Pax: '',
            Correo: '',
            Observaciones: '',
            Ciudad: '',
        })

    }
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Reservado por',
            accessor: 'reservadoPor',
        },
        {
            Header: 'Telefono',
            accessor: 'telefono',
        },
        {
            Header: 'Mesa',
            accessor: 'Mesa',
        },
        {
            Header: 'Pax',
            accessor: 'Pax',
        },
        {
            Header: 'Correo',
            accessor: 'Correo',
        },
        {
            Header: 'Observaciones',
            accessor: 'Observaciones',
        },
        {
            Header: 'Ciudad',
            accessor: 'Ciudad',
        },
        {
            Header: 'Opciones',
            accessor: 'opciones',
            Cell: ({ row }: any) => {
                return (
                    <div>
                        <Button color='danger' size='sm' className='me-1'
                            onClick={() => { handleDelete(row.id) }}
                        >Eliminar</Button>
                        <Button color='primary' size='sm'>Editar</Button>
                    </div >
                )
            }
        }
    ]
    const handleDelete = (id: number) => {
        const newData = data.filter((item: any) => item.id !== id)
        setData(newData)
    }
    return (
        <Modal isOpen={show} backdrop='static' size='xl' fade={false}>
            <ModalHeader toggle={onCloseClick}>
                {'Reservas'}
            </ModalHeader>
            <ModalBody className='fondo-sistema text-white'>
                {
                    inputs.map((item: any) => (
                        <Row key={item.id}>
                            <Col lg='3'>
                                <Label>{item.label}</Label>

                            </Col>
                            <Col>
                                <Input
                                    className='mb-1 rounded-0 border-0'
                                    bsSize='sm'
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    value={item.value}
                                    name={item.name}
                                    required={item.required}
                                    disabled={item.disabled}
                                    onChange={item.onChange}
                                />
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <Col>
                        <Label>Fecha de Reserva</Label>
                        <Flatpickr
                            className="form-control"
                            id="datepicker-publish-input"
                            placeholder="Select a date"
                            options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                mode: "multiple",
                                dateFormat: "d.m.y",
                            }}
                        />
                    </Col>
                    <Col>
                        <Label>Fin de Reserva</Label>
                        <Flatpickr
                            className="form-control"
                            id="datepicker-publish-input"
                            placeholder="Select a date"
                            options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                mode: "multiple",
                                dateFormat: "d.m.y",
                            }}
                        />
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <Button color='primary' block className='mt-3'
                            onClick={handleReserva}
                        >Guardar</Button>
                    </Col>
                </Row>
                <Row>
                    {/*        <GoblaTable
                        columns={columns || []}
                        data={data || []}
                        tableClass={'table table-sm table-striped table-hover table-bordered border-light mb-0 d-table-fixed fs-13'}
                    /> */}
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default ModalReservas