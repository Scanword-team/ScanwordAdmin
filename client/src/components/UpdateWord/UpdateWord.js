import {useState} from 'react'

const UpdateWord = (props) => {

    const [answer, setAnswer] = useState(props.word.answer)
    const [question, setQuestion] = useState(props.word.question)
    const [src, setSrc] = useState(props.word.src)

    const changeAnswer = (event) => {
        setAnswer(event.target.value)
    }

    const changeQuestion = (event) => {
        setQuestion(event.target.value)
    }

    const changeSrc = (event) => {
        setSrc(event.target.value)
    }

    return (
        <>
            <div className="questionRedactor">
                <div>
                    <label htmlFor="answer">Ответ</label>
                    <input 
                        name="answer" 
                        id="answer" 
                        type="text" 
                        value={answer}
                        onChange={changeAnswer}
                    />
                </div>
                <div>
                    <label htmlFor="question">Вопрос</label>
                    <textarea 
                        value={question}  
                        name="question" 
                        id="question" 
                        onChange={changeQuestion}
                    />
                </div>
                <div>
                    <label htmlFor="src">Ссылка</label>
                    <input 
                        className="src-redact" 
                        name="src" id="src" 
                        type="text" 
                        value={src ? src: 'Отсутствует ссылка на картинку или мелодию'}
                        onChange={changeSrc}
                    />
                </div>
            </div>
            <div className="btn-redact-word">
                <button>Сохранить</button>
                <button>Удалить</button>
            </div>
        </>
    )
}

export default UpdateWord