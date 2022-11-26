import { FiLogOut } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarMyExams, SidebarSavedExams } from "./";


export const Sidebar = () => {

    const [savedExams, setSavedExams] = useState(['EGEL IS 2022', 'Examen SO']) //Variable temporal
    const [myExams, setMyExams] = useState(['EGEL IS 2022', 'Examen SO','s','sa']) //Variable temporal
    const [ModalMyExams, setModalMyExams] = useState(false)

    return (
        <div className="main-sb">

            {/* Account options */}
            <div className="aheader">
                
                <div className="aheader-account">
                    <img src="/public/logo.png" alt="" />
                    <p>Javier Orozco</p>
                </div>

                <div className="aheader-opt">
                    <button onClick={ () => setModalMyExams(true) } className="buttonnone">
                        <BiEdit className={"aheader-icons " + (ModalMyExams && "aheader-iconsactive")} />
                    </button>
                    <Link to='/auth/login' className="aheader-linkicons">
                        <FiLogOut className="aheader-icons" />
                    </Link>
                </div>
                
            </div>

            {/* Body aside */}

            <div className="abody">
                {
                    ModalMyExams ? 
                    <SidebarMyExams myExams={myExams} setModalMyExams={setModalMyExams}/> :
                    <SidebarSavedExams savedExams={savedExams}/>

                }
            </div>

        </div>
    )
}
