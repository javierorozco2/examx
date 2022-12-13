import { BsChevronRight } from "react-icons/bs";

export const SidebarSavedExams = ({ savedExams }) => {
    return (
        <div className="animate__animated animate__fadeInLeft">
            <div className="abody-titlediv">
                <p className="abody-title">Examenes asignados</p>
            </div>

            <div className="abody-scroll">
                {
                    savedExams.map(e => (
                        <div className="abody-card" key={e}>
                            <div className="abody-cardinf">
                                <div className="abody-cardled" />
                                <p>{e}</p>
                            </div>

                            <BsChevronRight className="abody-icons" />
                        </div>
                    ))
                }

                {
                    savedExams.length < 1 && (
                        <div className="abody-notfound">
                            No se encontro ningun examen asignado o creado
                        </div>
                    )
                }
            </div>
        </div>
    )
}