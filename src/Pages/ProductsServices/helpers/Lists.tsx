import Advanced from "../components/Tabs/TabPanes/Advanced";
import Componentes from "../components/Tabs/TabPanes/Componentes";
import DataMain from "../components/Tabs/TabPanes/DataMain"
import { InterfacesProduct } from "../components/Tabs/TabPanes/Interfaces/InterfacesProduct";
import Preferences from "../components/Tabs/TabPanes/Preferences";
import Prices from "../components/Tabs/TabPanes/Prices"
import Prints from "../components/Tabs/TabPanes/Prints";
interface ObjectTabPane {
    tabId: string;
    componetent: JSX.Element
    setDataSend?: InterfacesProduct
    dataSend?: InterfacesProduct
    isEditProduct?: any
    isIDRubro?: any
    setIsIDRubro?: any
    isID?: any
    setIsID?: any
    setProducts?: any
    listCartegorias?: any
    subRubrosOptions?: any
    fetchDataProduct?: any
    //  componetent: any
}

const Lists = (props: any) => {
    const {
        opSubCategorias,
        setDataSend,
        dataSend,
        isEditProduct,
        validation,
        isIDRubro,
        setIsIDRubro,
        isID,
        setIsID,
        fetchDataProduct,
        showModal,
        setShowModal,
        listCartegorias,
        subRubrosOptions,
    } = props

    const listTabPane: ObjectTabPane[] = [
        {
            tabId: "1",
            componetent:
                <DataMain
                    tabId='1'
                    opSubCategorias={opSubCategorias}
                    setDataSend={setDataSend}
                    dataSend={dataSend}
                    isEditProduct={isEditProduct}
                    validation={validation}
                    isIDRubro={isIDRubro}
                    setIsIDRubro={setIsIDRubro}
                    isID={isID}
                    setIsID={setIsID}
                    listCartegorias={listCartegorias}
                    subRubrosOptions={subRubrosOptions}
                />
        },
        {
            tabId: "2",
            componetent:
                <Prices
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setDataSend={setDataSend}
                    dataSend={dataSend}
                    validation={validation}
                    tabId='2' />
        },
        {
            tabId: "3",
            componetent:
                <Prints
                    tabId='3'
                    setDataSend={setDataSend}
                    dataSend={dataSend}
                    isEditProduct={isEditProduct}
                    validation={validation}
                    fetchDataProduct={fetchDataProduct}

                />
        },
        {
            tabId: "4",
            componetent:
                <Preferences tabId='4'
                    isEditProduct={isEditProduct}
                    fetchDataProduct={fetchDataProduct}
                    validation={validation}
                />
        },
        { tabId: "5", componetent: <Componentes tabId='5' /> },
        { tabId: "6", componetent: <Advanced tabId='6' /> },
    ]
    return listTabPane
}

export default Lists