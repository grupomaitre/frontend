import axios from "axios";

export const fetchSaveCuenta = async (
    nombre_mesa: string,
    tipo_mesa: string,
    id_tipo_cuenta: number,
    piso: string,
    ubicacion: string,
    imagen: string
) => {
    const data = {
        nombre_mesa,
        tipo_mesa,
        id_tipo_cuenta,
        piso,
        ubicacion,
        imagen
    }
    try {
        const res: any = await axios.post("api/add-mesa", data)
        if (res.status === 'success') {
            return res.data
        }
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}
