import { useState, FC, useEffect } from 'react'
import Select from 'react-select'
import { Row, Col, Label } from 'reactstrap'
import { getClientes } from '../../../../../Helpers/Apiclientes'
import { useDispatch } from 'react-redux'
import { setClientes } from '../../../../../../../slices/Cart/clientesSlice'
import { useQuery } from 'react-query'

interface Props {
    setCliente: any
    setInputs: any
    setFocusID: any
    focusID: any
    inputreftes?: any
}
const CompDataClient: FC<Props> = ({ setInputs, setFocusID, focusID, inputreftes }) => {
    const dispatch = useDispatch()
    const [listClient, setListClient] = useState([])
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const { data: clienteData } = useQuery('clientes', getClientes, {
        staleTime: Infinity,
        cacheTime: Infinity
    });
    useEffect(() => {
        setListClient((clienteData?.data || []).map((item: any) => (
            {
                value: item.id_cliente,
                razon_social: item.razon_social,
                label: item.razon_social + ' - ' + item.identificacion,
                identificacion: item.identificacion,
                direccion: item.direccion,
                telefono: item.telefono,
                email: item.email,
                observaciones: item.observaciones,
            }
        )
        ))

    }, [clienteData])

    const handleChange = (e: any) => {
        dispatch(setClientes(e))
        setInputs({
            razon_social: e?.razon_social || null,
            identificacion: e?.identificacion || null,
            telefono: e?.telefono || null,
            direccion: e?.direccion || null,
            correo: e?.email || null,
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
                        className=' rounded border-success border'
                        options={listClient}
                        placeholder='Buscar Cliente'
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