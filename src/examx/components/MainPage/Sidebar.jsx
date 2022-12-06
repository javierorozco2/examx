import { FiLogOut } from "react-icons/fi";
import { BiEdit, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarMyExams, SidebarSavedExams } from "./";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../store/auth/thunks";
import { shortName } from "../../helpers/shortName";


export const Sidebar = () => {

    const dispatch = useDispatch()
    const { displayName, photoURL } = useSelector( s => s.auth  )
    const [isSandwich, setIsSandwich] = useState(false)

    
    const [savedExams, setSavedExams] = useState(['EGEL IS 2022', 'Examen SO']) //Variable temporal
    const [myExams, setMyExams] = useState(['EGEL IS 2022', 'Examen SO','s','sa']) //Variable temporal
    const [ModalMyExams, setModalMyExams] = useState(false)
    
    const onLogout = () => {
        dispatch(startLogout())
    }

    const handleSandwichButton = () => {
        setIsSandwich(!isSandwich)   
    }
    return (
        <div className="main-sb">

            {/* Account options */}
            <div className="aheader">
                
                <div className="aheader-account">
                    <button className="sandwichbutton" onClick={handleSandwichButton}>
                        <BiMenu />
                    </button>
                    <img src={photoURL} alt="" />
                    <p>{shortName(displayName, 15)}</p>
                </div>

                <div className="aheader-opt">
                    <button onClick={ () => setModalMyExams(true) } className="buttonnone">
                        <BiEdit className={"aheader-icons " + (ModalMyExams && "aheader-iconsactive")} />
                    </button>

                    <button onClick={onLogout} className='buttonnone'>
                        <Link to='/auth/login' className="aheader-linkicons">
                            <FiLogOut className="aheader-icons" />
                        </Link>
                    </button>
                </div>
                
            </div>

            {/* Body aside */}

            <div className={"abody " + (!isSandwich && 'asidevisible')}>
                {
                    ModalMyExams ? 
                    <SidebarMyExams myExams={myExams} setModalMyExams={setModalMyExams}/> :
                    <SidebarSavedExams savedExams={savedExams}/>

                }
            </div>

        </div>
    )
}
