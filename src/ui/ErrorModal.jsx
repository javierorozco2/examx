import { useEffect } from "react";
import { AiOutlineWarning } from "react-icons/ai"

export const ErrorModal = ({errorMsj, active, setActive}) => {

    useEffect(() => {

        setTimeout(() => {
            setActive(false)
            console.log('QPD');
        }, 3000);

    }, [active])

    return (
        <div className={ 'errmsj '+ (!active && 'errmsjinvisible')}>
            <AiOutlineWarning className="errmsj-icon"/>
            <p className="errmsj-text">{errorMsj}</p>
        </div>
    )
}
