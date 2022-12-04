import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi"

export const QuestCard = ( onArrayInputChange, data) => {
    
    const { onArrayInputChange: a } = onArrayInputChange 

    return (
        <div className="ne-qst" key={data.id}>
            <div className="ne-qst-title">
                <div className="ne-qst-number">{data.id}</div>
                <input
                    type="text"
                    placeholder='Ingresa una pregunta'
                    value={data.titleQuest}
                    onChange={a(data.id)}
                />
            </div>

            <div className="ne-qst-resp">
                {/*- - - -AQUI SE USARA UN MAP- - -*/}
                {/*-*/}<div className="ne-qst-respe">
                    {/*-*/}    <BiRadioCircle className='ne-qst-micon' /> {/*Icono interactivo: depende si es resp correcta o no*/}
                    {/*-*/}    <input type="text" placeholder='Ingresa una respuesta' />
                    {/*-*/}</div>
                {/*- - - - - - - - - - - - - - - - -*/}
            </div>

            <button className='ne-masresp' >+Respuesta</button>
        </div>
    )
}
