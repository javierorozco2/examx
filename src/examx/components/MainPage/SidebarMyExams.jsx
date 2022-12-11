import { BsChevronRight } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

export const SidebarMyExams = ({ myExams, setModalMyExams }) => {

    const navigateExam = () => {        
    }
    return (
        <div className="animate__animated animate__fadeInLeft">

            <div className="abody-titlediv">
                <p className="abody-title">Mis examenes</p>
                <button className="buttonnone" onClick={ () => setModalMyExams(false)}>
                    <AiOutlineClose className="aheader-icons"/>
                </button>
            </div>

            {
                myExams.map( (exam, key) => (
                    <div className="abody-card" key={key} onClick={navigateExam}>
                        <div className="abody-cardinf" >
                            <div className="abody-cardled" />
                            <p>{exam.title}</p>
                        </div>

                        <BsChevronRight className="abody-icons" />
                    </div>
                ))
            }

            {
                myExams.length < 1 && (
                    <div className="abody-notfound">
                        No se encontro ningun examen creado
                    </div>
                )
            }

            <Link className="abody-newexam" to='/newexam'>Crear nuevo examen</Link>
        </div>
    )
}
