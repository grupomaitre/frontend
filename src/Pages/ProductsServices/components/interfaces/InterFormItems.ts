export interface MyFormValues {
    code: string
    producto: string
    price: string
    cantidad: string
}
export interface IFormItemsServicios {
    isEdit: boolean | undefined,
    onHandleCancelar: () => void,
    caregorias: { label: string, value: string }[],
    isCategoria: string,
    handleChangeCategoria: (e: any) => void,
    opSubCategorias: { label: string, value: string }[],
    opBodegas: { label: string, value: string }[],
}
export interface INewItem {
    bodegas: string
    cantidad: number | string
    categoria?: string
    category: string
    code: string
    id_sub_rubro: number | undefined
    imagen?: string
    price: number | string
    producto: string
    status: boolean
    subCategory: string | undefined
    url_imagen?: string | undefined | null
    selectedImage?: File | null | undefined
}
export interface ISubCategoria {
    label: string
    value: number
}