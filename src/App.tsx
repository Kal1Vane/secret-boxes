
import { useEffect, useState } from 'react';
import './App.css';
import { AccessServersNow, SERVERS } from './const';

import moment from 'moment';
import { Server } from './types/mainTypes';
import { copyText } from './utils/clipBoard';

function App() {
  const [arrayActiveBoxes, setArrayActiveBoxes] = useState<Server[]>()

 
  async function handleCopyAll() {
    if(arrayActiveBoxes){
      const text = arrayActiveBoxes.map((s) => serverLink(s.number)).join("\n");
      await copyText(text);
      
    }
     
  }

  function serverLink(serverNumber: number): string {
    return `<link=500&500&${serverNumber}>№${serverNumber}</link>`;
  }

  function initialCounting(server: Server[]) {
    const accessServers: Server[] = []
    server.forEach((item) => {
      const day = moment().diff(moment(item.foundedAt, "YYYY-MM-DD"), "days");

      if (day % 3 === 0 && AccessServersNow.includes(item.number)) {
        accessServers.push(item)
      }
    })

    return accessServers.reverse()
  }

  useEffect(() => {
    setArrayActiveBoxes(initialCounting(SERVERS))
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems : 'center', justifyContent : 'center', height : '100vh', padding : '0 20px' }}>
      <div>
        
        <button onClick={handleCopyAll} className='btn-purple' style={{}} type='button'>
        <p>Скопировать для уведомления</p>
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection : 'column'}}><h3>Секретки доступны на серверах: </h3>
         
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap : 'wrap' }}> {arrayActiveBoxes && arrayActiveBoxes.map((item) => {
        return (
          <div>
            <div>
               №{item.number}
            </div>
          </div>
        )
      })}</div>
    </div>
  );
}

export default App;


