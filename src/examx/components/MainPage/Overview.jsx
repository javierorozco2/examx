import { BsFillBookmarksFill, BsClock } from "react-icons/bs"
import { BiSave } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { validateMyExam } from "../../helpers/validateMyExam"
import { AiOutlineClose } from "react-icons/ai"
import { clearExamSelected } from "../../../store/examx/examxSlices"

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { startDeletingExam } from "../../../store/examx/thunks"

export const Overview = () => {

    const boolexam = validateMyExam()

    const { myExamSelected } = useSelector(state => state.examx)
    const dispatch = useDispatch()

    // ==========Convetir fecha formato local==============
    const dateString = () => {
        const newDate = new Date(myExamSelected.createdAt)
        return newDate.toLocaleDateString('en-GB')
    }

    // =========Obtener la cantidad de preguntas===========
    const getAmountOfQst = () => {

        let count = 0
        myExamSelected.sections.map(i => {
            i.quest.map(e => {
                count += 1
            })
        })

        return count + (count <= 1 ? ' pregunta' : ' preguntas')
    }

    const onDeleteExam = () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Estas seguro de borrar este examen?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonColor: "#3085d6"
        }).then((result) => {
            if (result.isConfirmed) {

                const process = dispatch(startDeletingExam())

                if (process) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Examen borrado correctamente',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: "#222A34"
                    })
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Ocurrio un error al borrar el examen',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: "#222A34"
                    })
                }
            }
        })

    }


    if (Object.keys(myExamSelected).length === 0) {
        return (
            <div className="main-ovw">
                <div className="ovw-none">
                    <p>Selecciona cualquier examen disponible</p>
                </div>
            </div>
        )
    }

    return (
        <div className={"main-ovw " + (boolexam && 'animate__animated animate__fadeInRight')}>

            {/* -----------------Titulo-------------------- */}
            <div className="ovw-title">
                <div>
                    <BsFillBookmarksFill className="ovw-titleicon-o" />
                    <p>{myExamSelected.title}</p>
                </div>

                {
                    boolexam &&
                    <button className="ovw-xbotton" onClick={() => dispatch(clearExamSelected())}>
                        <AiOutlineClose />
                    </button>
                }

            </div>

            {/*------ fecha de publicación y guardados -----*/}
            <div className="ovw-info">
                <p><BsClock className="ovw-icon" />{dateString()}</p>
                <p><BiSave className="ovw-icon" /> ? </p>
            </div>

            {/*----------- cantidad de preguntas ---------- */}
            <div className="ovw-desc">
                <div>{getAmountOfQst()}</div>
            </div>

            {/* -----------------descripción--------------- */}
            <div className="ovw-desc">
                <div>{myExamSelected.desc}</div>
            </div>

            {/* ----------------Zona de botones guardar-------------- */}
            <div className={"ovw-divbutton " + (!boolexam && "ovw-button-save")}>

                {
                    !boolexam ?
                        <button className="ovw-button">
                            Guardar examen
                        </button>
                        :
                        <>
                            <button className="ovw-button">
                                Editar
                            </button>

                            <button className="ovw-button ovw-button-x" onClick={onDeleteExam}>
                                Eliminar
                            </button>
                        </>
                }


            </div>

        </div>
    )
}
