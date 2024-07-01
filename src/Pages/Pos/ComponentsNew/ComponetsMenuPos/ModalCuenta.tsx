import React from 'react'
//import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
interface IProps {
    show: boolean,
    onCloseClick: () => void,
    isMesas: Array<any>,
}
/* interface Mesa {
    id_mesa: number;
    position: { x: number; y: number }

} */
const ModalCuenta: React.FC<IProps> = () => {
    /*     const [mesas, setMesas] = useState<Mesa[]>([]);
        const [activeDrags, setActiveDrags] = useState([])
        const [draggableData, setDraggableData] = useState([])
        useEffect(() => {
            GetMesas()
                .then((data: any) => {
                    setMesas(data)
                })
                .catch((error) => {
                    console.error(error)
                    setMesas([])
                })
    
        }, []) */
    /*     const handleDrag = (e: string, data: any, mesa: any) => {
            const updatedMesas = mesas.map((m: any) => {
                if (m.id_mesa === mesa.id_mesa) {
                    return {
                        ...m,
                        position: { x: data.x, y: data.y },
                    };
                }
                return m;
            });
            setMesas(updatedMesas);
        };
        const handleMesaPosition = () => {
            const mesasToUpdate = mesas.map((mesa) => {
                return {
                    id_mesa: mesa.id_mesa,
                    position: mesa.position,
                };
            });
            UpdateMesaPosition(mesasToUpdate)
                .then((data) => {
                    if (data) {
                        Swal.fire({
                            title: 'Guardado',
                            text: 'Se guardo correctamente',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
    
                        })
                        GetMesas()
                        onCloseClick()
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        const nodeRef = useRef(null); */
    return (
        /*  <Modal isOpen={show} toggle={onCloseClick} size='xl' fullscreen={true}>
             <ModalHeader toggle={onCloseClick} >
                 {'Mapa de Mesas'}
             </ModalHeader>
             <ModalBody className='border border-2 border-dark' style={{ maxHeight: '80vh' }}>
                 <div >
                     {(mesas || []).map((mesa: any) => (
                         <Draggable
                             key={mesa.id_mesa}
                             handle=".handle"
                             defaultPosition={mesa.position}
                             onDrag={(e: any, data) => handleDrag(e, data, mesa)}
                             nodeRef={nodeRef}
                         >
                             <div ref={nodeRef} className={"handle  rounded text-white  mx-1 p-2 m-5 d-flex flex-column align-items-center " + (mesa.status ? 'bg-success' : 'bg-black')} style={{ width: '100px' }}>
                                 <i className='mdi mdi-table-furniture fs-2'></i>
                                 <span className={"mx-1 my-1 " + (mesa.status ? 'bg-success' : 'btn-light')}>{mesa.nombre_mesa}</span>
                             </div>
                         </Draggable>
                     ))}
                 </div>
 
             </ModalBody>
             <ModalFooter>
                 <Button
                     onClick={() => { handleMesaPosition() }}
                     block size='lg' color='primary' className={"btn-label  rounded btn-border "}>
                     <i className="mdi mdi-content-save  label-icon align-middle fs-3 me-2"></i>
                     {'Guardar'}
                 </Button>
                 <Button block color='light' onClick={onCloseClick}>
                     Cerrar
                 </Button>
             </ModalFooter>
         </Modal> */
        <div>
            asd
        </div>
    )
}


export default ModalCuenta