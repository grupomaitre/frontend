import axios from 'axios';
import React from 'react'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2';
const ButtonSaveExcel = ({ items, isIdSubRubro }) => {
    console.log(isIdSubRubro)
    const save = async () => {
        try {
            const result = await axios.post('api/add-product-excel', {
                items: items,
                idSubRubros: isIdSubRubro
            })
            if (result.data) {
                Swal.fire(
                    {
                        title: result.message,
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    })
            }
        } catch (error) {
            Swal.fire(
                {
                    title: error,
                    icon: 'error',
                    showConfirmButton: true,
                }
            )
        }
    }
    return (
        <Button block color="info" className="btn-label   rounded btn-border mb-2" onClick={() => save()}>
            <i className="mdi mdi-content-save label-icon align-middle fs-16 me-2"></i>
            Guardar
        </Button>
    )
}

export default ButtonSaveExcel