import { Row, Col, Label, Input } from 'reactstrap'
import { useState, FC, useEffect } from 'react'
import InputModalPrices from './InputModalPrices'
import Select from 'react-select'
import { IInputFormPrices } from './InterfacePrices'
import { editPreciosProduct } from '../../../../Api/ApiPrecios'
import { useFormik } from "formik";
import * as Yup from "yup"; interface IProps {
    onCloseClick: () => void
    item: any
    isEditProduct: any
    validation: any
    setProducts: any
    fetchDataProduct?: any
    handleClear: () => void
}
const FormPriceModal: FC<IProps> = ({ onCloseClick, item, isEditProduct, fetchDataProduct, handleClear }) => {
    const [iva, setIva] = useState<number>(1)
    const [iva2, setIva2] = useState<number>(1.15)
    const [iva3, setIva3] = useState<number>(1.15)
    const [iva4, setIva4] = useState<number>(1.15)
    const [iva5, setIva5] = useState<number>(1.15)
    const [iva6, setIva6] = useState<number>(1.15)
    const [servicio, setServicio] = useState<number>(0)
    const [itmesFormPrices, setItmesFormPrices] = useState<IInputFormPrices>({
        id_product: isEditProduct?.id_product,
        pCosto: isEditProduct?.pCosto,
        precio: item?.precio || Math.round((isEditProduct?.precio) * 100) / 100 || '',
        promo1: isEditProduct?.promo_1 || '0.00',
        promo2: isEditProduct?.promo_2 || '0.00',
        free: isEditProduct?.free_1 || '0.00',
        pvp4_1: isEditProduct?.pvp_4 || '0.00',
        pvp4_2: isEditProduct?.pvp_5 || '0.00',
        comision: 0.00,
        iva: iva,
        servicio: 0,
    })
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            precio_costo: (itmesFormPrices && itmesFormPrices?.pCosto) || '',
            precio: (itmesFormPrices && itmesFormPrices?.precio) || item?.precio || '',
            promo_1: (itmesFormPrices && itmesFormPrices?.promo1) || '0.00',
            promo_2: (itmesFormPrices && itmesFormPrices?.promo2) || '0.00',
            free_1: (itmesFormPrices && itmesFormPrices?.free) || '0.00',
            pvp_4: (itmesFormPrices && itmesFormPrices?.pvp4_1) || '0.00',
            pvp_5: (itmesFormPrices && itmesFormPrices?.pvp4_2) || '0.00',
            valor_comision: (itmesFormPrices && itmesFormPrices?.comision) || '0.00',
            iva: (itmesFormPrices && itmesFormPrices?.iva) || '0.00',
            servicio: servicio,
        },
        validationSchema: Yup.object({



        }),
        onSubmit: (values) => {

            const updatePrices = {

                precio_costo: values.precio_costo || 0.00,
                precio: values.precio || 0.00,
                promo_1: values.promo_1 || 0.00,
                promo_2: values.promo_2 || 0.00,
                free_1: values.free_1 || 0.00,
                pvp_4: values.pvp_4 || 0.00,
                pvp_5: values.pvp_5 || 0.00,
                iva: iva,
                servicio: servicio,
            }
            editPreciosProduct(itmesFormPrices['id_product'], updatePrices).then((res: any) => {
                if (res?.status === 'success') {
                    onCloseClick()
                    fetchDataProduct()
                    setItmesFormPrices({
                        id_product: 0,
                        pCosto: 0,
                        precio: 0,
                        promo1: 0,
                        promo2: 0,
                        free: 0,
                        pvp4_1: 0,
                        pvp4_2: 0,
                        comision: 0,
                        iva: iva,
                        servicio: 0
                    })
                }
            })


        },

    })

    useEffect(() => {
        setItmesFormPrices((dataEdit: any) => ({ ...dataEdit, ...item }))
    }, [item])

    useEffect(() => {
        const data = {
            precio_costo: itmesFormPrices.pCosto,
            precio: itmesFormPrices.precio,
            promo_1: itmesFormPrices.promo1,
            promo_2: itmesFormPrices.promo2,
            free_1: itmesFormPrices.free,
            pvp_4: itmesFormPrices.pvp4_1,
            pvp_5: itmesFormPrices.pvp4_2,
            comision: itmesFormPrices.comision,
            iva: itmesFormPrices.iva,
            servicio: servicio,
        }
        setItmesFormPrices((dataEdit: any) => ({ ...dataEdit, ...data }))
    }, [item, servicio])
    return (
        <>


            <InputModalPrices
                validation={validation}
                isEditProduct={isEditProduct}
                iva={iva}
                iva2={iva2}
                iva3={iva3}
                iva4={iva4}
                iva5={iva5}
                iva6={iva6}
                setIva={setIva}
                setIva2={setIva2}
                setIva3={setIva3}
                setIva4={setIva4}
                setIva5={setIva5}
                setIva6={setIva6}
            />

            <Row className='text-white fs-11 mt-4'>
                <Col>
                    <Input
                        type='checkbox'
                        className='me-2'
                        onClick={() => setServicio(servicio === 0 ? 10 : 0)}
                    />
                    <Label>
                        {'Trabaja con Propina/Servicio'}
                    </Label>
                </Col>
            </Row>

            <Row className='fs-11 text-white'>
                <Col lg='2'>
                    <Label>
                        Tipo de ICE
                    </Label>
                </Col>
                <Col lg='3'>
                    <Select

                        styles={{
                            control: (provided) => ({
                                ...provided,
                                border: 'none',
                                boxShadow: 'none',
                                borderRadius: '0px',
                                height: '25px',
                                minHeight: '25px',
                            }),
                        }}

                    />
                </Col>
            </Row>

        </>
    )
}

export default FormPriceModal