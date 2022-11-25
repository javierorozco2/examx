import { FiLogOut } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <div className="main-sb">

            {/* Account options */}
            <div className="aheader">
                
                <div className="aheader-account">
                    <img src="/public/logo.png" alt="" />
                    <p>Javier Orozco</p>
                </div>

                <div className="aheader-opt">

                    <BiEdit className="aheader-icons" />
                    <Link to='/auth/login' className="aheader-linkicons">
                        <FiLogOut className="aheader-icons" />
                    </Link>

                </div>
            </div>

            {/* Body aside */}

            {
                ['A', 'V'].map(e => (
                    <div key={e}>
                        <label />
                        <p>{e}</p>
                    </div>
                ))
            }

        </div>
    )
}
