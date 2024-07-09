import Mesas from '../Extras/Mesas'
import FooterTable from '../Table/FooterTable'
import { InfoMesas } from '../Extras/InfoMesas'
import { useSelector } from 'react-redux'


const Facturacion = () => {

    const orden = useSelector((state: any) => state.cartSlice.orden)
    const mesas = useSelector((state: any) => state.mesaSlice.mesa)

    return (
        <>

            <FooterTable
                orden={orden}

            />
            {mesas && <Mesas mesas={mesas} />}
            <InfoMesas />
        </>
    )
}

export default Facturacion