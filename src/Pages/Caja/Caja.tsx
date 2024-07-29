import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import {
    getCajasList as onGetCajasList,
    addNewCajas as onAddNewCajas,
} from "../../slices/thunks"
import TabneCaja from './Components/Tabs/TabneCaja'
import ModalCrudCaja from "./Components/Modals/ModalCrudCaja";
import DeleteModal from "../../Components/Common/DeleteModal";
import Header from "../../Layouts/Header";
const Caja = () => {
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')

    const navigate = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)
    //   const [isEdit, setEdit] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [ontabs, setOntabs] = useState('1')
    // const dispatch = useDispatch()
    const dispatch = useDispatch<any>();

    // const cajaObj = useSelector((state: any) => state.cajaSlice.cajaObj)
    //tabs status
    const [informacion, setInformacion] = useState(false)
    const [detalle, setDetalle] = useState(false)
    //const [historial, setHistorial] = useState(false)



    const openModal = () => {
        setIsShowModal(true)
    }


    const saveCaja = () => {
        if (idCajaLocal > 0) {
            dispatch(onAddNewCajas())
                .then(() => {
                    navigate('/dashboard')
                    dispatch(onGetCajasList());
                    setIsShowModal(false)
                    setOntabs('2')
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }
    useEffect(() => {
        if (idCajaLocal > 0) {
            setOntabs('2')
            setInformacion(true)
        } else {
            setOntabs('1')
            setInformacion(false)
            setDetalle(true)
        }
    }, [idCajaLocal])
    const handleSalir = () => {
        navigate('/dashboard')

    }
    return (
        <div className="bg-gray">
            <Header
                link='/dashboard'
                handleSalir={handleSalir}
            />

            {isShowModal &&
                <ModalCrudCaja
                    show={isShowModal}
                    onCloseClick={() => setIsShowModal(false)}
                    saveCaja={saveCaja}
                />}
            {isModalDelete && <DeleteModal
                show={isModalDelete}
                onCloseClick={() => setIsModalDelete(false)}
            />}

            <TabneCaja
                ontabs={ontabs}
                data={idCajaLocal}
                openModal={openModal}
                informacion={informacion}
                detalle={detalle}
                historial={false}
                setOntabs={setOntabs}
            />
        </div>
    );
};

export default Caja
