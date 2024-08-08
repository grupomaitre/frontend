import { FC } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from "classnames";
interface IProps {
    justifyPillsTab: string
    justifyPillsToggle: (params: string) => void
}
const NavsConfig: FC<IProps> = ({
    justifyPillsTab,
    justifyPillsToggle
}) => {

    const itemsTabs = [
        { id: "1", name: "Facturación" },
        { id: "2", name: "Pos" },
        { id: "3", name: "Punto de venta" },
        { id: "4", name: "Facturación Electrónica" },
        { id: "5", name: "Cajas" },
    ]

    return (

        <Nav tabs className="nav-justified mb-3 fs-12 fw-bold">
            {
                (itemsTabs || []).map((item: any) => (
                    <NavItem key={item.id}>
                        <NavLink 
                            style={{ cursor: "pointer" }}
                            className={classnames({ active: justifyPillsTab === item.id, })}
                            onClick={() => { justifyPillsToggle(item.id.toString()); }} >
                            {item.name}
                        </NavLink>
                    </NavItem>
                ))
            }

        </Nav>
    )
}

export default NavsConfig