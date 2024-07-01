import { combineReducers } from "redux";
import Prodcuts from './Products/reducer'
import cartSlice from './Cart/cartSlice'
import pointSaleSlice from './PointSale/pointSaleSlice'
import mesaSlice from "./Facturacion/Mesa/mesaSlice";
import cuentaSlice from "./Cart/cuentaSlice";
import cajaSlice from "./Cart/cajaSlice";
import clientesSlice from "./Cart/clientesSlice";
import tecladoSlice from "./Cart/tecladoSlice";
import productSlice from "./Cart/productSlice";
//dashboard
import Cajas from './Facturacion/Caja/reducer'
import ordersSlice from "./Orders/OrdersSlice";
import ModalSlice from "./Cart/ModalSlice";
import cartStatusSlice from "./Cart/cartStatusSlice";
import rubrosSlice from './rubros/reducer'
import descuentoSlice from "./Cart/descuentoSlice";
const rootReducer = combineReducers({
    rubrosSlice: rubrosSlice,
    Prodcuts: Prodcuts,
    cartSlice: cartSlice,
    pointSaleSlice: pointSaleSlice,
    descuentoSlice: descuentoSlice,
    cuentaSlice: cuentaSlice,
    mesaSlice: mesaSlice,
    clientesSlice: clientesSlice,
    cajaSlice: cajaSlice,
    tecladoSlice: tecladoSlice,
    productSlice: productSlice,
    Cajas: Cajas,
    ordersSlice: ordersSlice,
    ModalSlice: ModalSlice,
    cartStatusSlice: cartStatusSlice
});

export default rootReducer;