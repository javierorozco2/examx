import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsChevronRight } from "react-icons/bs"

import moment from "moment/moment"
import 'moment/locale/es'
import { setMyExamSelected } from "../../../store/examx/examxSlices"

export const Search = () => {

    const [search, setSearch] = useState("")
    const { allExams } = useSelector(state => state.examx)
    const dispatch = useDispatch()

    let countDate = 0

    const searchByTerm = (term) => {
        return (x) => {

            if (search != "") {
                let t = x.title.replace(/ /g, "")
                let s = search.replace(/ /g, "")

                return (t.toLowerCase().includes(s.toLowerCase()))
            }
        }
    }

    const sortByDate = () => {
        return (x) => {
            countDate++

            // Here methods to sort by date

            return countDate <= 5
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (search.trim().length <= 0) return;

        setSearch("")
    }

    const getMoment = (date) => {
        const newDate = new Date( date )
        const dateFormated = newDate.toLocaleDateString('en-GB')

        moment.locale('es')
        return moment(dateFormated, "DDMMYYYY").fromNow();
        
    }

    return (
        <div className="main-search">

            <form className="s-input" onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="Buscar examen"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <div className="s-result">

                {
                    allExams?.filter(searchByTerm(search)).map((dat, key) => (

                        <div className="s-card" key={key} onClick={() => dispatch(setMyExamSelected(dat))}>
                            <div className="s-cardinf">
                                <div className="abody-cardled" />
                                <p>{dat.title}</p>
                            </div>

                            <BsChevronRight className="s-icons" />
                        </div>
                    ))
                }

                {
                    (!(search === "") && ((allExams?.filter(searchByTerm(search))).length <= 0)) &&
                    <div className="s-divtexts">
                        <p className="s-texts">No se encontro ningun examen con la palabra <strong>{search}</strong> </p>
                    </div>
                }

                {
                    search === "" &&
                    <>
                        <div className="s-divtexts">
                            <p className="s-texts">Prueba realizar una nueva busqueda 🔎</p>
                        </div>

                        <div className="s-ue">

                            <p className="s-texts">Ultimos examenes creados</p>

                            { allExams?.filter(sortByDate()).map((dat, key) => (
                                <div className="s-card" key={key} onClick={() => dispatch(setMyExamSelected(dat))}>
                                    <div className="s-cardinf">
                                        <div className="abody-cardled" />
                                        <p>{dat.title}</p>
                                    </div>

                                    <div className="s-cardright">
                                        <p className="s-carddate">{ getMoment(dat.createdAt)}</p>
                                        <BsChevronRight className="s-icons" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>

                }
            </div>
        </div>
    )
}
