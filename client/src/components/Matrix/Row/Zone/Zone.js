import { useContext, useEffect, useRef } from "react"
import { DragContext } from "../../../../context/DragContext"
import { ModalContext } from "../../../../context/ModalContext"
import { SettingContext } from "../../../../context/SettingContext"
import { useWords } from "../../../../hooks/words.hook"


export const Zone = (props) => {
    const {hvalue, vvalue, onHorizon, wordDB, listwords, scanword, dict, updateListwords, updateScanword} = useContext(SettingContext) 
    const {classesForZones,context, dragonFlag, updateContext, updateDataQuestionId, updateDataWord, 
        updateDragitem, updateDragword, dragitem, dataQuestionId} = useContext(DragContext)
    const {modal, srcAudio, answer, question ,updateSrcAudio, updateSrc, updateModal, updateAnswer, updateQuestion} = useContext(ModalContext)
    const {wordsForAdmin} = useWords()
    const width = useRef('40px')
    const height = useRef('40px')
    const zone = useRef({})
    if ((hvalue>12 || vvalue>12) && (hvalue<=15 || vvalue<=15)) {
        width.current='30px'
        height.current='30px'
    }
    if (hvalue>15 || vvalue>15) {
        width.current='20px'
        height.current='20px'
    }

    if(hvalue<=12 && vvalue<=12) {
        width.current='40px'
        height.current='40px'
    }

    const styles = {
        width: width.current,
        height: height.current
    }

   

    const handlerMouseEnterZone = (event) => {
        if(event.target.getAttribute('data-question')) {
            let elem = wordDB.find((elem) => (elem.id === Number(event.target.getAttribute('data-question'))))
            if (elem.src) {
                updateSrc(elem.src)
            }
            if (elem.srcAudio) {
                updateSrcAudio(elem.srcAudio)
            }
            updateAnswer(elem.answer)
            updateQuestion(elem.question)
            updateModal(true)
        }
    }

    const handlerMouseLeaveZone = () => {
        updateSrcAudio('')
        updateSrc('')
        updateAnswer('')
        updateQuestion('')
        updateModal(false)
    }

    const handlerDragStartZone = (event) => {
        updateContext(event.target);
        updateDragword(event.target.getAttribute('data-word'))
        updateDataWord(event.target.getAttribute('data-word'))
        
    }

    function handlerDrop(event) {
        const dragFlag = dragitem; // dragflag = слово, которое взяли
        let itemScanword = {}
        itemScanword.questionId = dataQuestionId
        itemScanword.dict = dict
        if(onHorizon) {
            itemScanword.direction = 0
            var str = event.target.id;
            var index = str.indexOf("_")+1;
            var num = "";
            for(index; index<str.length; index++) {
                num = num + str[index];
            }
            var kol = Number(num);// kol = 0
            index = str.indexOf("_");
            num = "";
            for (var i =0; i<index; i++) {
                num = num + str[i];
            }
    
            var kol_str = Number(num);
            var d =0;
            var cnst = kol+1;
            itemScanword.x = kol
            itemScanword.y = kol_str
            if (!document.getElementById(`${kol_str}_${kol}`).getAttribute('data-word') || !document.getElementById(`${kol_str}_${kol}`).getAttribute('data-word2')) {
                if ( document.getElementById(`${kol_str}_${kol}`).getAttribute('data-word')) {
                    document.getElementById(`${kol_str}_${kol}`).setAttribute('data-word2',dragFlag);
                }
                else {
                    document.getElementById(`${kol_str}_${kol}`).setAttribute('data-word',dragFlag);
                }
            }
    
            
            document.getElementById(`${kol_str}_${kol}`).setAttribute('data-question',dataQuestionId);
            document.getElementById(`${kol_str}_${kol}`).setAttribute('data-direction',0);
            document.getElementById(`${kol_str}_${kol}`).getElementsByTagName('span')[0].innerHTML = "?";
            kol++;
            for (kol; kol<dragonFlag.length+cnst; kol++) {
                if(document.getElementById(`${kol_str}_${kol}`).getAttribute('data-countword')) {
                    let nom = Number(document.getElementById(`${kol_str}_${kol}`).getAttribute('data-countword'))+1
                    document.getElementById(`${kol_str}_${kol}`).setAttribute('data-countword', nom)
                }
                else {
                    document.getElementById(`${kol_str}_${kol}`).setAttribute('data-countword',1)
                }
                if (!document.getElementById(`${kol_str}_${kol}`).getAttribute('data-word') || !document.getElementById(`${kol_str}_${kol}`).getAttribute('data-word2')) {
                    if ( document.getElementById(`${kol_str}_${kol}`).getAttribute('data-word')) {
                        document.getElementById(`${kol_str}_${kol}`).setAttribute('data-word2',dragFlag);
                    }
                    else {
                        document.getElementById(`${kol_str}_${kol}`).setAttribute('data-word',dragFlag);
                    }
                }
                document.getElementById(`${kol_str}_${kol}`).getElementsByTagName('span')[0].innerHTML = dragonFlag[d];
                d++;
            }
        }
        else {
            itemScanword.direction = 1
            var str = event.target.id;
            var index = str.indexOf("_");
            var num = "";
            for(let i = 0; i<index; i++) {
                num = num + str[i];
            }
            var kol = Number(num);// kol = 0
            index = str.indexOf("_") +1;
            num = "";
            for (index; index<str.length; index++) {
                num = num + str[index];
            }
            var kol_str = Number(num); //номер столбца
            itemScanword.x = kol_str
            itemScanword.y = kol
            var d =0;
            if (!document.getElementById(`${kol}_${kol_str}`).getAttribute('data-word') || !document.getElementById(`${kol}_${kol_str}`).getAttribute('data-word2')) {
                if ( document.getElementById(`${kol}_${kol_str}`).getAttribute('data-word')) {
                    document.getElementById(`${kol}_${kol_str}`).setAttribute('data-word2',dragFlag);
                }
                else {
                    document.getElementById(`${kol}_${kol_str}`).setAttribute('data-word',dragFlag);
                }
            }
            document.getElementById(`${kol}_${kol_str}`).setAttribute('data-question',dataQuestionId);
            document.getElementById(`${kol}_${kol_str}`).setAttribute('data-direction',1);
            document.getElementById(`${kol}_${kol_str}`).getElementsByTagName('span')[0].innerHTML = "?";
            kol++;
            var cnst = kol;
            for (kol; kol<dragonFlag.length+cnst; kol++) {
                if(document.getElementById(`${kol}_${kol_str}`).getAttribute('data-countword')) {
                    document.getElementById(`${kol}_${kol_str}`).setAttribute('data-countword',Number(document.getElementById(`${kol}_${kol_str}`).getAttribute('data-countword'))+1)
                }
                else {
                    document.getElementById(`${kol}_${kol_str}`).setAttribute('data-countword',1)
                }
                if (!document.getElementById(`${kol}_${kol_str}`).getAttribute('data-word') || !document.getElementById(`${kol}_${kol_str}`).getAttribute('data-word2')) {
                    if ( document.getElementById(`${kol}_${kol_str}`).getAttribute('data-word')) {
                        document.getElementById(`${kol}_${kol_str}`).setAttribute('data-word2',dragFlag);
                    }
                    else {
                        document.getElementById(`${kol}_${kol_str}`).setAttribute('data-word',dragFlag);
                    }
                }
                document.getElementById(`${kol}_${kol_str}`).getElementsByTagName('span')[0].innerHTML = dragonFlag[d];
                d++;
            }
        }
        updateScanword([...scanword, itemScanword])
        let array = listwords.filter((wordinlist) => Number(wordinlist.id)!==Number(dragitem))
        handlerDragEnd()
        updateListwords(array)
        updateContext('')
        //document.querySelector(`[data-item=${dragItem.getAttribute("data-item")}]`).remove();
    }

    function handlerDragEnd() {
        var zones = document.querySelectorAll('.zone')
        zones.forEach(zone => {
            zone.classList.remove('allowZone')
            zone.classList.remove('banZone')
        })
    }

    function handlerDragOver(event) {
        if(onHorizon) {
            var m = hvalue;// число ячеек по горизонтали
            var str = event.target.id;// 0_0
            var index = str.indexOf("_")+1;
            var num = "";
            for(index; index<str.length; index++) {
                num = num + str[index];
            }
            var kol = Number(num);// kol = 0
            
            kol += dragonFlag.length;
            if (kol<m) {
                kol = kol - dragonFlag.length;
                var ved = 0
                index = str.indexOf("_");
                num = "";
                for(let i = 0; i<index; i++) {
                    num = num + str[i];
                }
                let stroka = Number(num)
                
                for (let i=0; i<=dragonFlag.length; i++) {
                    if (document.getElementById(`${stroka}_${kol+i}`).getAttribute('data-word')) {
                        if (!document.getElementById(`${stroka}_${kol+i}`).getAttribute('data-question')) {
                            if (document.getElementById(`${stroka}_${kol+i}`).getElementsByTagName('span')[0].innerHTML != dragonFlag[i-1]) {
                                ved = ved + 1
                            }
                        }
                        else {
                            ved = ved + 1
                        }
                    }
                }
                if(ved==0 && context.getAttribute('class')!== 'zone' && event.target.getElementsByTagName('span')[0] && event.target.getElementsByTagName('span')[0].innerHTML==='') {
                    event.preventDefault();
                }
            }
            
        }
        else {
            var n = vvalue;// число ячеек по горизонтали
            var str = event.target.id;// 0_0
            var index = str.indexOf("_");
            var num = "";
            for(let i=0; i<index; i++) {
                num = num + str[i];
            }
            var kol = Number(num);// kol = 0
            kol += dragonFlag.length;
            if (kol<n) {
                kol = kol - dragonFlag.length;
                var ved = 0
                index = str.indexOf("_")+1;
                num = "";
                for(index; index<str.length; index++) {
                    num = num + str[index];
                }
                let stroka = Number(num)
                
                for (let i=0; i<=dragonFlag.length; i++) {
                    if (document.getElementById(`${kol+i}_${stroka}`).getAttribute('data-word')) {
                        if (!document.getElementById(`${kol+i}_${stroka}`).getAttribute('data-question')) {
                            if (document.getElementById(`${kol+i}_${stroka}`).getElementsByTagName('span')[0].innerHTML != dragonFlag[i-1]) {
                                ved = ved + 1
                            }
                        }
                        else {
                            ved = ved + 1
                        }
                    }
                }
                if(ved==0) {
                    event.preventDefault();
                }
            }
        }
    }

    // useEffect(() => {
        // zone.addEventListener('mouseenter', handlerHoverZone);
        // zone.addEventListener('mouseleave', handlerHoverLeave);
        // zone.addEventListener('dragstart', handlerDragStartZone);
        // zone.addEventListener('dragenter', handlerDragEnter);
        // zone.addEventListener('dragleave', handlerDragLeave);
        //zone.addEventListener('drop', handlerDrop);
    // }, [])
    return (
        <div 
            vvalue={props.vvalue}
            onDragOver={handlerDragOver}
            onMouseEnter={handlerMouseEnterZone}
            onMouseLeave={handlerMouseLeaveZone}
            onDrop={handlerDrop}
            onDragStart={handlerDragStartZone}
            ref={zone} 
            className={classesForZones}
            style={styles} 
            draggable="true" 
            id={`${props.idstr}_${props.id}`}
        >
            <span></span>
        </div>
    )
}