import { FC } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import FacturacionConfig from '../Content/FacturacionConfig'
import MaitreConfig from '../Content/MaitreConfig'
import PointSaleConfig from '../Content/PointSaleConfig'
import FacturacionElectronica from '../Content/FacturacionElectronica'
import CajaConfig from '../Content/CajaConfig'
interface IProps {
    justifyPillsTab: string
    setDataForm: any
}
const ItemsContentConfig: FC<IProps> = ({ justifyPillsTab, setDataForm }) => {

    const listTabPane: any = [
        { tabId: "1", componetent: <FacturacionConfig tabId='1' /> },
        { tabId: "2", componetent: <MaitreConfig tabId='2' /> },
        { tabId: "3", componetent: <PointSaleConfig tabId='3' /> },
        { tabId: "4", componetent: <FacturacionElectronica tabId='4' setDataForm={setDataForm} /> },
        { tabId: "5", componetent: <CajaConfig tabId='5' /> },
    ]



    return (
        <TabContent activeTab={justifyPillsTab} className='fs-11'>

            {listTabPane.map((item: any, key: number) => (

                <TabPane
                    key={key}
                    tabId={item.tabId}
                >

                    {item.componetent}

                </TabPane>))}

        </TabContent>

    )
}

export default ItemsContentConfig