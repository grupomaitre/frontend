import { useState, useRef, createRef, useEffect } from 'react'
import { Row, Col, Button } from 'reactstrap'
import NumericKeyboard from '../Pos/common/NumericKeyboardProps'
import FormLogin from './Components/FormLogin'
import BtnLogin from './Components/BtnLogin'
import { getInfoTerminal, loginAuth } from './Api/ApiLogin'
import { useNavigate } from 'react-router-dom'
import { getListPrinters, savePrinters } from './Api/ApiPrinters'
import { keyBoards } from '../Pos/common/Keys'
import { useMutation } from 'react-query'
import LogoApp from '../../common/Img/LogoApp'
import logoVertical from '../../assets/images/logos/logo-sistema.png'
interface IrefInput {
    current: HTMLInputElement | null
}
const LoginCover = () => {

    const navigate = useNavigate()
    const [dataSystem, setDataSystem] = useState<any>({
        hostname: '',
        address: ''
    })
    //showKeyBoard
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    // const [impresora, setImpresora] = useState<any>([])
    const [btnDisabled, setbtnDisabled] = useState(true);
    //start keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['', ''])
    const [activeInputIndex, setActiveInputIndex] = useState(0)
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()))
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues]
        newInputValues[activeInputIndex] += value
        setInputValues(newInputValues)
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues]
        newInputValues[activeInputIndex] = ''
        setInputValues(newInputValues)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues]
        newInputValues[index] = event.target.value
        setInputValues(newInputValues)
    }
    const handleInputClick = (index: number) => {
        setActiveInputIndex(index)
    }
    //on focus function
    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index)
    }
    //end keyboard
    const ClearInputKeyBoard = (item: number) => {
        const nuevosValores = [...inputValues];
        nuevosValores[item] = '';
        setInputValues(nuevosValores);
    }
    const handleEnter = () => {
        if (activeInputIndex === 0) {
            inputRefs.current[1].current?.focus()
            return
        }
        if (activeInputIndex === 1) {
            login()
            return
        }
    }


    useEffect(() => {
        inputRefs.current[0].current?.focus()
    }, [])

    const mutation = useMutation(loginAuth);
    const [loading, setLoading] = useState(false);

    const login = async () => {
        try {
            setLoading(true)
            const resLogin: any = await mutation.mutateAsync({
                user: inputValues[0],
                password: inputValues[1],
                maquina: dataSystem.hostname,
            });

            if (resLogin.status) {
                sessionStorage.setItem("authUser", JSON.stringify(resLogin.data));
                navigate('/dashboard');
            } else {
                ClearInputKeyBoard(1);
                inputRefs.current[0].current?.focus();

                setbtnDisabled(true);

            }
            getListPrinters().then(data => {
                // setImpresora(data.data)
                savePrinters(data.data).then(res => {
                    return res
                })
            })
        } catch (error) {
            console.error('Error al realizar el inicio de sesión:');
            // Manejar el error según sea necesario
        } finally {
            setLoading(false); // Cambiar el estado del botón de vuelta a "no cargando"
        }
    };


    useEffect(() => {
        if (inputValues[0] !== '' && inputValues[1] !== '') {
            setbtnDisabled(false)
        } else {
            setbtnDisabled(true)
        }
    }, [inputValues, setbtnDisabled])

    /*   const testApi = async () => {
          const url = JSON.parse(localStorage.getItem('api_url') || '')
          try {
              const res: any = await axios.get(`http://${url}/api/v1/configuracion/test`)
              if (res.status === 'success') {
                  localStorage.setItem('api_fixed', JSON.stringify(true))
  
              }
          } catch (error) {
              console.log(error)
              localStorage.setItem('api_fixed', JSON.stringify(false))
  
          }
      } */


    const configTerminal = async () => {
        const info = await getInfoTerminal()
        if (info) {
            setDataSystem({
                hostname: info.hostname,
                address: ''
            })
            localStorage.setItem('terminal', info.hostname || '')
            //   saveTerminal(info)
        }
    }

    useEffect(() => {
        configTerminal()
    }, [])


    useEffect(() => {
        inputRefs.current[0].current?.focus()
    }, [showKeyBoard])

    return (

        <>
            <div className="d-flex flex-column justify-content-center  align-items-center " style={{ height: '100vh', width: '100%', background: '#f2f2f2' }}>

                <Row className='rounded w-50 p-2'>
                    <Col lg='5' className='text-white shadow-sm border-1  border rounded  d-flex flex-column  jutify-content-center
                                align-items-center bg-white'>
                        <LogoApp
                            urlImg={logoVertical}
                            width='200px'
                            height='100px'
                        />
                        <FormLogin
                            handleInputChange={handleInputChange}
                            handleInputClick={handleInputClick}
                            handleInputFocus={handleInputFocus}
                            inputRefs={inputRefs}
                            inputValues={inputValues}
                            handleEnter={handleEnter}
                        />

                        {loading ?
                            <Button disabled block color='primary' size='lg'
                            >
                                Cargando...
                            </Button> : <BtnLogin
                                inputValues={inputValues}
                                btnDisabled={btnDisabled}
                                setbtnDisabled={setbtnDisabled}
                                login={login}
                            />}
                    </Col>

                    <Col className='d-flex flex-column ' lg='5' >
                        <div className='d-flex'>
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}
                                widthKey='75px'
                            />
                            <div>
                                <Button
                                    block
                                    color='light'
                                    onClick={() => handleEnter()}
                                    className='border'
                                    style={{ height: '294px', marginTop: '4px' }}>
                                    {'Enter'}
                                </Button>

                            </div>
                        </div>
                        <Button
                            block
                            color='light'
                            className='border border-2 shadow-sm'
                            onClick={() => setShowKeyBoard(!showKeyBoard)}

                            style={{ height: '60px' }}>
                            {'Teclado'}
                        </Button>
                    </Col>

                </Row>
                {showKeyBoard && <Row className='rounded mt-3 py-1' style={{ background: '#cecece' }}>
                    <Col>
                        <div className='d-flex justify-content-center'>
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}
                                keyboards={keyBoards}
                                gridTemplateColumns={'10'}
                                widthKey='70px'
                                heightKey='50px'
                                heightBtnDelete='50px'
                            />

                            <Button
                                color='light'
                                onClick={() => handleEnter()}
                                className='mb-1'
                                style={{ width: '100px', marginTop: '4px ' }}>
                                {'Enter'}
                            </Button>
                        </div>
                    </Col>

                </Row>}

            </div>

        </>





    )
}

export default LoginCover