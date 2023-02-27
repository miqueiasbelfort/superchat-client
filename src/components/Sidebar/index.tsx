import React, {useState, useContext} from 'react';
import Styles from './Sidebar.module.css'

// context
import { Context } from '../../context/message';

const Sidebar: React.FC = () => {

  const messageContext = useContext(Context)

  const [roons, setRoons] = useState([
    {
      id: 1,
      name: 'Javascript',
      img: '../../../src/assets/js.svg'
    },
    {
      id: 2,
      name: 'Golang',
      img: '../../../src/assets/golang.png'
    }
  ])

  const handleSelectRoom = (room: string) => {
    messageContext?.joinRoom(room)
  }

  return (
    <div className={Styles.container}>
        <span className={Styles.roomName}>Salas</span>
        <ul className={Styles.rooms}>

          {
            roons.map(item => (
              <li className={Styles.room} key={item.id} onClick={() => handleSelectRoom(item.name)}>
                <img id={item.id == 2 ? Styles.golang : ''} src={item.img} alt="javascript"/>
                <span>{item.name}</span>
              </li>
            ))
          }

        </ul>
    </div>
  );
}

export default Sidebar;