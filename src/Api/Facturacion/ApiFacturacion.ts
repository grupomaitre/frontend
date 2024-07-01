import axios, { AxiosPromise } from "axios"
import { toastError } from "../../Components/Common/Swals/SwalsApi";

/* export const imprimirComprobante = async ({ idfactura, id_empresa, idsucursal, opcion }: any) => {
    try {
        const url = '/api/docelectronico-impresion'
        let routeUrl = url.resolve({
            path: "api/docelectronico-impresion",
            query: {
                idfactura: idfactura,
                idempresa: id_empresa,
                idsucursal: idsucursal,
                tipodoc: opcion,
            },
        });
        window.open(routeUrl.href, "_blank");

    } catch (e) {
        toastError({ message: e })
    }
} */
export const imprimirComprobante = async (id_empresa: any) => {

    try {
        const url = '/api/docelectronico-impresion';


        const response = await axios.get(url, { params: { id_empresa: id_empresa } });

        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        window.open(fileUrl, "_blank");
    } catch (e) {
        toastError({ message: 'Error al generar el comprobante' });
    }
};