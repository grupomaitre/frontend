import axios from "axios"
import { FC, useState } from "react"
import { Eye } from "react-feather"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Row } from "reactstrap"
import { saveConfigTerminal } from "../../Api/Config/Terminales/ApiTerminales"
interface IProps {
    setConexion?: any
}

const FormDataBase: FC<IProps> = ({ setConexion }) => {
    const [maquina, setMaquina] = useState('')
    const [hostname, setHostName] = useState('')
    const [port, setPort,] = useState('')
    const [text, setText] = useState('')
    const navigate = useNavigate()

    const handleTestApi = async () => {
        //  const terminal = (localStorage.getItem('terminal') || '')
        const api_url = `${hostname}:${port}`
        localStorage.setItem('api_url', api_url)
        localStorage.setItem('terminal', maquina)
        try {
            const res: any = await axios.get(`http://${api_url}/api/v1/configuracion/test`)
            console.log(res)
            if (res.status === 'success') {
                setText(res.status)
                localStorage.setItem('api_fixed', JSON.stringify(true))
                navigate('/login')
                /*   const data = {
                      api_url,
                      maquina: terminal,
                  }
                  const save = await saveConfigTerminal(data)
                  console.log(save) */
            }
        } catch (e: any) {
            navigate('/configuracion')
            setText('Error de Coneción')
            localStorage.setItem('api_fixed', JSON.stringify(false))
            localStorage.removeItem('api_url')
            localStorage.removeItem('terminal')


        }
    }
    return (

        <div className="d-flex align-items-center justify-content-center flex-column " style={{ height: '100vh', width: '100vw', background: '#ecf0f1' }}>

            <Card>
                {text && <div className={'bg-danger mb-3 text-center'}>
                    <Label className='text-white fs-5 fw-bold'>{text || ''}</Label>
                </div>}
                <CardHeader className='page-bg text-white'>

                    Configuración Terminal
                </CardHeader>
                <CardBody>
                    <Row className="mb-2">
                        <Col lg=''>
                            <Label>Nombre Maquina</Label>
                        </Col>
                        <Col>
                            <Input bsSize="sm" onChange={(e) => setMaquina(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className='mb-2 '>
                        <Col lg=''>
                            <Label className=''>Host Name</Label>
                        </Col>
                        <Col lg=''>
                            <Input
                                bsSize='sm'
                                onChange={(e) => setHostName(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>

                        <Col lg=''>
                            <Label>Port</Label>
                        </Col>
                        <Col lg=''>
                            <Input
                                onChange={(e) => setPort(e.target.value)}
                                placeholder=''
                                bsSize='sm' />
                        </Col>
                    </Row>

                </CardBody>
                <CardFooter>
                    <div className='d-flex gap-3 justify-content-between'>
                        <Button
                            block
                            className="page-bg"
                            onClick={() => handleTestApi()}

                        >Conectar</Button>
                        <Button block color='danger'>Cancelar</Button>
                    </div>
                </CardFooter>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default FormDataBase