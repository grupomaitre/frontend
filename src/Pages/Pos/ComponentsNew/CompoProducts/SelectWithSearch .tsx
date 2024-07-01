import { FC, useEffect, useState } from 'react';
import Select from 'react-select'
import { Input } from 'reactstrap';
interface IProps {
    options: any
}
const SelectWithSearch: FC<IProps> = ({ options }) => {

    const [selectOp, setSelectOp] = useState([])
    useEffect(() => {
        setSelectOp(options.map((item: any) => ({
            cantidad: item.cantidad,
            descuento: item.descuento,
            id_bodega: item.id_bodega,
            id_product: item.id_product,
            id_sub_rubro: item.id_sub_rubro,
            iva: item.iva,
            nombre: item.nombre,
            precio: item.precio,
            precio_final: item.precio_final,
            servicio: item.servicio,
            status: item.status,
            tipo_impuesto: item.tipo_impuesto,
            tota_servicio: item.tota_servicio,
            total: item.total,
            total_iva: item.total_iva,
            url_imagen: item.url_imagen,
            value: item.id_product,
            label: item.id_product
        })))
    }, [])

    return (
        <>
            {/*   <input
                type="text"
                placeholder="Buscar en el select"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            /> */}
            <Select
                options={selectOp}
                isSearchable={false}
                placeholder='buscar'
                defaultInputValue='none'
                onChange={(e) => console.log(e)}
                onKeyDown={(e) => e.key === "Enter" ? console.log('this enter') : null}
                components={{

                    Input: () => <Input placeholder='asdas001 custom-input' />,
                    Menu: () => <div className='bg-danger'>Menu</div>
                }}
            />
        </>
    );
};
export default SelectWithSearch