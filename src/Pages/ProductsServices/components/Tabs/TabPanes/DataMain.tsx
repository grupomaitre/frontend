import { FC, useEffect, useState } from 'react'
import { Button, Col, Input, Label, Row, TabPane } from "reactstrap"
import ModalMarcar from '../../Modal/ModalMarcar'
import ModalMedida from '../../Modal/ModalMedida'
import { getMarcas } from '../../../Api/ApiProducts'
import { getMedidas } from '../../../Api/ApiMedidas'
import { InterfacesProduct } from './Interfaces/InterfacesProduct'
import SelectCommon from '../../../../Pos/common/SelectCommon'
import InputCommon from '../../../../../common/Inputs/InputCommon'
import Spinner from '../../../../../common/Loading/Spinner'
import { usefetchGroupsMain } from '../../../../Pos/Api/ApiGroups'
import SelectGeneric from '../../../../../common/Select/SelectGeneric'
interface Props {
    tabId: string
    opSubCategorias?: any
    setDataSend: any
    dataSend: InterfacesProduct
    isEditProduct?: any
    validation: any
    isIDRubro: any
    setIsIDRubro: any
    isID: any
    setIsID: any
}

const DataMain: FC<Props> = ({ tabId, validation }) => {
    //const id_tipo_rubro = JSON.parse(localStorage.getItem('IdTipoRubro') || '0')

    const { data: grupos, isLoading, } = usefetchGroupsMain(1)
    const [showModalMarca, setShowModalMarca] = useState(false)
    const [showModalMedida, setShowModalMedida] = useState(false)
    //  const [options, setOptions] = useState([] as any)
    const [optionsMedidas, setOptionsMedidas] = useState([] as any)
    const [opCartegorias, setOpCategorias] = useState<any>([])
    const [opSubGrupo, setOpSetSubGrupo] = useState<any>([])
    //selection option selects
    const [selectedMarca, setSelectedMarca] = useState<any>(null);
    const [selectedMedida, setSelectedMedida] = useState<any>(null);
    const [selectedMedidaPre, setSelectedMedidaPre] = useState<any>(null)
    //options
    const [opMedidaPre, setOpMedidaPre] = useState<any>([])
    useEffect(() => {
        setOpMedidaPre([
            {
                label: "Medidad de presentacion",
                value: 1
            },
            {
                label: " Paquete",
                value: 2
            }
        ])
    }, [])
    useEffect(() => {
        if (grupos) {
            setOpCategorias((grupos || []).map((item: any) => (
                {
                    value: item.id_rubro,
                    label: item.name_rubro,
                    sub_rubros: item.sub_rubros || [],

                }
            )))
            if (!validation.values.id_rubro) {

                const filterRubro = grupos.filter((item: any) => item?.id_rubro === grupos[0]?.id_rubro)
                const mapSubCategories = (filterRubro[0]?.sub_rubros || []).map((item: any) => ({ value: item?.id_sub_rubro || '', label: item?.name_sub_rubro || '' })) || []
                setOpSetSubGrupo(mapSubCategories)
                sessionStorage.setItem("id_rubro", JSON.stringify(grupos[0]?.id_rubro));
                sessionStorage.setItem("id_sub_rubro", JSON.stringify(mapSubCategories[0].value));
            } else {
                const filterRubro = grupos.filter((item: any) => item?.id_rubro === parseFloat(validation.values.id_rubro))
                const mapSubCategories = (filterRubro[0]?.sub_rubros || []).map((item: any) => ({ value: item?.id_sub_rubro || '', label: item?.name_sub_rubro || '' })) || []
                validation.setFieldValue('id_sub_rubro', mapSubCategories[0]?.value)
                setOpSetSubGrupo(mapSubCategories)

            }

        }
    }, [grupos, validation.values.id_rubro])


    const [optionsMarca, setOptionsMarca] = useState<any>([])
    useEffect(() => {
        getMarcas().then((res: any) => {
            // console.log(res)
            setOptionsMarca(
                res.data.map((item: any) => {
                    return {
                        value: item.id_marca,
                        label: item.nombre
                    }
                })
            )
        })
    }, [showModalMarca])

    useEffect(() => {
        getMedidas().then((res: any) => {
            setOptionsMedidas(
                res.data.map((item: any) => {
                    return {
                        value: item.id_medida,
                        label: item.nombre
                    }
                })
            )
        })
    }, [showModalMedida])

    useEffect(() => {
        sessionStorage.setItem("id_rubro", JSON.stringify(validation.values.id_rubro));

    }, [validation.values.id_rubro])

    useEffect(() => {
        sessionStorage.setItem("id_sub_rubro", (validation.values.id_sub_rubro || 0));

    }, [validation.values.id_sub_rubro])

    useEffect(() => {
        validation.setFieldValue('id_medida', selectedMedida?.value)
        sessionStorage.setItem("id_medida", JSON.stringify(selectedMedida?.value));

    }, [selectedMedida])

    const handleToggleField = (fieldName: string) => {
        validation.setFieldValue(fieldName, !validation.values[fieldName])
    }
    return (
        <>
            {showModalMarca && < ModalMarcar
                show={showModalMarca}
                onClickClose={() => setShowModalMarca(!showModalMarca)}
            />}
            {showModalMedida &&
                <ModalMedida

                    show={showModalMedida}
                    onClickClose={() => setShowModalMedida(!showModalMedida)}
                />}
            <TabPane tabId={tabId} id="home" className=' ' style={{ fontSize: '0.7rem' }}>
                <span className='fs-1 text-danger'>


                </span>
                {isLoading ?
                    <div><Spinner /></div>
                    : <div>
                        <Row className='mb-1'>
                            <Col lg='2'>
                                <Label className='fs-13'>Grupo</Label>
                            </Col>
                            <Col lg='3'>

                                <SelectGeneric
                                    optionSelect={(e: number) => validation.setFieldValue('id_rubro', e)}
                                    options={opCartegorias}
                                    btnClear={false}
                                    validationValue={validation.values.id_rubro}

                                />
                            </Col>
                            <Col lg='2'>
                                <Label className='fs-13'>{'Medida de Precentación'}</Label>
                            </Col>
                            <Col>
                                <SelectCommon
                                    value={selectedMedidaPre}
                                    setSelectedOption={setSelectedMedidaPre}
                                    options={opMedidaPre}
                                    isClearable={true}
                                />

                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col lg='2'>
                                <Label className='fs-13'>Sub Grupo</Label>
                            </Col>
                            <Col lg='3'>

                                <SelectGeneric
                                    optionSelect={(e: any) => validation.setFieldValue('id_sub_rubro', e)}
                                    options={opSubGrupo}
                                    btnClear={false}
                                    validationValue={validation.values.id_sub_rubro}

                                />
                            </Col>
                            <Col lg='1'>
                                <Label className='fs-13'>Medida</Label>
                            </Col>
                            <Col lg='1'>
                                <Input
                                    bsSize='sm'
                                />
                            </Col>
                            <Col lg='4' className='me-0 pe-0'>
                                <SelectCommon
                                    value={selectedMedida}
                                    setSelectedOption={setSelectedMedida}
                                    options={optionsMedidas}
                                    isClearable={true}
                                />
                            </Col>
                            <Col lg='' className='ps-0'>
                                <Button
                                    onClick={() => setShowModalMedida(true)}
                                    size='sm'
                                    className='rounded-start-0'
                                    block
                                    color='primary'>+</Button>
                            </Col>
                        </Row>

                        <Row className='mb-1'>
                            <Col lg='2'>
                                <Label className='fs-13'>Nombre Producto</Label>
                            </Col>
                            <Col lg='3'>

                                <InputCommon
                                    nameInput={'nombre'}
                                    validation={validation}
                                    validationValue={validation.values.nombre}
                                    validationTouched={validation.touched.nombre}
                                    validationErrors={validation.errors.nombre}

                                />

                            </Col>
                            <Col lg='2'>
                                <Label className='fs-13'>Stock Minimo</Label>
                            </Col>
                            <Col lg='2'>

                                <InputCommon
                                    nameInput={'stock_minimo'}
                                    validation={validation}
                                    validationValue={validation.values.stock_minimo}
                                    validationTouched={validation.touched.stock_minimo}
                                    validationErrors={validation.errors.stock_minimo}

                                />
                            </Col>
                            <Col >
                                <Input
                                    id="editable"
                                    type="checkbox"
                                    name="editable"
                                    checked={validation.values.editable}
                                    onChange={() => handleToggleField('editable')}
                                />
                                <Label htmlFor='editable'>Editable</Label>
                            </Col>

                            <Col>


                                <Input
                                    id='editPrecio'
                                    name='editable_precio'
                                    type="checkbox"
                                    checked={validation.values.editable_precio}
                                    onChange={() => handleToggleField('editable_precio')}
                                />
                                <Label htmlFor='editPrecio'>Editable Precio</Label>
                            </Col>

                        </Row>


                        <Row className='mb-1'>
                            <Col lg='2'>
                                <Label className='fs-13'>Codigo Fabrica</Label>
                            </Col>
                            <Col lg='3'>

                                <InputCommon
                                    nameInput={'cod_fabrica'}
                                    validation={validation}
                                    validationValue={validation.values.cod_fabrica}
                                    validationTouched={validation.touched.cod_fabrica}
                                    validationErrors={validation.errors.cod_fabrica}

                                />

                            </Col>
                            <Col lg='2'>
                                <Label className='fs-13'>Stock Maximo</Label>
                            </Col>
                            <Col lg='2'>
                                <InputCommon
                                    nameInput={'stock_maximo'}
                                    validation={validation}
                                    validationValue={validation.values.stock_maximo}
                                    validationTouched={validation.touched.stock_maximo}
                                    validationErrors={validation.errors.stock_maximo}

                                />
                            </Col>
                            <Col >
                                <Input
                                    id='editName'
                                    type="checkbox"
                                    name='editable_nombre'
                                    checked={validation.values.editable_nombre}
                                    onChange={() => handleToggleField('editable_nombre')}
                                />
                                <Label htmlFor='editName' className='cursor-pointer'>Editable Nomrbe</Label>
                            </Col>

                            <Col>
                                <Input
                                    id='estado'
                                    name='estado'
                                    type="checkbox"
                                    checked={validation.values.estado}
                                    onChange={() => handleToggleField('estado')}
                                />

                                <Label htmlFor='estado' className='cursor-pointer'>Activo</Label>
                            </Col>

                        </Row>
                        <Row className='mb-1'>
                            <Col lg='2'>
                                <Label className='fs-13'>Marca</Label>
                            </Col>
                            <Col lg='2' className='me-0 pe-0'>
                                <SelectCommon
                                    value={selectedMarca}
                                    setSelectedOption={setSelectedMarca}
                                    options={optionsMarca}
                                    isClearable={true}

                                />
                            </Col>
                            <Col lg='1' className='ps-0 ms-0'>
                                <Button
                                    size='sm'
                                    className='rounded-start-0'
                                    block
                                    color='primary'
                                    onClick={() => setShowModalMarca(true)}
                                >
                                    +
                                </Button>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg='2'>
                                <Label className='fs-13'>Prioridad</Label>
                            </Col>
                            <Col lg='2' className='me-0 pe-0'>
                                <Input
                                    bsSize='sm'
                                    className='custom-input'
                                />
                            </Col>


                        </Row>


                    </div>}

            </TabPane>
        </>
    )
}

export default DataMain