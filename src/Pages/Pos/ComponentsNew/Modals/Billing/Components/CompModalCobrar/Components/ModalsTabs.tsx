import { FC } from 'react'
import ModalCheque from '../../Modals/ModalCheque'
import ModalTarjeta from '../../Modals/ModalTarjeta'
import ModalDeposito from '../../Modals/ModalDeposito'

interface Props {
    showCheque: boolean
    setShowCheque: (value: boolean) => void
    showTarjeta: boolean
    setShowTarjeta: (value: boolean) => void
    showDeposito: boolean
    setShowDeposito: (value: boolean) => void
    total2: number
    //valores de los inputs sum total
    setInputChequeTab: (value: number) => void
    setInputTarjeta: (value: number) => void
    setInputDeposito: (value: number) => void
    inputDeposito: number
    inputCheque: number
    inputTarjeta: number
    setInputValues: (value: Array<number | string>) => void
    testVuelto: any
}
const ModalsTabs: FC<Props> = ({
    showCheque,
    setShowCheque,
    showTarjeta,
    setShowTarjeta,
    showDeposito,
    setShowDeposito,
    total2,
    setInputChequeTab,
    setInputTarjeta,
    setInputDeposito,
    testVuelto,

}) => {
    return (
        <>
            {
                showCheque &&
                <ModalCheque

                    show={showCheque}
                    onCloseClick={() => setShowCheque(false)}
                    total={total2}
                    testVuelto={testVuelto}
                    setInputChequeTab={setInputChequeTab}
                />
            }
            {
                showTarjeta &&
                <ModalTarjeta
                    show={showTarjeta}
                    onCloseClick={() => setShowTarjeta(!showTarjeta)}
                    total={total2}
                    testVuelto={testVuelto}
                    setInputTarjeta={setInputTarjeta}
                />
            }
            {
                showDeposito &&
                <ModalDeposito
                    setInputDeposito={setInputDeposito}
                    show={showDeposito}
                    onCloseClick={() => setShowDeposito(false)}
                    total={total2}
                    testVuelto={testVuelto}
                />
            }
        </>

    )
}

export default ModalsTabs