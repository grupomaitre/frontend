import { Spinner } from 'reactstrap'

const CargeSpinner = () => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            {/* loader animate*/}

            <span>Cargando  </span>
            <Spinner size="sm"
                type="grow" />
            <Spinner size="sm"
                type="grow" />
            <Spinner size="sm"
                type="grow" />
            {/* <div className='text-rotate'></div> */}
        </div>
    )
}

export default CargeSpinner