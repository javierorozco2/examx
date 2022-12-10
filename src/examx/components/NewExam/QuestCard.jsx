import { BiTrash } from "react-icons/bi"
import { addNewEmptyAnswer, changeTitleQuest, deleteQuest } from "../../../store/examx/examxSlices";
import { useDispatch } from "react-redux";
import { AnswCard } from "./AnswCard";

export const QuestCard = ({secid, id, titleQuest, resp}) => {

    const dispatch = useDispatch()

    // ====CAMBIAR TITULO DE PREGUNTA=====
    const onTitleInputChange = (id, data) => {
        const { value } = data.target
        dispatch(changeTitleQuest({ secid, id, value }))
    }

    return (
        <div className="ne-qst animate__animated animate__fadeIn" key={id}>

            {/* =========TITULO / PREGUNTA========= */}
            <div className="ne-qst-title">
                <div className="ne-qst-number">{id + 1}</div>
                <input
                    type="text"
                    placeholder='Ingresa una pregunta'
                    value={titleQuest}
                    onChange={(data) => onTitleInputChange(id, data)}
                />
                <div className="ne-qst-delete">
                    <button onClick={() => dispatch(deleteQuest({id, secid}))}>
                        <BiTrash />
                    </button>
                </div>
            </div>

            {/* =============RESPUESTAS============== */}
            <div className="ne-qst-resp">
                {
                    resp.map(({ text, isCorrect }, key) => (
                        
                        <AnswCard 
                            text={text}
                            isCorrect={isCorrect}
                            key={key}
                            rkey = {key}
                            id={id}
                            secid={secid}
                        />

                    ))
                }
            </div>

            {/* ============AGREGAR NUEVA RESPUESTA============ */}
            <button className='ne-masresp' onClick={() => dispatch(addNewEmptyAnswer({id, secid}))}>+Respuesta</button>
        </div>
    )
}
