import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Input, Label, Row } from 'reactstrap'
import { useEffect, useState, FC, useRef } from 'react'
import InputCommon from '../../../../../../common/Inputs/InputCommon'
import SelectCommon from '../../../../../Pos/common/SelectCommon'
interface IProps {
    validation: any
    isEditProduct: any
    iva: any
    iva2: any
    iva3: any
    iva4: any
    iva5: any
    iva6: any
    setIva: any
    setIva2: any
    setIva3: any
    setIva4: any
    setIva5: any
    setIva6: any
}
const InputModalPrices: FC<IProps> = ({
    validation,
    iva,
    iva2,
    iva3,
    iva4,
    iva5,
    iva6,
    setIva,
    setIva2,
    setIva3,
    setIva4,
    setIva5,
    setIva6,
    isEditProduct
}) => {

    const [option, setOptions] = useState([
        {
            value: 15,
            label: 'IVA 15',
        },
        {
            value: 0,
            label: 'IVA 0',
        },
        {
            value: 'NO_OBEJTO_IVA',
            label: 'NO OBEJTO DE IVA',
        },
        {
            value: 'EXENTO_IVA',
            label: 'EXENTO DE IVA',
        },
    ])
    const inputRef = useRef<HTMLInputElement>(null);
    //selection option selects
    const [opSubGrupo, setOpSetSubGrupo] = useState<any>([])
    const [selectedSubGrupo, setSelectedSubGrupo] = useState<any>(null);
    useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);
    const [checked, setChecked] = useState(true)

    useEffect(() => {
        if (isEditProduct?.iva === '1.0000') {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }, [isEditProduct]);

    useEffect(() => {
        if (checked) {
            setIva(1.15);
        } else {
            setIva(1);
        }
    }, [checked]);

    return (
        <>
            <Form
                className='text-white'
                onSubmit={(e) => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false;
                }}
            >
                <Card>
                    {/*     <CardHeader className='bg-black text-danger fs-12 '>
                        <Row className='' >
                            <Col lg='2'>
                                <Label>P.Costo</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'precio_costo'}
                                    validation={validation}
                                    validationValue={validation.values.precio_costo || '0.00'}
                                    validationTouched={validation.touched.precio_costo}
                                    validationErrors={validation.errors.precio_costo}
                                    disabled={true}
                                />
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'precio_costo'}
                                    validation={validation}
                                    validationValue={validation.values.precio_costo || '0.00'}
                                    validationTouched={validation.touched.precio_costo}
                                    validationErrors={validation.errors.precio_costo}

                                />
                            </Col>
                            <Col>
                                <Label style={{ fontFamily: 'comic sans ms', color: '#ff0000' }} className='fs-16'>{'Edición de Precios'}</Label>
                            </Col>
                        </Row>
                    </CardHeader> */}
                    <CardBody className='mt-0 pt-0 text-danger'>

                        {/* TITLES */}
                        <Row className='bg-black text-info fs-13 d-flex align-items-center'>
                            <Col lg=''>
                                <Label>-</Label>
                            </Col>
                            <Col>
                                <Label>
                                    P. Actual
                                </Label>
                            </Col>
                            <Col lg=''>
                                <Label>P.Nuevo</Label>
                            </Col>
                            <Col className='text-start'>
                                <Label>% Sugerido</Label>
                            </Col>
                            <Col lg='5'>
                                <Button type='submit' className='my-1' color='primary' block size='sm'>{'Actualizar Precios'}</Button>
                            </Col>
                        </Row>
                        {/* Form prices */}
                        {/* row 1 pvp */}
                        <Row className='fs-13'>
                            <Col className='bg-black text-danger' lg='1'>
                                <Label>{'PVP'}</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'precio'}
                                    validation={validation}
                                    validationValue={validation.values.precio || ''}
                                    validationTouched={validation.touched.precio}
                                    validationErrors={validation.errors.precio}
                                    disabled={true}
                                    type={'number'}

                                />
                            </Col>
                            <Col lg='2' className=''>
                                <div className='w-75'>
                                    <InputCommon
                                        innerRef={inputRef}
                                        nameInput={'precio'}
                                        validation={validation}
                                        validationValue={validation.values.precio}
                                        validationTouched={validation.touched.precio}
                                        validationErrors={validation.errors.precio}
                                        type={'number'}
                                        inputClass={'text-end'}
                                    />
                                </div>
                            </Col>
                            {/* vacio */}
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'precio_costo'}
                                    validation={validation}
                                    validationValue={validation.values.precio_costo || '0.00'}
                                    validationTouched={validation.touched.precio_costo}
                                    validationErrors={validation.errors.precio_costo}

                                />
                            </Col>
                            <Col lg='2'>
                                <SelectCommon
                                    value={selectedSubGrupo}
                                    setSelectedOption={setSelectedSubGrupo}
                                    options={option}
                                    isClearable={true}
                                    fontSize={'11px'}
                                />
                            </Col>
                            <Col lg='2'>


                                <Input
                                    checked={!checked}
                                    readOnly
                                    type="checkbox"
                                    id='iva1'
                                    onClick={() => setChecked(!checked)}
                                />
                                <Label className='cursor-pointer text-black' htmlFor='iva1'>
                                    {'Incluido IVA'}
                                </Label>

                            </Col>
                            <Col lg='2'>
                                <div className='w-75'>
                                    <InputCommon
                                        nameInput={'precio'}
                                        validation={validation}
                                        validationValue={(parseFloat(validation.values.precio) * (iva)).toFixed(2) || '0.00'}
                                        validationTouched={validation.touched.precio}
                                        validationErrors={validation.errors.precio}
                                        disabled={true}
                                        readOnly={true}
                                        inputClass={'bg-black text-warning text-end'}
                                        type={'number'}

                                    />

                                </div>
                            </Col>
                        </Row>
                        {/* row 2 promo 1 */}
                        <Row className='fs-13'>
                            <Col className='bg-black text-danger' lg='1'>
                                <Label>{'PROMO 1'}</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'promo_1'}
                                    validation={validation}
                                    validationValue={validation.values.promo_1 || '0.00'}
                                    validationTouched={validation.touched.promo_1}
                                    validationErrors={validation.errors.promo_1}
                                    disabled={true}


                                />
                            </Col>
                            <Col lg='2'>
                                <div className='w-75'>
                                    <InputCommon
                                        inputClass={'text-end'}
                                        nameInput={'promo_1'}
                                        validation={validation}
                                        validationValue={validation.values.promo_1 || '0.00'}
                                        validationTouched={validation.touched.promo_1}
                                        validationErrors={validation.errors.promo_1}

                                    />
                                </div>
                            </Col>
                            <Col lg='1'>
                                <label htmlFor=""></label>
                            </Col>

                            <Col lg='2'>
                                <SelectCommon
                                    value={selectedSubGrupo}
                                    setSelectedOption={setSelectedSubGrupo}
                                    options={opSubGrupo}
                                    isClearable={true}
                                />
                            </Col>
                            <Col lg='2'>


                                <Input
                                    type='checkbox'
                                    id='iva2'
                                    onClick={() => setIva2(iva2 === 1.15 ? 1 : 1.15)}
                                />
                                <Label className='cursor-pointer text-black' htmlFor='iva2'>
                                    {'Incluido IVA'}
                                </Label>

                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'promo_1'}
                                        validation={validation}
                                        validationValue={(parseFloat(validation.values.promo_1) * (iva2)).toFixed(2)}

                                        validationTouched={validation.touched.promo_1}
                                        validationErrors={validation.errors.promo_1}
                                        disabled={true}
                                        readOnly={true}
                                        inputClass={'bg-black text-warning text-end'}

                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* row 3 promo 2 */}
                        <Row className='fs-13'>
                            <Col className='bg-black text-danger' lg='1'>
                                <Label>{'PROMO 2'}</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'promo_2'}
                                    validation={validation}
                                    validationValue={validation.values.promo_2 || '0.00'}
                                    validationTouched={validation.touched.promo_2}
                                    validationErrors={validation.errors.promo_2}
                                    disabled={true}
                                />
                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'promo_2'}
                                        validation={validation}
                                        validationValue={validation.values.promo_2 || '0.00'}
                                        validationTouched={validation.touched.promo_2}
                                        validationErrors={validation.errors.promo_2}
                                        inputClass={'text-end'}
                                    />
                                </div>
                            </Col>
                            <Col lg='1'>
                                <label htmlFor=""></label>
                            </Col>

                            <Col lg='2'>
                                <SelectCommon
                                    value={selectedSubGrupo}
                                    setSelectedOption={setSelectedSubGrupo}
                                    options={opSubGrupo}
                                    isClearable={true}
                                />
                            </Col>
                            <Col lg='2'>


                                <Input
                                    type='checkbox'
                                    id='iva3'
                                    onClick={() => setIva3(iva3 === 1.15 ? 1 : 1.15)}
                                />
                                <Label className='cursor-pointer text-black' htmlFor='iva3'>
                                    {'Incluido IVA'}
                                </Label>

                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'promo_2'}
                                        validation={validation}
                                        validationValue={(parseFloat(validation.values.promo_2) * (iva3)).toFixed(2) || '0.00'}
                                        validationTouched={validation.touched.promo_2}
                                        validationErrors={validation.errors.promo_2}
                                        disabled={true}
                                        inputClass={'bg-black text-warning text-end'}

                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* row 4 free */}
                        <Row className='fs-13'>
                            <Col className='bg-black text-danger' lg='1'>
                                <Label>{'FREE'}</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'free_1'}
                                    validation={validation}
                                    validationValue={validation.values.free_1 || '0.00'}
                                    validationTouched={validation.touched.free_1}
                                    validationErrors={validation.errors.free_1}
                                    disabled={true}
                                />
                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'free_1'}
                                        validation={validation}
                                        validationValue={validation.values.free_1 || '0.00'}
                                        validationTouched={validation.touched.free_1}
                                        validationErrors={validation.errors.free_1}
                                        inputClass={'text-end'}
                                    />
                                </div>
                            </Col>
                            <Col lg='1'>
                                <label htmlFor=""></label>
                            </Col>
                            <Col lg='2'>
                                <SelectCommon
                                    value={selectedSubGrupo}
                                    setSelectedOption={setSelectedSubGrupo}
                                    options={opSubGrupo}
                                    isClearable={true}
                                />
                            </Col>
                            <Col lg='2'>


                                <Input
                                    type='checkbox'
                                    id='iva4'
                                    onClick={() => setIva4(iva4 === 1.15 ? 1 : 1.15)}
                                />
                                <Label className='cursor-pointer text-black' htmlFor='iva4'>
                                    {'Incluido IVA'}
                                </Label>

                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'free_1'}
                                        validation={validation}
                                        validationValue={(parseFloat(validation.values.free_1) * (iva4)).toFixed(2) || '0.00'}
                                        validationTouched={validation.touched.free_1}
                                        validationErrors={validation.errors.free_1}
                                        disabled={true}
                                        inputClass={'bg-black text-warning text-end'}

                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* row 5 pvp 4 */}
                        <Row className='fs-13'>
                            <Col className='bg-black text-danger' lg='1'>
                                <Label>{'PVP 4'}</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'pvp_4'}
                                    validation={validation}
                                    validationValue={validation.values.pvp_4 || '0.00'}
                                    validationTouched={validation.touched.pvp_4}
                                    validationErrors={validation.errors.pvp_4}
                                    disabled={true}
                                />
                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'pvp_4'}
                                        validation={validation}
                                        validationValue={validation.values.pvp_4 || '0.00'}
                                        validationTouched={validation.touched.pvp_4}
                                        validationErrors={validation.errors.pvp_4}
                                        inputClass={'text-end'}
                                    />
                                </div>
                            </Col>
                            <Col lg='1'>
                                <label htmlFor=""></label>
                            </Col>
                            <Col lg='2'>
                                <SelectCommon
                                    value={selectedSubGrupo}
                                    setSelectedOption={setSelectedSubGrupo}
                                    options={opSubGrupo}
                                    isClearable={true}
                                />
                            </Col>
                            <Col lg='2'>


                                <Input
                                    type='checkbox'
                                    id='iva5'
                                    onClick={() => setIva5(iva5 === 1.15 ? 1 : 1.15)}
                                />
                                <Label className='cursor-pointer text-black' htmlFor='iva5'>
                                    {'Incluido IVA'}
                                </Label>

                            </Col>
                            <Col lg='2'>
                                <div className='w-75'>
                                    <InputCommon
                                        nameInput={'pvp_4'}
                                        validation={validation}
                                        validationValue={(parseFloat(validation.values.pvp_4) * (iva5)).toFixed(2) || '0.00'}
                                        validationTouched={validation.touched.pvp_4}
                                        validationErrors={validation.errors.pvp_4}
                                        disabled={true}
                                        inputClass={'bg-black text-warning text-end'}

                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* row 6 pvp 5 */}
                        <Row className='fs-13'>
                            <Col className='bg-black text-danger' lg='1'>
                                <Label>{'PVP 5'}</Label>
                            </Col>
                            <Col lg='1'>
                                <InputCommon
                                    nameInput={'pvp_5'}
                                    validation={validation}
                                    validationValue={validation.values.pvp_5 || '0.00'}
                                    validationTouched={validation.touched.pvp_5}
                                    validationErrors={validation.errors.pvp_5}
                                    disabled={true}
                                />
                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'pvp_5'}
                                        validation={validation}
                                        validationValue={validation.values.pvp_5}
                                        validationTouched={validation.touched.pvp_5}
                                        validationErrors={validation.errors.pvp_5}
                                        inputClass={'text-end'}
                                    />
                                </div>
                            </Col>
                            <Col lg='1'>
                                <label htmlFor=""></label>
                            </Col>
                            <Col lg='2'>
                                <SelectCommon
                                    value={selectedSubGrupo}
                                    setSelectedOption={setSelectedSubGrupo}
                                    options={opSubGrupo}
                                    isClearable={true}
                                />
                            </Col>
                            <Col lg='2'>


                                <Input
                                    type='checkbox'
                                    id='iva6'
                                    onClick={() => setIva6(iva6 === 1.15 ? 1 : 1.15)}
                                />
                                <Label className='cursor-pointer text-black' htmlFor='iva6'>
                                    {'Incluido IVA'}
                                </Label>

                            </Col>
                            <Col lg='2'>
                                <div className="w-75">
                                    <InputCommon
                                        nameInput={'pvp_5'}
                                        validation={validation}
                                        validationValue={(parseFloat(validation.values.pvp_5) * (iva6)).toFixed(2) || '0.00'}
                                        validationTouched={validation.touched.pvp_5}
                                        validationErrors={validation.errors.pvp_5}
                                        disabled={true}
                                        inputClass={'bg-black text-warning text-end'}

                                    />
                                </div>
                            </Col>
                        </Row>

                    </CardBody>

                    <CardFooter>
                    </CardFooter>
                </Card>
            </Form >
        </>
    )
}

export default InputModalPrices