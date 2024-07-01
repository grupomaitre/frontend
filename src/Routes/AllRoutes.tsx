
import { lazy } from "react"
import LoginCover from "../Pages/Auth/LoginCover"
import Dashboard from "../Pages/Dashboard/Dashboard"
import Estadisticas from "../Pages/Estadisticas/Estadisticas"
import Bills from "../Pages/Bills/Bills"
//const PosNew = lazy(() => import("../Pages/Pos/PosNew"))
import PosNew from "../Pages/Pos/PosNew"
import PuntoVenta from '../Pages/PointSale'
import Printers from "../Pages/Maintenance/Printers/Printers"
import ConfigTerminal from "../Pages/Config/ConfigTerminal"
import ConfigConnect from "../Pages/Config/ConfigConnect"
const Caja = lazy(() => import("../Pages/Caja/Caja"))
const Items = lazy(() => import("../Pages/ProductsServices/ItemsServicios"))
const publicRoutes = [
    {
        path: '/',
        component: ConfigTerminal
    },
    {
        path: '/configuracion',
        component: ConfigConnect

    },
    {
        path: '/login',
        component: LoginCover
    },
    {
        path: '/pos',
        component: PosNew
    },
    {
        path: 'punto/venta',
        component: PuntoVenta
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/cajas',
        component: Caja
    },
    {
        path: '/items',
        component: Items
    },
    {
        path: '/estadisticas',
        component: Estadisticas

    },
    {
        path: '/comprobantes',
        component: Bills

    },
    {
        path: '/printers',
        component: Printers

    }
]

export { publicRoutes }