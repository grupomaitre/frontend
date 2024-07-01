import classnames from "classnames"
import { FC } from "react"
import { Nav, NavItem, NavLink } from "reactstrap"
interface Props {
    activeTab: string
    setactiveTab: any
    itemsTabs: any[]
}
const UseNavTabs: FC<Props> = ({ activeTab, setactiveTab, itemsTabs }) => {
    const toggle = (tab: string) => {
        if (activeTab !== tab) setactiveTab(tab)
    }

    return (
        <Nav tabs className="nav-tabs fs-12 text-black bg-white ">
            {
                (itemsTabs || []).map((item: any) => (
                    <NavItem key={item.id}                    >
                        <NavLink
                            href="#"
                            className={
                                classnames({
                                    active: activeTab === item.id,
                                    'bg-app text-light  border rounded-end': activeTab === item.id,


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

export default UseNavTabs