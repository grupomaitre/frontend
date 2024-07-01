import { FC, useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from "classnames"
import { ObjectNavItem } from '../../interface/IPropsNavs'
import { BookOpen, CreditCard, Repeat } from 'react-feather'
interface IProp {
    activeTabItem: string
    setactiveTab: (value: string) => void
}
const NavFacturacion: FC<IProp> = () => {
    const [activeTab, setActiveTab] = useState("1");
    const toggleTab = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const TabNavItem: ObjectNavItem[] = [
        /*         {
                    value: '1',
                    label: 'Efectivo',
                    readonly: true,
                    icon: <DollarSign size={15} className='me-1' color='#124a22' />,
                    disabled: false
                }, */
        {
            value: '2',
            inputName: "cheque",
            label: 'Cheque',
            icon: <BookOpen size={15} className='me-1' color='#a04f00' />,
            disabled: true
        },
        {
            value: '3',
            label: 'Tarjeta',
            readonly: true,
            icon: <CreditCard size={15} className='me-1' color='#ffe21a' />,
            disabled: true
        },
        {
            value: '4',
            label: 'Deposito',
            readonly: true,
            icon: <Repeat size={15} className='me-1' color='#1d99e4' />,
            disabled: true
        },
        {
            value: '5',
            label: 'Retención',
            readonly: true,
            icon: <Repeat size={15} className='me-1' color='#1d99e4' />,
            disabled: true
        },
        {
            value: '6',
            label: 'X Cobrar',
            readonly: true,
            icon: <Repeat size={15} className='me-1' color='#1d99e4' />,
            disabled: true
        },

    ]

    return (
        <Nav
            pills tabs
        >
            {TabNavItem.map((item: any, key: number) => (
                <NavItem key={key} className=''>
                    <NavLink style={{
                        cursor: "pointer",
                        textAlign: 'start',
                        color: 'black',
                        background: '#fff',
                        borderRadius: '1px',
                    }}
                        className={` fs-11  ${classnames({
                            active: activeTab === item.value,
                            'border border-danger  bg-white text-black': activeTab === item.value,
                        })}`}

                        onClick={() => { toggleTab(item.value) }} >
                        {item.icon && item.icon}
                        {item.label}
                    </NavLink>

                </NavItem>))}
        </Nav>
    )
}

export default NavFacturacion