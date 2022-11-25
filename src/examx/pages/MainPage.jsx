import { Sidebar, Overview, Search } from '../components'
import '../css/main-styles.css'

export const MainPage = () => {
    return (
        <div className='main-container'>
            
            <Sidebar/>

            <Search/>

            <Overview/>

        </div>
    )
}