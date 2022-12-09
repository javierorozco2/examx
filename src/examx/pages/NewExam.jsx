import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { AiOutlineLeft } from 'react-icons/ai';
import { BsFillBookmarksFill } from "react-icons/bs"
import { shortName } from '../helpers/shortName';
import { addNewEmptyQuestion, onEditExam, setExamActiveEdit } from '../../store/examx/examxSlices';

import '../css/newexam.css'
import { QuestCard } from '../components/NewExam/QuestCard';
import { SaveExamModal } from '../components/NewExam/SaveExamModal';

const initialForm = {
    uid: '',
    createdAt: '',
    title: '',
    isEGEL: false,
    egelRqst: false,
    desc: '',
    isPublished: false,
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
    const { title, desc, egelRqst} = formState

    const { photoURL, displayName } = useSelector(state => state.auth)
    const { examActiveEdit, isloading } = useSelector(state => state.examx)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const activeModal = () =>{

        setSaveModal(true)
        document.body.classList.add('no-scroll');

        
        // document.querySelector('#activar').addEventListener('click', e => {
        //     // Quitar clase para permitir desplazamiento
        //     document.body.classList.remove('no-scroll');
        // });
    }

    const onInputChange = ({ target }) => {
        
        const { name, value, checked } = target

        {   value === 'on' 
            ? setFormState({ ...examActiveEdit, [name]: checked })
            : setFormState({ ...examActiveEdit, [name]: value }) 
        }
        
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
                    <button onClick={ () => navigate(-1)}><AiOutlineLeft /></button>
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
                    <button  onClick={activeModal}>Publicar</button>
                </div>
            </div>

            {/* ============Body============= */}
            <div className="ne-body">
                
                {examActiveEdit.quest?.map((dat, id = key) => (

                    <QuestCard key={id} id={id} { ...dat }/>

                ))}

                <div className="ne-actbuttons">
                    <button onClick={ () => dispatch(addNewEmptyQuestion())}>+Pregunta cerrada</button>
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
