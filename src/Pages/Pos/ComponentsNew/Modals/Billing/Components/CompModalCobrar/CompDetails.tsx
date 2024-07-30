import React, { useState, useEffect, FC } from 'react'
import { Input, Card, CardBody, CardHeader } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import DetalleCuentaTotals from './Components/DetalleCuentaTotals'
import NavTarjeta from './Components/NavTarjeta'
import { setValueEfectivo } from '../../../../../../../slices/Orders/OrdersSlice'

interface ComponenteProps {
    closeModals: () => void
    activeTabItem: string
    setactiveTab: (tab: string) => void
    show?: boolean
    inputValues: Array<number | string>
    setInputValues: any
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
    inputRefs?: any
    totalCart: number
    setDisabledCobrar: any
    documento: any
    razon_social: any
    n_factura: any
    handleKeydown: () => void
    setTestVuelto: any
    testVuelto: any
    setPropina: any
    propina: any

}
const CompDetails: FC<ComponenteProps> = ({
    activeTabItem,
    setactiveTab,
    inputValues,
    setInputValues,
    inputRefs,
    handleInputChange,
    handleInputClick,
    handleKeydown,
    handleInputFocus,
    totalCart,
    setDisabledCobrar,
    setTestVuelto,
    testVuelto,
    setPropina,
    propina
}) => {
    // const dispatch = useDispatch()

    const cart = useSelector((state: any) => state.cartSlice.cart)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)

    const dispatch = useDispatch()

    //inputs 
    const [inputEfectivo, setInputEfectivo] = useState<number>(0)
    const [inputCheque, setInputChequeTab] = useState<number>(0)
    const [inputTarjeta, setInputTarjeta] = useState<number>(0)
    const [inputDeposito, setInputDeposito] = useState<number>(0)
    //inputs ref
    const inputRefCheque = React.useRef<HTMLInputElement>(null)
    const inputRefTarjeta = React.useRef<HTMLInputElement>(null)
    const inputRefDeposito = React.useRef<HTMLInputElement>(null)
    //label api forma pago set
    const [formaPago, setFormaPago] = useState('')
    //info cart

    useEffect(() => {
        setInputEfectivo(parseFloat(inputValues[0].toString()) || 0)

    }, [inputValues[0]])

    useEffect(() => {
        setInputChequeTab(parseFloat(inputValues[1].toString()) || 0)
    }, [inputValues[1]])

    useEffect(() => {
        setInputTarjeta(parseFloat(inputValues[2].toString()) || 0)
    }, [inputValues[2]])

    useEffect(() => {
        setInputDeposito(parseFloat(inputValues[3].toString()) || 0)
    }, [inputValues[3]],)

    useEffect(() => {
        setactiveTab('1')
        inputRefs.current[0].current?.focus()
        localStorage.setItem('forma_pago', 'Efectivo' || '')
        setFormaPago('Efectivo')
        dispatch(setValueEfectivo(inputEfectivo))

        setTimeout(() => {
            inputRefs.current[0].current?.select()
        }, 100)
    }, [idCart, totalCart, cart])

    return (
        <>
            <Card className='border-primary rounded-end-0 border-end-0 '>
                <CardHeader className='page-bg text-white fs-2 text-center  rounded-start-0'>
                    Total:  {totalCart && totalCart}
                </CardHeader>
                <CardBody className='bg-white' >

                    <NavTarjeta
                        inputDeposito={inputDeposito}
                        inputCheque={inputCheque}
                        inputTarjeta={inputTarjeta}
                        activeTabItem={activeTabItem}
                        totalCart={totalCart}
                        handleInputChange={handleInputChange}
                        handleInputClick={handleInputClick}
                        handleInputFocus={handleInputFocus}
                        handleKeydown={handleKeydown}
                        inputEfectivo={inputEfectivo}
                        inputRefCheque={inputRefCheque}
                        inputRefDeposito={inputRefDeposito}
                        inputRefTarjeta={inputRefTarjeta}
                        inputRefs={inputRefs}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                        setactiveTab={setactiveTab}
                        setInputEfectivo={setInputEfectivo}
                        setInputChequeTab={setInputChequeTab}
                        setInputDeposito={setInputDeposito}
                        setInputTarjeta={setInputTarjeta}
                        //label api forma pago
                        formaPago={formaPago}
                        setFormaPago={setFormaPago}
                        //testVuelto
                        testVuelto={testVuelto}
                        setPropina={setPropina}
                    />
                    <div className='my-1 '>

                        <Input type='textarea' placeholder='Obs'
                            style={{ height: '54px', maxHeight: '54px' }}
                        />

                    </div>
                    <div className=''>
                        <DetalleCuentaTotals
                            total2={totalCart}
                            inputEfectivo={inputEfectivo}
                            inputCheque={inputCheque}
                            inputTarjeta={inputTarjeta}
                            inputDeposito={inputDeposito}
                            setDisabledCobrar={setDisabledCobrar}
                            setTestVuelto={setTestVuelto}
                            propina={propina}
                        />
                    </div>

                </CardBody>

            </Card>

        </>
    )
}

export default CompDetails