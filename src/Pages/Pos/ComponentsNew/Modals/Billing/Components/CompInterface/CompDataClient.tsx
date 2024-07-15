import { useState, FC } from 'react'
import Select from 'react-select'
import { Row, Col, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { setClientes } from '../../../../../../../slices/Cart/clientesSlice'

interface Props {
    setCliente: any
    setInputs: any
    setFocusID: any
    focusID: any
    inputreftes?: any
    listClient: any
}
const CompDataClient: FC<Props> = ({ setInputs, listClient, setFocusID, focusID, inputreftes }) => {
    const dispatch = useDispatch()
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);


    const handleChange = (e: any) => {
        console.log(e)
        dispatch(setClientes(e))
        setInputs({
            razon_social: e?.razon_social || null,
            identificacion: e?.identificacion || null,
            telefono: e?.telefono || null,
            direccion: e?.direccion || null,
            email: e?.email || null,
            observaciones: e?.observaciones || null,
            value: e?.value || null,
        })
        setSelectedOption(e);
    };



    const onchangeCliente = (e: any) => {

        /*        setInputs({
                   razon_social: e.razon_social,
                   identificacion: e.identificacion,
                   telefono: e.telefono,
                   direccion: e.direccion,
                   correo: e.email,
                   observaciones: e.observaciones,
                   value: e.value,
               }) */
        setMenuIsOpen(e.length > 0);
    }
    // select keydown cliente 'enter'
    const captureInput = (e: any) => {
        //validar numero
        if (e.key === 'Enter') {
            const numero = /^\d+$/.test(e.target.value);
            inputreftes.current?.focus()
            if (!numero) {
                setInputs({
                    empresa: e.target.value,
                    identificacion: '',
                    telefono: '',
                    direccion: '',
                    correo: '',
                    observaciones: '',
                })
            } else {
                setInputs({
                    empresa: '',
                    identificacion: e.target.value,
                    telefono: '',
                    direccion: '',
                    correo: '',
                    observaciones: '',
                })
            }

            setFocusID(!focusID)
        }
    }

    return (
        <>

            < Label className='fs-11 text-black' > Búsqueda: (Ruc, cedula, empresa, persona)</Label >

            <Row className='d-flex align-items-center'>
                <Col lg='12 mb-4'>
                    <Select
                        value={selectedOption}
                        className=' rounded border-warning border'
                        options={listClient}
                        placeholder='Consumidor Final'
                        onChange={handleChange}
                        onInputChange={(e: any) => onchangeCliente(e)}
                        onKeyDown={(e: any) => captureInput(e)}
                        menuIsOpen={menuIsOpen}
                        isClearable={true}
                        styles={
                            {
                                control: (base: any) => ({
                                    ...base,
                                    height: '35px',
                                    minHeight: '35px',
                                    fontSize: '12px',
                                    background: 'rgb(255, 175, 95,0.6)'

                                })
                            }
                        }
                    />

                </Col>

            </Row>

        </>
    )
}

export default CompDataClient