export interface IInputForm {
    label: string
    name: string
    type: string
    value: string
    onChange: (e: any) => void
}
export interface IInputFormPrices {
    id_product: number
    pCosto: number
    free: number
    precio: any
    pvp4_1: number
    pvp4_2: number
    promo1: number
    promo2: number
    comision: number
    iva: number
    servicio: number
}

export const inputFormPrices: IInputForm[] = [
    {
        label: 'P. Costo',
        name: 'precio_costo',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: 'FREE',
        name: 'free',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: 'P.V.P',
        name: 'precio_venta',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: 'P.V.P 4',
        name: 'pvp_1',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: 'P.V.P 4',
        name: 'pvp_2',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: 'PROMO 1',
        name: 'promo1',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: 'PROMO 2',
        name: 'promo2',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },
    {
        label: '% Comision',
        name: 'comision',
        type: 'text',
        value: '',
        onChange: (e: any) => console.log(e.target.value)
    },


]
