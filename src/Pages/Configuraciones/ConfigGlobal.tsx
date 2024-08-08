import Header from '../../Layouts/Header';
import TabConfig from './Components/TabsConfig/TabConfig';

const ConfigGlobal = () => {

    return (
        <div className=''>
            <Header link="/dashboard" handleSalir={() => console.log('first')} />

            <TabConfig />
        </div>
    )
}

export default ConfigGlobal