import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { AiOutlineClose, AiOutlineLeft } from 'react-icons/ai';
import { BsFillBookmarksFill } from "react-icons/bs"
import { shortName } from '../helpers/shortName';
import { addNewEmptyQuestion, addNewSection, onEditExam, removeSection, setExamActiveEdit, setSectionDesc, setSectionTitle } from '../../store/examx/examxSlices';

import '../css/newexam.css'
import { QuestCard } from '../components/NewExam/QuestCard';
import { SaveExamModal } from '../components/NewExam/SaveExamModal';

// const initialForm = {
//     uid: '',
//     createdAt: '',
//     title: '',
//     isEGEL: false,
//     egelRqst: false,
//     desc: '',
//     isPublished: false,
//     quest: [
//         {
//             titleQuest: '',
//             resp: [
//                 {
//                     text: '',
//                     isCorrect: true
//                 }
//             ]
//         },
//     ]
// }

const initialForm = {
    uid: '',
    createdAt: '',
    title: '',
    isEGEL: false,
    egelRqst: false,
    desc: '',
    isPublished: false,
    sections: [
        {
            title: '',
            desc: '',
            quest: [
                {
                    titleQuest: '',
                    resp: [
                        {
                            text: '',
                            isCorrect: true,
                            images: []
                        }
                    ]
                },
            ]
        }
    ]

}

export const NewExam = () => {

    const [formState, setFormState] = useState(initialForm)
    const [saveModal, setSaveModal] = useState(false)
    const { title, desc, egelRqst } = formState

    const { photoURL, displayName } = useSelector(state => state.auth)
    const { examActiveEdit, isloading } = useSelector(state => state.examx)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const activeModal = () => {

        setSaveModal(true)
        document.body.classList.add('no-scroll');


        // document.querySelector('#activar').addEventListener('click', e => {
        //     // Quitar clase para permitir desplazamiento
        //     document.body.classList.remove('no-scroll');
        // });
    }

    const onInputChange = ({ target }) => {

        const { name, value, checked } = target

        {
            value === 'on'
                ? setFormState({ ...examActiveEdit, [name]: checked })
                : setFormState({ ...examActiveEdit, [name]: value })
        }

    }

    const onHandleTitleSec = (data, id) => {
        const { value } = data.target
        dispatch(setSectionTitle({ value, id }))
    }

    const onHandleDescSec = (data, id) => {
        const { value } = data.target
        dispatch(setSectionDesc({ value, id }))
    }

    useEffect(() => {

        dispatch(setExamActiveEdit(formState))
    }, [formState])

    useEffect(() => {
        dispatch(onEditExam(true))
    }, [])


    return (
        <div className='newexam'>

            {/* =========Navegación========== */}
            <div className='ne-nav'>
                <div className="ne-navprof">
                    <button onClick={() => navigate(-1)}><AiOutlineLeft /></button>
                    <img src={photoURL} alt="" />
                    <p>{shortName(displayName, 13)}</p>
                </div>

                {/* Titulo del examen */}
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

                {/* Boton guardar examen y publicar */}
                <div className="ne-navactions">
                    {/* <button>Guardar</button> <========Deshabilitado temporalmente*/}
                    <button onClick={activeModal}>Publicar</button>
                </div>
            </div>

            {/* ============Body============= */}
            <div className="ne-body">

                {
                    examActiveEdit.sections?.map((info, secid = key) => (
                        <div className="ne-section" key={secid}>

                            <div className='ne-section-contitle'>
                                <input
                                    placeholder='Ingresa un titulo de sección'
                                    className="ne-section-title"
                                    value={info.title}
                                    onChange={(e) => onHandleTitleSec(e, secid)}
                                />
                                <AiOutlineClose onClick={() => dispatch(removeSection(secid))}/>
                            </div>

                            <textarea
                                placeholder="Ingresa una descripción de sección"
                                cols="30"
                                rows="2"
                                name='desc'
                                value={info.desc}
                                onChange={(e) => onHandleDescSec(e, secid)}
                                className="ne-section-desc"
                            />

                            {info.quest?.map((dat, id = key) => (

                                <QuestCard secid={secid} key={id} id={id} {...dat} />

                            ))}

                            <div className="ne-actbuttons">
                                <button onClick={() => dispatch(addNewEmptyQuestion({ secid }))}>+Pregunta cerrada</button>
                                {/* <button>+Pregunta abierta</button> EN CONSTRUCCIÓN */}
                            </div>
                        </div>

                    ))
                }


                <div className="ne-actbuttons ne-actbuttons-sec">
                    <button onClick={() => dispatch(addNewSection())}>+Sección</button>
                    {/* <button>+Pregunta abierta</button> EN CONSTRUCCIÓN */}
                </div>

            </div>


            {
                saveModal && <SaveExamModal
                    setSaveModal={setSaveModal}
                    title={title}
                    onInputChange={onInputChange}
                    desc={desc}
                    egelRqst={egelRqst}
                    isloading={isloading}
                />
            }
        </div>
    )
}
