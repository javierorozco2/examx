import { createSlice } from '@reduxjs/toolkit';

export const examxSlice = createSlice({
    name: 'examx',
    initialState: {
        myExams: [],
        savedExams: [],
        editExam: false,
        examActiveEdit: {},
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

        addNewEmptyQuestion: ( state, {payload}) =>{
            // console.log(state.examActiveEdit.quest[payload].resp);
            state.examActiveEdit.quest[payload].resp.push({ text: '', isCorrect: false})
        }
    }
});


// Action creators are generated for each case reducer function
export const { setExamActiveEdit, changeTitleQuest, changeRespQuest, addNewEmptyQuestion } = examxSlice.actions;