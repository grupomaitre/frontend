import classnames from "classnames";
import { FC, useEffect, useState } from "react";

import { Card, CardBody, Container, Nav, NavItem, NavLink, TabContent } from 'reactstrap'
import TabContentCaja from "./TabContentCaja";
interface Props {
    data: any
    openModal: () => void
    ontabs: string
    setOntabs: any
    informacion: boolean,
    detalle: boolean,
    historial: boolean
}
const TabneCaja: FC<Props> = ({ data, openModal, ontabs, informacion, detalle, historial, setOntabs }) => {

    const [justifyTab, setjustifyTab] = useState(ontabs);
    const justifyToggle = (tab: string) => {
        if (justifyTab !== tab) {
            setjustifyTab(tab);
        }
    }
    const Tabne = [
        { id: 3, name: "HISTORIAL", status: historial },
        { id: 2, name: "DETALLE", status: detalle },
        { id: 1, name: "INFORMACIÓN", status: informacion },
    ]
    useEffect(() => {
        setjustifyTab(ontabs)
    }, [ontabs])
    return (
        <Container fluid className="mt-2">
            <Card className="">
                <CardBody >

                    <Nav tabs className="  mb-3 ">
                        {Tabne.map((tab) => (
                            <NavItem key={tab.id}>
                                <NavLink
                                    disabled={tab.status}
                                    href="#"
                                    className={'fs-11 ' + classnames({
                                        active: justifyTab === tab.id.toString(),
                                    })}
                                    onClick={() => {
                                        justifyToggle(tab.id.toString());
                                    }}
                                >
                                    <span className="text-blue fs-12">
                                        {tab.name}
                                    </span>
                                </NavLink>
                            </NavItem>
                        ))}

                    </Nav>

                    <TabContent activeTab={justifyTab} style={{ background: '#f8f9fa' }}>
                        <TabContentCaja
                            ontabs={ontabs}
                            setOntabs={setOntabs}
                            activeTab={justifyTab}
                            data={data || []}
                            openModal={openModal}

                        />


                    </TabContent>
                </CardBody>
            </Card>
        </Container>
    )
}

export default TabneCaja