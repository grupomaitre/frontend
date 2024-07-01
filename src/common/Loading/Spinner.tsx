const Spinner = () => {

    return (
        <div className='d-flex align-items-center justify-content-center bg-sistema' style={{ height: '100vh' }}>
            {/* loader animate*/}

            <span>Cargando ....</span>
            <div className='text-rotate'></div>
        </div>
    )
}

export default Spinner