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
        setExamActiveEdit: (state, action) =>{
            state.examActiveEdit = action.payload
        },

        changeTitleQuest: (state, action) =>{
            state.examActiveEdit.quest[action.payload.id].titleQuest = action.payload.value
        },

        changeRespQuest: (state, {payload}) =>{
            console.log(payload.value);
            state.examActiveEdit.quest[payload.questId].resp[payload.respId].text = payload.value
        },

        addNewEmptyAnswer: ( state, {payload}) =>{
            // console.log(state.examActiveEdit.quest[payload].resp);
            state.examActiveEdit.quest[payload].resp.push({ text: '', isCorrect: false})
        },

        addNewEmptyQuestion: ( {examActiveEdit}) =>{
            
            //Agregar nueva pregunta 
            examActiveEdit.quest.push({
                titleQuest: '',
                resp:[{
                    text: '',
                    isCorrect: true
                }]
            })
        },

        deleteQuest: ( state, {payload} ) =>{
            state.examActiveEdit.quest.splice(payload,1)
        },

        removeAnswer: (state, {payload}) => {
            state.examActiveEdit.quest[payload.id].resp.splice(payload.key,1)
        },

        changeCorrectAnsw: ( {examActiveEdit}, {payload} ) =>{
            //limpiar todas las respuestas
            examActiveEdit.quest[payload.questId].resp.map((q) =>{
                if(q.isCorrect){
                    q.isCorrect = false
                    return q
                }else{
                    return q
                }
            })

            // Asignar respuesta correcta
            examActiveEdit.quest[payload.questId].resp[payload.respId].isCorrect = !payload.value
        },

        setDescription: ( state, {payload} ) => {
            console.log(payload.target.value);

        },

        setLoading: (state, {payload}) => {
            state.isloading = true
        },

        setNoLoading: (state, {payload}) => {
            state.isloading = false
        },

        setuid: (state, {payload}) => {
            state.examActiveEdit.uid = payload.uid
            state.examActiveEdit.createdAt = payload.date
        },

        onEditExam: (state, {payload}) => {
            state.editExam = payload
        },

        onEditExamDisable: (state) => {
            state.editExam = false

        },

        setPublished: (state) =>{
            state.examActiveEdit.isPublished = true
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
    setPublished
} = examxSlice.actions;