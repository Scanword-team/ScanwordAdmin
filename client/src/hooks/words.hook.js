import { useState } from "react"

export const useWords = () => {
    const [wordsForAdmin, setWords] = useState(null)
    const updateWordsForAdmin = (newWords) => {
        setWords(() => newWords)
        console.log(wordsForAdmin)
    }
    return {wordsForAdmin, updateWordsForAdmin}
}