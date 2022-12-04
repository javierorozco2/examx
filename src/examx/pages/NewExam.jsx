import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineLeft } from 'react-icons/ai';
import { BsFillBookmarksFill } from "react-icons/bs"
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi"
import '../css/newexam.css'
import { shortName } from '../helpers/shortName';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addNewEmptyQuestion, changeRespQuest, changeTitleQuest, setExamActiveEdit } from '../../store/examx/examxSlices';

const initialForm = {
    title: '',
    quest: [
        {
            id: 0,
            titleQuest: '',
            resp: [
                {
                    text: '5',
                    isCorrect: false
                },
                {
                    text: '4',
                    isCorrect: false
                }
            ]
        },
        {
            id: 1,
            titleQuest: '',
            resp: [
                {
                    text: '2',
                    isCorrect: true
                }
            ]
        },
    ]
}

export const NewExam = () => {

    const [formState, setFormState] = useState(initialForm)
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
        dispatch( changeRespQuest({value, respId, questId}))
        
    }

    const onTitleInputChange = (id, data) => {
        const { value } = data.target

        dispatch(changeTitleQuest({ id, value }))
    }

    const onAddQuestion = (id) => {
        dispatch( addNewEmptyQuestion(id) )
    }

    const previousPage = () => {
        navigate(-1)
    }

    useEffect(() => {
        dispatch(setExamActiveEdit(formState))
    }, [formState])


    return (
        <div className='newexam'>

            {/* =========Navegación========== */}
            <div className='ne-nav'>
                <div className="ne-navprof">
                    <button onClick={previousPage}><AiOutlineLeft /></button>
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
                    <button>Guardar</button>
                    <button>Publicar</button>
                </div>
            </div>

            {/* ============Body============= */}
            <div className="ne-body">

                {examActiveEdit.quest?.map(({ id, titleQuest, resp }) => (

                    <div className="ne-qst" key={id}>
                        <div className="ne-qst-title">
                            <div className="ne-qst-number">{id + 1}</div>
                            <input
                                type="text"
                                placeholder='Ingresa una pregunta'
                                value={titleQuest}
                                onChange={(data) => onTitleInputChange(id, data)}
                            />
                        </div>

                        <div className="ne-qst-resp">

                            {
                                resp.map(({ text, isCorrect }, key) => (

                                    <div className="ne-qst-respe" key={key}>

                                        {   isCorrect 
                                            ? <BiRadioCircleMarked className='ne-qst-micon' />
                                            : <BiRadioCircle className='ne-qst-micon' />
                                        }
                                        <input 
                                            type="text"
                                            placeholder='Ingresa una respuesta'
                                            value={text}
                                            onChange = { (data) => onRespInputChange( data, key, id)}
                                        />
                                    </div>
                                ))
                            }

                        </div>

                        <button className='ne-masresp' onClick={ () => onAddQuestion(id) }>+Respuesta</button>
                    </div>
                ))}

                <div className="ne-actbuttons">
                    <button>+Pregunta abierta</button>
                    <button>+Pregunta cerrada</button>
                </div>
            </div>
        </div>
    )
}
