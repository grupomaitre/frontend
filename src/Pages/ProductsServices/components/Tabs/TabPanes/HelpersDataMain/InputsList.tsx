import { Button } from 'reactstrap'
const InputsList = (props: any) => {
    const { opCartegorias, opSubCategorias, setShowModalMarca, showModalMarca, validation, isID, setIsID } = props
 /*    const op = opCartegorias[0]
    const labelValue = op?.label; */
    const itemCol1 = [
        {
            label: 'Grupo',
            col1: 5,
            col2: 7,
            type: 'select',
            options: opCartegorias,
            name: 'grupo',
            id: 'grupo',
            value: 'grupo',
            placeholder: opCartegorias[0]?.label,
            className: 'text-black text-uppercase bg-white',
            cambio: (e: any) => setIsID({ ...isID, id_rubro: e.value }),
            styles: {
                control: (base: any) => ({
                    ...base,
                    height: '30px',
                    minHeight: '30px',
                    borderRadius: 'none',
                    border: 'none',
                    backGround: '#fff'
                }),
            }

        },
        {
            label: 'Sub Grupo',
            col1: 5,
            col2: 7,
            type: 'select',
            options: opSubCategorias,
            name: 'subgrupo',
            id: 'subgrupo',
            value: 'subgrupo',
            placeholder: 'Sub Grupo',
            className: 'text-black text-uppercase',
            cambio: (e: any) => setIsID({ ...isID, id_sub_rubro: e.value }),
            styles: {
                control: (base: any) => ({
                    ...base,
                    height: '30px',
                    minHeight: '30px',
                    borderRadius: 'none',
                    border: 'none',
                }),
            },

        },

        {
            label: 'Codigo Fabrica',
            col1: 5,
            col2: 7,
            type: 'input',
            name: 'cod_fabrica',
            id: 'cod_fabrica',
            value: validation.values.cod_fabrica,
            touched: validation.touched.cod_fabrica,
            errors: validation.errors.cod_fabrica,
            placeholder: 'Codigo Fabrica',
            className: 'border-0 rounded-0',
            cambio: validation.handleChange,
            style: { fontSize: '10px', height: '22px' }
        },
        {
            label: 'Nombre Producto',
            col1: 5,
            col2: 7,
            type: 'input',
            name: 'nombre',
            id: 'nombre',
            value: validation.values.nombre,
            touched: validation.touched.nombre,
            errors: validation.errors.nombre,
            placeholder: 'Nombre Producto',
            className: 'border-0 rounded-0',
            cambio: validation.handleChange,
            style: { fontSize: '10px', height: '22px' }
        },

        {
            label: 'Marca',
            col1: 5,
            col2: 7,
            type: 'select',
            options: [{ value: 'marca1 ', label: 'marca 1' }, { value: 'marca 2', label: 'marca 3' }],
            name: 'marca',
            id: 'marca',
            value: 'marca',
            placeholder: 'Marca',
            className: 'text-black text-uppercase d-flex ',
            cambio: (e: any) => console.log(e),
            divClass: { width: '90%', borderRadius: 'none', display: 'flex' },
            styles: {
                control: (base: any) => ({
                    ...base,
                    height: '30px',
                    minHeight: '30px',
                    borderRadius: 'none',
                    border: 'none'
                }),
            },
            button: <Button
                onClick={() => setShowModalMarca(!showModalMarca)}
                color='primary' className='rounded-0'
                style={{ height: '30px', fontSize: '10px' }}
            >Nuevo</Button>

        }
    ]
    return itemCol1
}

export default InputsList