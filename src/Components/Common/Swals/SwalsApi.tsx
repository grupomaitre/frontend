import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
export const SwalSuccess = (props: any) => {
    const { icon, title, timer, showConfirmButton } = props
    return (
        Swal.fire({
            icon: icon || 'success',
            title: title || 'Guardado',
            timer: timer || 2000,
            showConfirmButton: showConfirmButton || false
        })
    )
}
export const SwalError = (props: any) => {
    const { title, text } = props
    return (
        Swal.fire({
/*             icon: icon || 'error',
 */            title: title || 'Oops...',
            text: text || 'Algo salio mal!',
            confirmButtonText: 'Aceptar',

        })
    )
}
export const SwalInfo = (props: any) => {
    const { icon, title } = props
    return (
        Swal.fire({
            icon: icon || 'info',
            title: title || 'Oops...',
            confirmButtonText: 'Ok',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        })
    )
}
export const toastSuccess = (props: any) => {
    const { message } = props
    return (
        toast.success(message, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            className: 'bg-success text-white'
        })
    )
}
export const toastError = (props: any) => {
    const { message } = props
    return (
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            className: 'bg-danger text-white'
        })
    )
}
