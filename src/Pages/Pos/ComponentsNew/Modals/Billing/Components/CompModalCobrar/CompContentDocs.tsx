import { useEffect, useState, FC } from 'react'
import { TabContent, TabPane } from 'reactstrap'

import { TabPaneEfectivo } from '../CompoTabsFact/TabPaneEfectivo';
import ModalTarjeta from '../Modals/ModalTarjeta';
import ModalCheque from '../Modals/ModalCheque';
import ModalDeposito from '../Modals/ModalDeposito';

interface ObjectTabPane {
    tabId: string;
    componetent: any
}
interface Props {
    activeTab: string;
    onKeyPress?: (value: string) => void;
    handleDelete?: () => void;
    closeModals: any
    testVuelto: any
    totalCart: any
    setPropina: any
    //inputs 
    setInputTarjeta: any
    setInputChequeTab: any
    setInputDeposito: any
}

const CompContentDocs: FC<Props> = ({
    activeTab,
    onKeyPress,
    handleDelete,
    totalCart,
    testVuelto,
    setPropina,
    setInputTarjeta,
    setInputChequeTab,
    setInputDeposito,
}) => {
    const [activeTabItem, setactiveTab] = useState<string>("2");

    const listTabPane: ObjectTabPane[] = [
        {
            tabId: "1", componetent:
                <TabPaneEfectivo
                    onKeyPress={onKeyPress}
                    handleDelete={handleDelete}
                />
        },
        {
            tabId: "2", componetent:
                <>
                    <ModalCheque
                        setInputChequeTab={setInputChequeTab}
                        testVuelto={testVuelto}
                        total={totalCart}
                    />
                </>
        },
        {
            tabId: "3", componetent:
                <>
                    <>
                        <ModalTarjeta
                            testVuelto={testVuelto}
                            total={totalCart}
                            setPropina={setPropina}
                            setInputTarjeta={setInputTarjeta}

                        />
                    </>
                </>
        },

        {
            tabId: "4", componetent:
                <>
                    <ModalDeposito
                        setInputDeposito={setInputDeposito}
                        testVuelto={testVuelto}
                        total={totalCart}
                    />
                </>

        },

    ]
    useEffect(() => {
        setactiveTab(activeTab)
    }, [activeTab])
    return (

        <TabContent activeTab={activeTabItem}>
            {listTabPane.map((item, key) => (
                <TabPane key={key} tabId={item.tabId}>
                    {item.componetent}
                </TabPane>))}
        </TabContent>
    )
}

export default CompContentDocs