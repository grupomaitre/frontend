
import facturacion from '../../assets/images/macsi/FACTURACION.png'
import Caja from '../../assets/images/macsi/CAJAS.png'
import Estadisticas from '../../assets/images/macsi/ESTADISTICAS.png'
import Productos from '../../assets/images/macsi/PRODUCTOS.png'
import kardex from '../../assets/images/macsi/KARDEX.png'
import asistencia from '../../assets/images/macsi/ASISTENCIA.png'

export const itemsMenuDash = [
    {
        id: 1,
        img: facturacion || '',
        link: "pos",
        name: "Facturación",
    },
    {
        id: 2,
        img: Caja || '',
        link: "cajas",
        name: "Cajas",
    },
    {
        id: 4,
        img: Estadisticas || '',
        link: "estadisticas",
        name: "Estadísticas",
    },
    {
        id: 3,
        img: Productos || '',
        link: "items",
        name: " Productos",
    },


    {
        id: 5,
        img: kardex || '',
        link: "Caja",
        name: "Kardex",
    },
    {
        id: 6,
        img: asistencia || '',
        link: "Caja",
        name: "Asistencia" || '',
    },
    {
        id: 7,
        img: asistencia || '',
        link: "punto/venta",
        name: "Pos" || '',
    },

];