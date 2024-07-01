export interface IModalMudarItem {
    show: boolean
    onCloseClick: () => void
}
export interface Item {
    cantidad: number
    id_cart: number
    id_product: number
    isCartSuccess: boolean
    nombre: string
    precio: number
    status: boolean
}
export interface ItemCart {
    nombre: string;
    cantidad: number;
}
export interface ICart {
    cartSlice: {
        cart: ItemCart[];
        mesacart: string;
        idCart: number;
        pax: any;
        orden: any;
        idMesa: number;
    };
    cuentaSlice: {
        cartNew: ItemCart[];
    };
}
export interface IrefInput {
    current: HTMLInputElement | null
}