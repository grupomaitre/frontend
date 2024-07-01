export interface InterfacesProduct {
    cod_fabrica: string;
    nombre: string,
    precio: number | any,
    precio_costo: number,
    precio_venta: number,
    pvp_1: number,
    pvp_2: number,
    pvp_3: number,
    cantidad: number,
    cantidad_desgloce: number,
    stock: number,
    stock_minimo: number,
    stock_maximo: number,
    servicio: number,
    iva: number,
    tipo_impuesto: any,
    url_imagen: string,
    estado: boolean,
    editable: boolean,
    editable_precio: boolean,
    editable_nombre: boolean,
    nota: string,
    id_sub_rubro: number,
    id_rubro: number,
    id_bodega: number | null,
    id_marca: number | null,
    id_medida: number | null,
    id_precio: number | null,
    id_sitio_impresora_item: number | null,
}