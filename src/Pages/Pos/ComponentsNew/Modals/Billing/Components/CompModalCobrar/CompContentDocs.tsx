import { useEffect, useState, FC } from 'react'
import { TabContent, TabPane } from 'reactstrap'

import { TabPaneEfectivo } from '../CompoTabsFact/TabPaneEfectivo';

interface ObjectTabPane {
    tabId: string;
    componetent: any
}
interface Props {
    activeTab: string;
    onKeyPress?: (value: string) => void;
    handleDelete?: () => void;
    closeModals: any
}

const CompContentDocs: FC<Props> = ({ activeTab, onKeyPress, handleDelete }) => {
    const [activeTabItem, setactiveTab] = useState<string>("1");

    const listTabPane: ObjectTabPane[] = [
        {
            tabId: "1", componetent:
                <TabPaneEfectivo
                    onKeyPress={onKeyPress}
                    handleDelete={handleDelete}
                />
        },
        { tabId: "2", componetent: null },
        { tabId: "3", componetent: null },

        { tabId: "4", componetent: null },

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