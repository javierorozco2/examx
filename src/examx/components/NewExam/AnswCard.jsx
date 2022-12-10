import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { AiOutlineClose } from "react-icons/ai"
import { BiImageAdd, BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi"
import BounceLoader from "react-spinners/BounceLoader"

import { changeCorrectAnsw, changeRespQuest, deleteQstImg, removeAnswer } from "../../../store/examx/examxSlices"
import { startUploadingFiles } from "../../../store/examx/thunks"

export const AnswCard = ({ text, isCorrect, rkey: key, id, secid }) => {

    /** 
     *      secid => id de la seccion
     *         id => id de la pregunta
     *        key => id de la respuesta
     * 
     * */

    const dispatch = useDispatch()
    const imgref = useRef()
    const [imgloader, setImgloader] = useState(false)
    const { examActiveEdit } = useSelector(e => e.examx)

    const questId = id
    const respId = key

    // ====CAMBIAR RESPUESTA CORRECTA=====
    const handleCorrectAnsw = (value, questId, respId) => {
        dispatch(changeCorrectAnsw({ value, questId, respId, secid }))
    }

    // =========CAMBIAR RESPUESTA========
    const onRespInputChange = (info, respId, questId) => {
        const { value } = info.target
        dispatch(changeRespQuest({ value, respId, questId, secid }))

    }

    // =========SUBIDA DE IMAGEN=========
    const onFileInputChange = async ({ target }) => {
        if (target.files === 0) return

        const file = target.files[0]

        setImgloader(true)
        await dispatch(startUploadingFiles({ file, secid, questId, respId }))
        setImgloader(false)

        imgref.current.value = ''
    }

    // =========ELIMINAR IMAGEN=========
    const onDeleteQuestImg = (imgkey) => {
        dispatch( deleteQstImg({secid, questId, respId, imgkey}))
    }

    return (
        <div className="ne-qst-respe animate__animated animate__fadeIn">

            <div className="ne-qst-respe-elements">
                {/* SELECCION DE RESPUESTA CORRETA */}
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

                {/* INPUT DE RESPUESTA */}
                <input
                    type="text"
                    placeholder='Ingresa una respuesta'
                    value={text}
                    onChange={(data) => onRespInputChange(data, key, id)}
                />

                {/* INPUT DE IMAGEN: LA ACCION ES REFERENCIADA */}
                <input
                    type="file"
                    ref={imgref}
                    onChange={onFileInputChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                    disabled={imgloader}
                />

                {/* BOTON AGREGAR IMAGEN - ELIMINAR RESPUESTA */}
                <div className="ne-qst-tools">
                    <button
                        className={' ' + (imgloader && 'addimgdisabled')}
                        disabled={imgloader}
                    >
                        {!imgloader ?
                            <BiImageAdd
                                onClick={() => imgref.current.click()}
                            />
                            : <BounceLoader
                                color="#3A89C9"
                                speedMultiplier={.5}
                                size={15}
                            />
                        }
                    </button>

                    <button onClick={() => dispatch(removeAnswer({ id, key, secid }))}>
                        <AiOutlineClose />
                    </button>
                </div>
            </div>


            <div className="ne-qst-respe-img">

                {
                    examActiveEdit.sections[secid].quest[id].resp[key].images.map((img, imgkey = key) => (
                        <div key={imgkey}>
                            <img src={img} alt="imagen de pregunta"  />
                            <button className="blue-button" onClick={ () => onDeleteQuestImg(imgkey)}>
                                <AiOutlineClose />
                            </button>
                        </div>
                    ))

                }
            </div>

        </div>
    )
}
