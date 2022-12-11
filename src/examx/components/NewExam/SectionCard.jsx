import { useState } from "react"
import { useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiImageAdd, BiTrash } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { addNewEmptyQuestion, removeDescImg, removeSection, setSectionDesc, setSectionTitle } from "../../../store/examx/examxSlices"
import { addDescImg } from "../../../store/examx/thunks"
import { QuestCard } from "./QuestCard"
import BounceLoader from "react-spinners/BounceLoader"


export const SectionCard = ({ info, secid }) => {

    const imgref = useRef()
    const [imgloader, setImgloader] = useState(false)
    const dispatch = useDispatch()

    // =============CAMBIAR TITULO DE SECCION============
    const onHandleTitleSec = (data, id) => {
        const { value } = data.target
        dispatch(setSectionTitle({ value, id }))
    }

    // ============CAMBIAR DESCRIPCION DE SECCION===========
    const onHandleDescSec = (data, id) => {
        const { value } = data.target
        dispatch(setSectionDesc({ value, id }))
    }

    // =========SUBIDA DE IMAGEN=========
    const onFileInputChange = async ({ img, secid }) => {

        if (img.target.files === 0) return

        const file = img.target.files[0]

        setImgloader(true)
        await dispatch(addDescImg({ file, secid }))
        setImgloader(false)

        imgref.current.value = ''
    }

    return (
        <div className="ne-section">

            <div className='ne-section-contitle'>
                <input
                    placeholder='Ingresa un titulo de sección'
                    className="ne-section-title"
                    value={info.title}
                    onChange={(e) => onHandleTitleSec(e, secid)}
                />
                <AiOutlineClose onClick={() => dispatch(removeSection(secid))} />
            </div>

            <div className='ne-section-divdesc'>
                <textarea
                    placeholder="Ingresa una descripción de sección"
                    cols="30"
                    rows="2"
                    name='desc'
                    value={info.desc}
                    onChange={(e) => onHandleDescSec(e, secid)}
                    className="ne-section-desc"
                />

                <input
                    type="file"
                    ref={imgref}
                    onChange={(img) => onFileInputChange({ img, secid })}
                    accept="image/*"
                    style={{ display: 'none' }}
                    disabled={imgloader}
                />

                {!imgloader ?
                    <BiImageAdd
                        onClick={() => imgref.current.click()}
                        className='adddescimg-icon'
                    />
                    : <BounceLoader
                        color="#3A89C9"
                        speedMultiplier={.5}
                        size={15}
                    />
                }

            </div>

            {
                (info.image != '') &&
                <div className='ne-section-image'>
                    <img src={info.image} alt="" />
                    <div className='animate__animated animate__fadeIn'>
                        <BiTrash onClick={() => dispatch(removeDescImg(secid))} />
                    </div>
                </div>
            }

            {info.quest?.map((dat, id = key) => (

                <QuestCard secid={secid} key={id} id={id} {...dat} />

            ))}

            <div className="ne-actbuttons">
                <button onClick={() => dispatch(addNewEmptyQuestion({ secid }))}>+Pregunta cerrada</button>
                {/* <button>+Pregunta abierta</button> EN CONSTRUCCIÓN */}
            </div>
        </div>
    )
}
