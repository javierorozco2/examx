import { useState } from "react"
import { BsChevronRight } from "react-icons/bs"

export const Search = () => {

    const [search, setSearch] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()

        if ( search.trim().length <=0 ) return;

        setSearch("")
    }

    return (
        <div className="main-search">

            <form className="s-input" onSubmit={ (e) => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="Buscar examen"
                    value={search}
                    onChange={ (e) => setSearch(e.target.value)}
                />
            </form>

            <div className="s-result">
                {
                    ["aaa", "sss", "2qqq"].map((e) => (
                        <div className="s-card" key={e}>
                            <div className="s-cardinf">
                                <div className="abody-cardled" />
                                <p>{e}</p>
                            </div>

                            <BsChevronRight className="s-icons" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
