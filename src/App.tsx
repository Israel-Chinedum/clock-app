//COUNTDOWN APPLICATION
import { useState } from 'react';
import { HomeView } from './components/HomeView';
import { Button } from './components/Button';
import { CountDown } from './components/CountDown';
import { StopWatch } from './components/StopWatch';

const App = () => {

  const [myMargin, setMargin] = useState(0);
  const [info, setInfo]: any = useState('');
  const [type, setType]: any = useState('');

  const buttons = [
    'Home',
    'CountDown',
    'My CountDown',
    'Stop Watch'
  ]

  const slide = (text: any) => {
    switch(text){
      case 'Home':
        setMargin(0);
        break;
      case 'CountDown':
        setMargin(-100);
        break;
      case 'My CountDown':
        setMargin(-200);
        break;
      case 'Stop Watch':
        setMargin(-300);
    }
  }

  const message = (data: String) =>{
    setTimeout(() => {
      setInfo('');
    }, 3000)
    return data;
  }

  const displayMess = (data: String) => {
    setInfo(data);
    setType('orange');
  }


    return(
      <>
      <div id='main-container' 
        style={{
          height: `${window.innerHeight}px`
      }}>
        {info && <div 
          style={{
            border: `1px solid ${type}`
        }} id='message'><p
          style={{
            color: `${type}`
          }}  
        >{message(info)}</p></div>}
      <div id="container">
        <div id='slider' style={{
          marginLeft: `${myMargin}%`,
          transition: '0.5s'
        }}>
          <HomeView></HomeView>
          <CountDown displayMess={displayMess} slide={slide}></CountDown>
          <StopWatch></StopWatch>
        </div>
      </div>
      <Button slide={slide} buttons={buttons} ></Button>
      </div>
      </>
    )
}

export default App;