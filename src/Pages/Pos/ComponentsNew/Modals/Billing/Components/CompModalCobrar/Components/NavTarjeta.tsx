import { FC, useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { BookOpen, CreditCard, DollarSign, Repeat } from 'react-feather'
import InputKeyBoard from '../../../../../Cards/CardOrders/InputKeyBoard'
import { IPropNav, ObjectNavItem } from '../interface/IPropsNavs'

const NavTarjeta: FC<IPropNav> = ({
    inputDeposito,
    inputCheque,
    inputTarjeta,
    totalCart,
    activeTabItem,
    setactiveTab,
    setInputValues,
    inputRefs,
    setInputEfectivo,
    inputEfectivo,
    inputRefCheque,
    inputRefTarjeta,
    inputRefDeposito,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    setFormaPago,
    handleKeydown,

}) => {
    const [showCheque, setShowCheque] = useState<boolean>(false)
    const [disabledEfec, setDisabled] = useState(false)

    useEffect(() => {
        if (inputEfectivo === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [inputEfectivo])

    const TabNavItem: ObjectNavItem[] = [
        {
            value: '1',
            inputName: "efectivo",
            label: 'EFECTIVO',
            function: () => {
                inputRefs.current[0].current?.focus()
                inputRefs.current[0].current?.select()

            },
            valueInput: inputEfectivo,
            onChangeinput: (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseFloat(e.target.value)
                setInputEfectivo(value)
            },
            clear: () => {
                setInputValues(['', inputCheque, inputTarjeta, inputDeposito])
                inputRefs.current[0].current?.focus()
                inputRefs.current[0].current?.select()
                setactiveTab('1')

            },
            readonly: true,
            icon: <DollarSign size={15} className='me-1' />,
            ref: inputRefs.current[0],
            disabled: disabledEfec
        },
        {
            value: '3',
            inputName: "TARJETA",
            label: 'TARJETA',
            valueInput: inputTarjeta,
            readonly: true,
            // function: () => setShowTarjeta(true),
            icon: <CreditCard size={15} className='me-1' />,
            ref: inputRefTarjeta,
            disabled: true
        },
        {
            value: '2',
            inputName: "cheque",
            label: 'CHEQUE',
            valueInput: inputCheque,//(inputCheque).toFixed(2),
            readonly: true,
            function: showCheque ? () => setShowCheque(false) : () => setShowCheque(true),
            icon: <BookOpen size={15} className='me-1' />,
            ref: inputRefCheque,
            disabled: true
        },

        {
            value: '4',
            inputName: "deposito",
            label: 'Transferencia Deposito',
            valueInput: inputDeposito,
            readonly: true,
            //  function: () => setShowDeposito(true),
            icon: <Repeat size={15} className='me-1' />,
            ref: inputRefDeposito,
            disabled: true
        }
    ]

    const toggle = (tab: string) => {
        if (tab === '1') {
            setInputValues([inputEfectivo, inputCheque, inputTarjeta, inputDeposito])
            // setShowCheque(false)
            //  setShowTarjeta(false)
            //setShowDeposito(false)
            setactiveTab('1')
            setDisabled(false)
            setFormaPago('Efectivo')
            inputRefs.current[0].current?.focus()
            inputRefs.current[0].current?.select()
            localStorage.setItem('forma_pago', 'Efectivo' || '')
            return
        }
        if (tab === '2') {
            setShowCheque(true)
            setInputValues([0, totalCart || 0, inputTarjeta, inputDeposito])
            setFormaPago('Cheque')
            setactiveTab('2')


        }
        if (tab === '3') {
            //    setShowTarjeta(true)
            setInputValues([0, inputCheque, inputTarjeta, inputDeposito])
            setFormaPago('Tarjeta')
            setactiveTab('3')
            return
        }
        if (tab === '4') {
            setInputValues([0, inputCheque, inputTarjeta, totalCart || 0])
            setFormaPago('Despósito')
            setactiveTab('4')

            return
        }

        if (activeTabItem !== tab) {
            //item.function()
            setactiveTab(tab)
        }

    }


    return (
        <>

            <div style={{ maxHeight: "195px", overflowY: 'scroll', scrollMargin: '20px', maxWidth: '100%' }} className="simplebar-track-warning m-0 p-0 ">
                {TabNavItem.map((item, key: number) => (
                    <div key={key} className='d-flex flex-row justify-content-rounded '>
                        <Button
                            className='mb-1'
                            style={{
                                background: '#ff3012',
                                width: '60%',
                                fontSize: '0.8rem',
                                cursor: "pointer", textAlign: 'center', color: '#fff', borderRadius: '5px', height: '45px'
                            }}


                            onClick={() => { toggle(item.value) }} >
                            {item.icon && item.icon}
                            {item.label}
                        </Button>

                        <div className=" d-flex flex-row ms-2">
                            <InputKeyBoard
                                inputRef={item.ref}
                                value={item.valueInput}
                                onChange={(event) => handleInputChange(event, key)}
                                handleInputClick={() => handleInputClick(key)}
                                handleKeydown={handleKeydown}
                                classInput='text-center  fs-15 '
                                styleInput={{ height: '42px' }}
                                type='number'
                                handleInputFocus={() => handleInputFocus(key)}
                                bsSize='sm'
                                disabled={item.disabled}
                            />

                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default NavTarjeta