import { FC } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import DetalleCaja from '../DetalleCaja'
import CajaInformacion from '../TabContent/CajaInformacion'
import HistorialCaja from '../TabContent/HistorialCaja'
interface Props {
    activeTab: string
    data: any
    openModal: () => void
    ontabs: string
    setOntabs: any
}
const TabContentCaja: FC<Props> = ({ activeTab, openModal, setOntabs }) => {

    const TabPaneItems = [
        { tabId: "3", componetent: <HistorialCaja /> },
        {
            tabId: "2", componetent: < DetalleCaja setOntabs={setOntabs} />
        },
        { tabId: "1", componetent: <CajaInformacion openModal={openModal} /> },
    ]
    return (
        <>
            <TabContent
                activeTab={activeTab}
                className="text-muted"
            >
                {TabPaneItems.map((items, key) => (
                    <TabPane tabId={items.tabId} key={key}>
                        {items.componetent}
                    </TabPane>
                ))}

            </TabContent>
        </>
    )
}

export default TabContentCaja