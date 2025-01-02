import { useState, useEffect } from "react";

export const HomeView = () => {

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [greeting, setGreeting] = useState('');
    let greet = 'Greetings';


    const getDateandTime = (value: String) => {
        const date = new Date();

    
        if(value.toLowerCase() == 'time'){
            return `${date.toLocaleTimeString()}`;
        }

        return `${date.toLocaleDateString()}`;
    }



    useEffect(() => {

        const dateTime = setInterval(() => {
            setTime(getDateandTime('time'));
            setDate(getDateandTime(''));
        },1000);
    
        const currentHour = Number(time.split(':')[0]);

        if(time.endsWith('AM')){
            greet = 'Good Morning';
        } 
        
        if( time.endsWith('PM') ){
            
            if( currentHour < 6 || currentHour == 12 ){
                greet = 'Good Afternoon';
            }
    
            if(currentHour >= 6 && currentHour != 12){
                greet = 'Good Evening'
            }
    
        } 
        
        setGreeting(greet);

        return () => clearInterval(dateTime);

    }, [time])

   


    return(
        <section id="home-view-section">
            <h1
            style={{
                fontSize: '3rem'
            }}
            >{greeting}</h1>
            <p id="time"
            style={{
                fontSize: '2.5rem',
                marginTop: '50px'
            }}
            >{time}</p>
            <p id="date"
            style={{
                fontSize: '1.3rem',
                marginTop: '20px'
            }}
            >{date}</p>
        </section>
    )
}