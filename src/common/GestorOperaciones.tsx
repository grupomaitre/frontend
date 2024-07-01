import { FC } from 'react'
import { Button } from 'reactstrap'
interface IProps {
    handleBack?: any
    handleAdd?: any
    clean?: any
    isEdit?: boolean
}
const GestorOperaciones: FC<IProps> = ({ handleBack, handleAdd, clean, isEdit }) => {
    return (
        <div className='d-flex gap-2 '>
            <Button color="dark" size='sm' className="custom-toggle" onClick={() => handleBack()}>
                <span className="icon-on fs-13"><i className=" ri-arrow-go-back-fill align-bottom me-1"></i> Atras</span>
            </Button>

            <Button color="success" size='sm' className="custom-toggle" onClick={() => handleAdd()}>
                <span className="icon-on fs-13"><i className="  ri-add-line align-bottom me-1"></i> Nuevo</span>
            </Button>

            <Button color="secondary" size='sm' type="submit" className="custom-toggle"
            >
                <span className="icon-on fs-13">
                    <i className="  ri-save-line align-bottom me-1"></i>
                    {!!isEdit ? "Editar" : "Guardar"}
                </span>
            </Button>

            <Button color="danger" size='sm' className="custom-toggle" onClick={() => clean()}>
                <span className="icon-on fs-13"><i className="ri-delete-bin-line align-bottom me-1"></i> Eliminar</span>
            </Button>

            <Button color="warning" size='sm' className="custom-toggle">
                <span className="icon-on fs-13"><i className="ri-search-line align-bottom me-1"></i> Buscar</span>
            </Button>

        </div>
    )
}

export default GestorOperaciones