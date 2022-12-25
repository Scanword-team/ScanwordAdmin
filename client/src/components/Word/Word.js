import { useContext } from 'react'
import { DragContext } from '../../context/DragContext'
import { SettingContext } from '../../context/SettingContext'

const Word = (props) => {
    const {updateContext, updateDragitem, updateDragonFlag, updateDataQuestionId} = useContext(DragContext)
    const {onHorizon, vvalue, hvalue} = useContext(SettingContext)

    const handlerDragStart =  (event) => {
        updateContext(event.target)
        updateDragitem(event.target.getAttribute('data-question'))
        updateDragonFlag(event.target.innerHTML)
        updateDataQuestionId(event.target.getAttribute('data-question'))
        var zones = document.querySelectorAll('.zone')
        zones.forEach(zone => {
            styleForZones(zone, event.target.innerHTML)
        })
    }

    const styleForZones = (zone, myDragonFlag) => {

        if(onHorizon) {
          
            var m = hvalue;// число ячеек по горизонтали
            var str = zone.id;// 0_0
            var index = str.indexOf("_")+1;
            var num = "";
            for(index; index<str.length; index++) {
                num = num + str[index];
            }
            var kol = Number(num);// kol = 0

            
            kol += myDragonFlag.length;

            if (kol<m) {
                kol = kol - myDragonFlag.length;
                let ved1 = 0
                index = str.indexOf("_");
                num = "";
                for(let i = 0; i<index; i++) {
                    num = num + str[i];
                }
                let stroka = Number(num)
                
               
                for (let i=0; i<=myDragonFlag.length; i++) {
    
                    
                    if (document.getElementById(`${stroka}_${kol+i}`).getAttribute('data-word')) {
                        if (!document.getElementById(`${stroka}_${kol+i}`).getAttribute('data-question')) {
                            if (document.getElementById(`${stroka}_${kol+i}`).getElementsByTagName('span')[0].innerHTML != myDragonFlag[i-1]) {
                                ved1 = ved1 + 1
                            }
                        }
                        else {
                            ved1 = ved1 + 1
                        }
                    }
                }
    
                // console.log( 'ved1 = ', ved1)
                if(ved1==0) {
                    // console.log("Зашел в зеленую зону");
                    zone.classList.add('allowZone')
                }
                else {
                    // console.log("Зашёл в красную зону")
                    zone.classList.add('banZone')
                }
            }
            else {
                zone.classList.add('banZone')
            }
        }
        else {
            var n = vvalue;// число ячеек по горизонтали
            var str = zone.id;// 0_0
            var index = str.indexOf("_");
            var num = "";
            for(let i=0; i<index; i++) {
                num = num + str[i];
            }
            var kol = Number(num);// kol = 0
            kol += myDragonFlag.length;
            if (kol<n) {
                kol = kol - myDragonFlag.length;
                var ved = 0
                index = str.indexOf("_")+1;
                num = "";
                for(index; index<str.length; index++) {
                    num = num + str[index];
                }
                let stroka = Number(num)
                
                for (let i=0; i<=myDragonFlag.length; i++) {
                    if (document.getElementById(`${kol+i}_${stroka}`).getAttribute('data-word')) {
                        if (!document.getElementById(`${kol+i}_${stroka}`).getAttribute('data-question')) {
                            if (document.getElementById(`${kol+i}_${stroka}`).getElementsByTagName('span')[0].innerHTML != myDragonFlag[i-1]) {
                                ved = ved + 1
                            }
                        }
                        else {
                            ved = ved + 1
                        }
                    }
                }
                if(ved==0) {
                    // console.log("Зашел в зеленую зону", zone)
                    zone.classList.add('allowZone')
                }
                else {
                    zone.classList.add('banZone')
                }
            }
            else {
                zone.classList.add('banZone')
            }
        }
    }

    function handlerDragEnd() {
        var zones = document.querySelectorAll('.zone')
        zones.forEach(zone => {
            zone.classList.remove('allowZone')
            zone.classList.remove('banZone')
        })
    }

    //console.log(FunctionZoneDrag().handlerDragStart())

    // word.current.addEventListener('dragend', handlerDragEnd);
    // word.current.addEventListener('drag', handlerDrag);
    return (


        <div>
            {!(!!props.click) && 
                <div
                    // onDragEnd={FunctionZoneDrag().handlerDragEnd}
                    onDragEnd={handlerDragEnd}
                    onDragStart={handlerDragStart}
                    data-question={props.word.id} 
                    className="itemDrag" 
                    id="dataItem" 
                    data-item={props.word.answer} 
                    draggable="true"
                >
                        {props.word.answer}
                </div>
            }

            {props.click && 
                <div 
                    data-question={props.word.id} 
                    className="itemDrag" 
                    onClick={props.click}
                    id={props.word.id}
                >
                        {props.word.answer}
                </div>
            }
        </div>
    )
}

export default Word