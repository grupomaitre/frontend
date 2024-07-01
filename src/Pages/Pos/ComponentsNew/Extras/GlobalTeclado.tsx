import { FC, useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import BtnBilling from '../Buttons/BtnBilling'
interface GlobalTecladoProps {
    setInputTeclado?: any
    gFunction?: any
    getMesa?: any
    cart?: any
    orden?: any
    id_mesa?: any
    pax?: any
    btnBillings?: any
}
const GlobalTeclado: FC<GlobalTecladoProps> = ({ setInputTeclado, gFunction, getMesa, btnBillings }) => {


    const handleKeyPress = (key: any) => {
        setInputTeclado((prevValue: any) => prevValue + key)
    };

    const handleDelete = () => {
        setInputTeclado((prevValue: any) => prevValue.slice(0, -1));

    };

    /*   const handleInputChange = (event: any) => {
          setInputTeclado(event.target.value)
      }
   */
    const generalFunction = () => {
        gFunction()
    }
    const teclas = [
        { value: '1', name: '1', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '2', name: '2', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '3', name: '3', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '4', name: '4', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '5', name: '5', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '6', name: '6', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '7', name: '7', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '8', name: '8', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '9', name: '9', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: '0', name: '0', width: '53px', height: '70px', background: '', function: (value: any) => handleKeyPress(value) },
        { value: 'Borrar', name: 'Borrar', width: '110px', height: '70px', background: '#ff1414', function: () => handleDelete() },
    ]
    const [btnEnter, setBtnEnter] = useState('140%')
    useEffect(() => {
        btnBillings && setBtnEnter('67%')
    }, [])
    const style = {
        width: '110%',
    }
    return (
        <div className='d-flex justity-content-center ' style={style}>
            <div className=''>
                {
                    teclas.map((item, key) => (
                        <Button
                            key={key}
                            color='light'
                            className='rounded-1 border'
                            style={{ width: item.width, height: item.height, background: item.background, margin: '2px' }}
                            onClick={() => item.function(item.value)}
                        >
                            <span className='fs-2'>{item.name}</span>
                        </Button>
                    ))
                }

            </div>
            <div className=''>
                <div style={{ height: btnEnter }} className=''>
                    <Button
                        style={{ width: '80%', height: '70%', marginTop: '2px', background: '' }}
                        block
                        className='fs-5 rounded border mb-1 '
                        onClick={() => generalFunction()}
                        color='light'
                    >Enter</Button>
                    {
                        btnBillings && <BtnBilling
                            getMesa={getMesa}
                        />
                    }
                </div>
            </div>
        </div >
    )
}

export default GlobalTeclado