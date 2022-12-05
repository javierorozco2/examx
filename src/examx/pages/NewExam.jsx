import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { AiOutlineLeft, AiOutlineClose } from 'react-icons/ai';
import { BsFillBookmarksFill } from "react-icons/bs"
import { BiRadioCircle, BiRadioCircleMarked, BiTrash } from "react-icons/bi"
import { shortName } from '../helpers/shortName';
import { addNewEmptyAnswer, addNewEmptyQuestion, changeCorrectAnsw, changeRespQuest, changeTitleQuest, deleteQuest, removeAnswer, setExamActiveEdit } from '../../store/examx/examxSlices';

import '../css/newexam.css'

const initialForm = {
    title: '',
    quest: [
        {
            titleQuest: '',
            resp: [
                {
                    text: '',
                    isCorrect: true
                }
            ]
        },
    ]
}

export const NewExam = () => {

    const [formState, setFormState] = useState(initialForm)
    const [saveModal, setSaveModal] = useState(false)
    const { title } = formState

    const { photoURL, displayName } = useSelector(state => state.auth)
    const { examActiveEdit } = useSelector(state => state.examx)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({ ...examActiveEdit, [name]: value })
    }

    const onRespInputChange = (info, respId, questId) => {
        const { value } = info.target
        dispatch(changeRespQuest({ value, respId, questId }))

    }

    const onTitleInputChange = (id, data) => {
        const { value } = data.target
        dispatch(changeTitleQuest({ id, value }))
    }

    const handleCorrectAnsw = (value, questId, respId) => {
        dispatch(changeCorrectAnsw({value, questId, respId}))
    }

    useEffect(() => {
        dispatch(setExamActiveEdit(formState))
    }, [formState])

    return (
        <div className='newexam'>

            {/* =========Navegación========== */}
            <div className='ne-nav'>
                <div className="ne-navprof">
                    <button onClick={ () => navigate(-1)}><AiOutlineLeft /></button>
                    <img src={photoURL} alt="" />
                    <p>{shortName(displayName, 13)}</p>
                </div>

                <div className="ne-navtitle">
                    <BsFillBookmarksFill className='ne-titleicon' />
                    <input
                        type="text"
                        placeholder='Ingresa un titulo'
                        value={title}
                        name='title'
                        onChange={onInputChange}
                    />
                </div>

                <div className="ne-navactions">
                    <button onClick={() => setSaveModal(true)}>Guardar</button>
                    <button>Publicar</button>
                </div>
            </div>

            {/* ============Body============= */}
            <div className="ne-body">

                {/* {examActiveEdit.quest?.map(({ titleQuest, resp }, key ) => ( */}
                {examActiveEdit.quest?.map(({ titleQuest, resp }, id = key) => (

                    <div className="ne-qst animate__animated animate__fadeIn" key={id}>
                        <div className="ne-qst-title">
                            <div className="ne-qst-number">{id + 1}</div>
                            <input
                                type="text"
                                placeholder='Ingresa una pregunta'
                                value={titleQuest}
                                onChange={(data) => onTitleInputChange(id, data)}
                            />
                            <div className="ne-qst-delete">
                                <button onClick={() => dispatch(deleteQuest(id))}>
                                    <BiTrash />
                                </button>
                            </div>
                        </div>

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
                                            {/* <button>
                                                <BiImageAdd />
                                            </button> */}

                                            <button onClick={ () => dispatch(removeAnswer({id, key}))}>
                                                <AiOutlineClose/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        <button className='ne-masresp' onClick={() => dispatch(addNewEmptyAnswer(id))}>+Respuesta</button>
                    </div>
                ))}

                <div className="ne-actbuttons">
                    <button onClick={ () => dispatch(addNewEmptyQuestion())}>+Pregunta cerrada</button>
                    {/* <button>+Pregunta abierta</button> EN CONSTRUCCIÓN */}
                </div>
            </div>
        </div>
    )
}
