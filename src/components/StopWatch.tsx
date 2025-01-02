import { useState, useRef, useEffect } from "react"

export const StopWatch = () => {

    const [stamps, setStamp] = useState<string[]>([]);

    const [settings, setSettings] = useState({
        started: false,
        state: 'Start',
        clear: true
    });

    const [watch, setWatch] = useState({
        miliSec: 0,
        sec: 0,
        min: 0
    })

  
    const x = useRef(0), y = useRef(0), z = useRef(0), stampId = useRef(0);
    
  
   
    useEffect(() => {

        if(settings.started){

            const timer = setInterval(() => {
    
                setWatch(watch => ({
                    ...watch,
                    miliSec: x.current,
                    sec: y.current,
                    min: z.current
                }));
    
                x.current < 100 && x.current++;
                if(x.current == 100){
                    x.current = 0;
                    y.current++;
                };
    
                if(y.current == 60){
                    y.current = 0;
                    z.current++;
                }

                if(settings.clear){
                    x.current = 0;
                    y.current = 0;
                    z.current = 0;
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        started: false
                    }))
                    clearInterval(timer);
                }
              
            }, 10);
    
            return () => clearInterval(timer);
        }


    }, [settings.started, settings.clear]);

    const Controls = () => {

        return {

            changeState: () => {
                if(settings.started){
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        state: 'Start',
                        started: false
                    }));
                } else{
                  setSettings(prevSettings => ({
                    ...prevSettings,
                    state: 'Pause',
                    started: true,
                    clear: false
                  }));
                }
            },
        
            addStamp: () => {
                setStamp([`${watch.min}:${watch.sec}:${watch.miliSec}`, ...stamps]);
            },

            reset: () => {
                setSettings(prevSettings => ({
                    ...prevSettings,
                    clear: true,
                    state: 'Start'
                }));
            }

        }

    } 
    const ctrl = Controls();

    

    

    return(
        <section id="stop-watch">
            <h1>{(`0${watch.min}`).slice(-2)}:{(`0${watch.sec}`).slice(-2)}:{(`0${watch.miliSec}`).slice(-2)}</h1>
            <ul id="stamped-time-container">{
                stamps.map(stamp => (
                    <li key={stampId.current++}>{stamp}</li>
                ))
                }</ul>
            <ul id="stop-watch-buttons">
                <button onClick={ctrl.reset}> <i>Reset</i> </button>
                <button onClick={ctrl.changeState}>{settings.state}</button>
                <button onClick={ctrl.addStamp}> <i>Stamp</i> </button>
            </ul>
        </section>
    )
}