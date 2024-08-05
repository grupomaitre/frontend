import { FC } from 'react'
import { Input, Card, CardBody, CardHeader } from 'reactstrap'
import DetalleCuentaTotals from './Components/DetalleCuentaTotals'
import NavTarjeta from './Components/NavTarjeta'
import BtnCobrar from './Components/BtnsCobrarCuenta'

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
    setEfectivoTest: any
    //btn cobrar
    disabledCobrar: any
    innerBtnCobrar: any
    efectivoTest: any
    //inputs
    inputEfectivo: any
    inputTarjeta: any
    inputCheque: any
    inputDeposito: any
    setInputEfectivo: any
    inputRefCheque: any
    inputRefTarjeta: any
    inputRefDeposito: any
    formaPago: any
    setFormaPago: any
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
    propina,
    disabledCobrar,
    closeModals,
    innerBtnCobrar,
    efectivoTest,
    //inputs
    inputEfectivo,
    inputTarjeta,
    inputCheque,
    inputDeposito,
    setInputEfectivo,
    inputRefCheque,
    inputRefTarjeta,
    inputRefDeposito,
    formaPago,
    setFormaPago,
}) => {


    return (
        <>
            <Card className='rounded-start-0 '>
                <CardHeader className='page-bg text-white fs-2 text-center  rounded-end-0'>
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
                    <div>
                        <BtnCobrar
                            error={disabledCobrar}
                            closeModals={closeModals}
                            innerBtnCobrar={innerBtnCobrar}
                            efectivoTest={efectivoTest}
                        />
                    </div>
                </CardBody>

            </Card>

        </>
    )
}

export default CompDetails