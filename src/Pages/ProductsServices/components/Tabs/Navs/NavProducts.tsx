import classnames from "classnames"
import { FC } from "react"
import { Nav, NavItem, NavLink } from "reactstrap"
import { itemsTabs } from "../../interfaces/itemsTabs"
interface Props {
    activeTab: string
    setactiveTab: any
}
const NavProducts: FC<Props> = ({ activeTab, setactiveTab, }) => {
    const toggle = (tab: string) => {
        if (activeTab !== tab) setactiveTab(tab)
    }

    return (
        <Nav tabs justified className="fs-12 ">
            {
                (itemsTabs || []).map((item: any) => (
                    <NavItem key={item.id}                    >
                        <NavLink
                            href="#"
                            className={
                                classnames({
                                    active: activeTab === item.id

                                })}
                            onClick={() => {
                                toggle(item.id.toString())
                            }}
                        >
                            {item.name}
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    )
}

export default NavProducts