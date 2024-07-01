import { useState } from 'react'
import { Maximize, Minimize } from 'react-feather'
import { Button, Col, Row } from 'reactstrap'

const MenuTool = () => {
    const [fullScreen, setFull] = useState(false)
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            console.log('entro full')
            setFull(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                console.log('salio full')
                setFull(false)
            }
        }
    }
    return (
        <Row className='bg-white m-0 py-1'>
            <Col lg='12' className=''>
                <Button color='light' size='sm' className=' px-1 p-0 border-0 rounded-0'>Herramientas </Button>
                <Button color='light' size='sm' className=' px-1 p-0 border-0 rounded-0'> Activar </Button>
                <Button color='light' size='sm' className=' px-1 p-0 border-0 rounded-0'>Más Opciones</Button>

                <Button size='sm' className=' px-1 p-0 border-0 rounded-0' onClick={toggleFullscreen}>

                    {fullScreen ? <> <Minimize size={15} />  Desactivar Pantalla Completa </>
                        : <> <Maximize size={15} />  Activar Pantalla Completa  </>}
                </Button>

            </Col>
        </Row>
    )
}

export default MenuTool