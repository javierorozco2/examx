export const initialForm = {
    uid: '',
    createdAt: '',
    title: '',
    isEGEL: false,
    egelRqst: false,
    desc: '',
    isPublished: false,
    sections: [
        {
            title: '',
            desc: '',
            image: '',
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
        }
    ]

}