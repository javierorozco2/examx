import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { setErrorMsj, setuid } from '../../../store/examx/examxSlices';
import { publishExam } from '../../../store/examx/thunks';
import { ErrorModal } from '../../../ui/ErrorModal'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const SaveExamModal = ({ setSaveModal, title, onInputChange, desc, egelRqst, isloading }) => {

    const dispatch = useDispatch()
    const { uid } = useSelector(state => state.auth)
    const { errorMsj, examActiveEdit } = useSelector(state => state.examx)

    const navigate = useNavigate()

    const [isError, setIsError] = useState(false)

    const desactiveModal = () => {
        setSaveModal(false)
        document.body.classList.remove('no-scroll');
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const date = new Date().getTime()

        if (examActiveEdit.title === '' || examActiveEdit.desc === '') {
            dispatch(setErrorMsj("Ingresa el titulo o la descripción"))
            setIsError(true)
            return
        }

        dispatch(setuid({ uid, date }))
        dispatch(publishExam())
        Swal.fire({
            icon: 'success',
            title: 'Examen guardado correctamente',
            confirmButtonText: 'Ok',
            confirmButtonColor: "#222A34"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/')
            } 
        })
    }

    return (
        <div className="ne-sm animate__animated animate__fadeIn">

            <ErrorModal
                errorMsj={errorMsj}
                active={isError}
                setActive={setIsError}
            />

            <div className="ne-sm-container">
                <div className="ne-sm-title">
                    <h2>PUBLICAR EXAMEN</h2>
                    <button onClick={desactiveModal}>
                        <AiOutlineClose />
                    </button>
                </div>

                <form onSubmit={(e) => onSubmit(e)} className='ne-sm-form'>
                    <p>Ingresa los siguientes datos para publicar</p>

                    <input
                        type="text"
                        placeholder="titulo"
                        value={title}
                        name='title'
                        onChange={onInputChange}
                    />

                    <textarea
                        placeholder="Descripción"
                        cols="30"
                        rows="5"
                        name='desc'
                        value={desc}
                        onChange={onInputChange}
                    />

                    {/* <p>Asignar a algun usuario:</p>
                    <input type="text" placeholder="Ingresa el correo del usuario" /> */}
                    {/* <div className='ne-sm-alumnlist'> =========>PENDIENTE
                        {
                            [1,2,3,4,5].map( (e, key) => (
                                <div className="ne-sm-alelement" key={key} >
                                    correo{e}@ucol.mx
                                </div>
                            ))
                        }
                    </div> */}

                    <div className="ne-sm-checkbox">
                        <input
                            type="checkbox"
                            id="toegel"
                            checked={egelRqst}
                            name='egelRqst'
                            onChange={onInputChange}
                        />
                        <label htmlFor="toegel">Aplicar como Examen General de Egreso (EGEL)</label>
                    </div>

                    {
                        isloading
                            ? <button disabled className='ne-sm-inputdisable' type="submit">
                                <BeatLoader color="#888" size={5} speedMultiplier={.5} />
                            </button>
                            : <button className='ne-sm-input' type="submit">Publicar</button>
                    }

                </form>

            </div>

        </div>
    )
}
