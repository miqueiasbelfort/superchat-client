import React, {useState, useContext} from 'react';
import Styles from './Sidebar.module.css'
import axios from 'axios';

// context
import { Context } from '../../context/message';

const Sidebar: React.FC = () => {

  const messageContext = useContext(Context)

  const [roons, setRoons] = useState([
    {
      id: 1,
      name: 'Javascript',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png'
    },
    {
      id: 2,
      name: 'Golang',
      img: 'https://wallpaperaccess.com/full/5750703.jpg'
    }
  ])

  const handleSelectRoom = async (room: string) => {
    await axios.post('https://superchat-6dz5.onrender.com/active', {
      room,
      username: messageContext?.username
    }).then(res => {
      messageContext?.joinRoom(room)
      messageContext?.setLoading(false)
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
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