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
      img: 'https://cdn2.iconfinder.com/data/icons/designer-skills/128/code-programming-javascript-software-develop-command-language-256.png'
    },
    {
      id: 2,
      name: 'Golang',
      img: 'https://www.nicepng.com/png/detail/264-2641184_111-kb-png-golang-logo.png'
    }
  ])

  const handleSelectRoom = (room: string) => {
    messageContext?.joinRoom(room)
  }

  const handleLogout = () => {
    messageContext?.logout()
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

        <span onClick={handleLogout} className={Styles.logout}>Sair</span>
    </div>
  );
}

export default Sidebar;