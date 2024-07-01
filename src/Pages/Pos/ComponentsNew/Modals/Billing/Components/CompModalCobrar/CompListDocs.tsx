import { Button } from 'reactstrap'
const CompListDocs = () => {
    return (
        <div>
            <div className='d-flex border py-2 px-2 rounded shadow justify-content-between align-items-center'>
                <h5 className='text-white'>Lista de documentos</h5>
                <Button size='sm' color='light'>
                    <span className='fw-bold'>Agregar Cuenta</span>
                </Button>
            </div>
            <div style={{ height: '70px' }} className='border rounded shadow bg-white my-2'>
                <p className='bg-light text-black fw-semibold p-1'>10503 -N° docum: 18 Total: 3.99 Empresa:Consumidor Final</p>
            </div>
        </div>
    )
}

export default CompListDocs