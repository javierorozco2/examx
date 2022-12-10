import { createSlice } from '@reduxjs/toolkit';

export const examxSlice = createSlice({
    name: 'examx',
    initialState: {
        myExams: [],
        savedExams: [],
        editExam: false,
        errorMsj: '',
        isloading: false,
        examActiveEdit: {}
    },
    reducers: {
        setExamActiveEdit: (state, action) => {
            state.examActiveEdit = action.payload
        },

        changeTitleQuest: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections[payload.secid].quest[payload.id].titleQuest = payload.value
        },

        changeRespQuest: ({ examActiveEdit }, { payload }) => {
            // console.log(payload);
            examActiveEdit.sections[payload.secid].quest[payload.questId].resp[payload.respId].text = payload.value
        },

        addNewEmptyAnswer: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections[payload.secid].quest[payload.id].resp.push({
                text: '',
                isCorrect: false,
                images: []
            })
        },

        addNewEmptyQuestion: ({ examActiveEdit }, { payload }) => {

            //Agregar nueva pregunta 
            examActiveEdit.sections[payload.secid].quest.push({
                titleQuest: '',
                resp: [{
                    text: '',
                    isCorrect: true,
                    images: []
                }]
            })
        },

        deleteQuest: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections[payload.secid].quest.splice(payload.id, 1)
        },

        removeAnswer: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections[payload.secid].quest[payload.id].resp.splice(payload.key, 1)
        },

        changeCorrectAnsw: ({ examActiveEdit }, { payload }) => {
            //limpiar todas las respuestas
            examActiveEdit.sections[payload.secid].quest[payload.questId].resp.map((q) => {
                if (q.isCorrect) {
                    q.isCorrect = false
                    return q
                } else {
                    return q
                }
            })

            // Asignar respuesta correcta
            examActiveEdit.sections[payload.secid].quest[payload.questId].resp[payload.respId].isCorrect = !payload.value
        },

        setDescription: (state, { payload }) => {
            console.log(payload.target.value);

        },

        setLoading: (state, { payload }) => {
            state.isloading = true
        },

        setNoLoading: (state, { payload }) => {
            state.isloading = false
        },

        setuid: (state, { payload }) => {
            state.examActiveEdit.uid = payload.uid
            state.examActiveEdit.createdAt = payload.date
        },

        onEditExam: (state, { payload }) => {
            state.editExam = payload
        },

        onEditExamDisable: (state) => {
            state.editExam = false

        },

        setPublished: (state) => {
            state.examActiveEdit.isPublished = true
        },

        setSectionTitle: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections[payload.id].title = payload.value
        },

        setSectionDesc: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections[payload.id].desc = payload.value
        },

        addNewSection: ({ examActiveEdit }, { payload }) => {
            examActiveEdit.sections.push({
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
            })

        },

        removeSection: ({examActiveEdit}, {payload}) => {
            examActiveEdit.sections.splice(payload, 1)
        },

        setImageToResp: ({examActiveEdit}, {payload}) => {
            examActiveEdit.sections[payload.secid].quest[payload.questId].resp[payload.respId].images.push(payload.url)
        },

        deleteQstImg: ( {examActiveEdit}, {payload}) => {
            examActiveEdit.sections[payload.secid].quest[payload.questId].resp[payload.respId].images.splice(payload.imgkey, 1)
        }


    }
});


// Action creators are generated for each case reducer function
export const {
    setExamActiveEdit,
    changeTitleQuest,
    changeRespQuest,
    addNewEmptyAnswer,
    addNewEmptyQuestion,
    deleteQuest,
    removeAnswer,
    changeCorrectAnsw,
    setDescription,
    setLoading,
    setNoLoading,
    setuid,
    onEditExam,
    onEditExamDisable,
    setPublished,
    setSectionTitle,
    setSectionDesc,
    addNewSection,
    removeSection,
    setImageToResp,
    deleteQstImg
} = examxSlice.actions;