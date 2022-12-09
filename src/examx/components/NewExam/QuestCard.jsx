import { BiImageAdd, BiRadioCircle, BiRadioCircleMarked, BiTrash } from "react-icons/bi"
import { AiOutlineClose } from 'react-icons/ai';
import { addNewEmptyAnswer, changeCorrectAnsw, changeRespQuest, changeTitleQuest, deleteQuest, removeAnswer } from "../../../store/examx/examxSlices";
import { useDispatch } from "react-redux";

export const QuestCard = ({secid, id, titleQuest, resp}) => {

    const dispatch = useDispatch()

    // ====CAMBIAR TITULO DE PREGUNTA=====
    const onTitleInputChange = (id, data) => {
        const { value } = data.target
        dispatch(changeTitleQuest({ secid, id, value }))
    }

    // ====CAMBIAR RESPUESTA CORRECTA=====
    const handleCorrectAnsw = (value, questId, respId) => {
        dispatch(changeCorrectAnsw({value, questId, respId, secid}))
    }

    // =========CAMBIAR RESPUESTA========
    const onRespInputChange = (info, respId, questId) => {
        const { value } = info.target
        dispatch(changeRespQuest({ value, respId, questId, secid }))

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

                        <div className="ne-qst-respe animate__animated animate__fadeIn" key={key}>

                            {isCorrect
                                ? <BiRadioCircleMarked
                                    onClick={() => handleCorrectAnsw(isCorrect, id, key)}
                                    className='ne-qst-micon'
                                />
                                : <BiRadioCircle
                                    onClick={() => handleCorrectAnsw(isCorrect, id, key)}
                                    className='ne-qst-micon'
                                />
                            }

                            <input
                                type="text"
                                placeholder='Ingresa una respuesta'
                                value={text}
                                onChange={(data) => onRespInputChange(data, key, id)}
                            />

                            <div className="ne-qst-tools">
                                <button>
                                <BiImageAdd />
                            </button>

                                <button onClick={() => dispatch(removeAnswer({ id, key, secid }))}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* ============AGREGAR NUEVA RESPUESTA============ */}
            <button className='ne-masresp' onClick={() => dispatch(addNewEmptyAnswer({id, secid}))}>+Respuesta</button>
        </div>
    )
}
