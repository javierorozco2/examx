import { useCheckAuth } from '../../hooks/useCheckAuth'
import { Sidebar, Overview, Search } from '../components/MainPage'
import '../css/main-styles.css'

export const MainPage = () => {
    
    useCheckAuth() //Actualizar datos de auth y examenes

    return (
        <div className='main-container'>
            
            <Sidebar/>

            <Search/>

            <div className='main-line'/>

            <Overview/>

        </div>
    )
}