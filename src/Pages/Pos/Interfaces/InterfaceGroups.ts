//products

export interface IProducts {
    id_product: number,
    nombre: string,
    iva: number,
    servicio: number,
    precio: number,
    total_iva: number,
    tota_servicio: number,
    total: number,
    cantidad: number,
    url_imagen: string | null,
    status: boolean | number,
    id_sub_rubro: number,
    id_bodega: number | null,
    editable: number | boolean
    editable_nombre: number | boolean
    editable_precio: number | boolean
    preferencias: any

}

//sub groups
export interface ISubGroups {
    id_sub_rubro: number,
    code: null,
    name_sub_rubro: string,
    url_imagen: string | null,
    status: boolean | number,
    id_rubro: number,
    created_at: null | Date,
    updated_at: null | Date,
    products: IProducts[],
    grupo?: any
}
//groups
export interface IGroups {
    id_rubro: number,
    name_rubro: string,
    type_rubro: null,
    status: boolean,
    id_tipo_rubro: number,
    sub_rubros: ISubGroups[],
    cantidad: number,
    descuento: number,
    grupo?: any

}
