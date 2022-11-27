import { BsFillBookmarksFill, BsClock } from "react-icons/bs"
import { BiSave } from "react-icons/bi"

export const Overview = () => {
    return (
        <div className="main-ovw">

            {/* -----------------Titulo-------------------- */}
            <div className="ovw-title">
                <BsFillBookmarksFill className="ovw-titleicon-o"/>
                <p>EGEL IS 2022</p>
            </div>

            {/*------ fecha de publicación y guardados -----*/}
            <div className="ovw-info">
                <p><BsClock className="ovw-icon"/> 24/11/2022</p>
                <p><BiSave className="ovw-icon"/> 165</p>
            </div>

            {/*----------- cantidad de preguntas ---------- */}
            <div className="ovw-desc">
                <div>24 preguntas</div>
            </div>

            {/* -----------------descripción--------------- */}
            <div className="ovw-desc">
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis illo distinctio officia voluptatum ab placeat sequi assumenda obcaecati, mollitia similique repudiandae nam sit harum doloribus nostrum quod iusto accusamus explicabo.</div>
            </div>

            {/* ----------------boton guardar-------------- */}
            <button className="ovw-button">
                Guardar examen
            </button>

        </div>
    )
}
