import { useState, useRef } from "react"

interface Props{
    slide: (text: String) => void,
    displayMess: (data: String) => void
}

export const CountDown = ({slide, displayMess}: Props) => {

    const [seconds, setSeconds] = useState(0);
    const [miliSec, setMiliSec] = useState(0);
    const [btnText, setBtnText] = useState('Pause');
    const input = useRef(0);
    const counting = useRef<boolean | null>(null);
    const x = useRef(0);
    const i = useRef(100);

    const countDown:any = useRef();
    

    const runCountDown = () => {

        if(i.current !== 0){
            i.current--

            setMiliSec(i.current);

            if(i.current == 0){
                x.current--
                setSeconds(x.current);
                i.current = 100;
            }

        }

        console.log(countDown.current)
   
        if(x.current == 0){
            setMiliSec(0);
            clearInterval(countDown.current);
            counting.current = null;
        }
    }

    const assignCountState = (state: string) => {

        if(state == 'start'){
            x.current = input.current;
            if(x.current != 0){
            counting.current = true;
            slide('My CountDown');
            setSeconds(x.current);
            countDown.current = setInterval(runCountDown, 10);
           }else{
            displayMess('Enter number of seconds!');
           }
        }

        if(state == 'pause'){
            if(counting.current == true){
                clearInterval(countDown.current);
                setBtnText('Continue');
                counting.current = false;
               } 
        }

        if(state == 'continue'){
            if(counting.current == false){
                countDown.current = setInterval(runCountDown, 1);
                setBtnText('Pause');
                counting.current = true;
               }
        }

        if(state == 'toggle'){
            if(counting.current == true){
                clearInterval(countDown.current);
                setBtnText('Continue');
                counting.current = false;
               } 
               
            else if(counting.current == false){
            countDown.current = setInterval(runCountDown, 10);
            setBtnText('Pause');
            counting.current = true;
            }
        }


        if(state == 'stop'){
            clearInterval(countDown.current);
            setMiliSec(0);
            setSeconds(0);
            counting.current = null;
        }


    }


    return(
        <>
         <section id="count-down">
            <h1>CountDown</h1>
            <input onKeyUp={(e: any) => input.current = (Number(e.target.value))} id="input" type="number" placeholder="Enter seconds" />
            <button onClick={()=> assignCountState('start')} id="start-count-down">Start</button> 
        </section>

        <section id="my-count-down">
            <h1>{(`0${seconds}`).slice(-2)}:{(`0${miliSec}`).slice(-2)}</h1>
            <ul>
                <button onClick={() => assignCountState('stop')}>Reset</button>
                <button onClick={() => assignCountState('toggle')}>{btnText}</button>
            </ul>
        </section>
        </>
       
    )
}