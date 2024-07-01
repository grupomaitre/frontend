import { FC } from 'react'
import Facturados from './Facturados';
import FilterProducts from './FilterProducts';
import Componente3 from './Componente3';
interface IProps {
    valueSelect: number
}
const ComponenteEjemplo: FC<IProps> = ({ valueSelect }) => {

    switch (valueSelect) {
        case 1:
            return <Facturados />;
        case 2:
            return <FilterProducts />;
        case 3:
            return <Componente3 />;

        default:
            console.log('Opción no reconocida');
            return null;
    }

    return (
        <div>ComponenteEjemplo</div>
    )
}

export default ComponenteEjemplo