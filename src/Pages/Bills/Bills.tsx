import Header from '../../Layouts/Header'
import { Container } from 'reactstrap'
import FilterComp from './Components/FilterComp'
import GlobalTable from '../Pos/ComponentsNew/Modals/Billing/Components/CompoTabsFact/GlobalTablea'

const Bills = () => {
    return (
        <div className=' bg-app'>
            <Container className=''>
                <Header link='/dashboard' />
                <FilterComp />
                <GlobalTable
                    columns={[]}
                    data={[]}
                />
            </Container>
        </div>
    )
}

export default Bills