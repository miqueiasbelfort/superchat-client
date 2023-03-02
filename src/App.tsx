import {useState, useEffect} from 'react'
import './App.css'
import {io} from 'socket.io-client'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

//components
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Username from './components/Username'

// interfaces
import { messageListI } from './interfaces/interfaces'

//Context
import { Context } from './context/message'

const socket = io("https://superchat-6dz5.onrender.com")

function App() {

  const [messageList, setMessageList] = useState<messageListI[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [getUsername, setGetUsername] = useState('')
  const [NameRoom, setNameRoom] = useState('')
  const [showEmoji, setShowEmoji] = useState(true)

  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    const messageData = {
      room: NameRoom,
      message: currentMessage,
      author: getUsername,
      time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    }

    socket.emit('send_message', messageData)

    const newMessagesList = messageList.filter(item => {
      if (item.room === NameRoom){
        return item
      }
      return []
    })

    setMessageList([...newMessagesList, messageData])

  }
  const joinRoom = (room: string) => {
    socket.emit("leave_room", NameRoom)
    setMessageList([])
    setNameRoom(room)
    socket.emit('join_room', room)
  }
  const createUsername = (name: string) => {
    const nameUser = localStorage.setItem("username", JSON.stringify(name))
    setGetUsername(name)
  }
  const getEmoji = (emoji: string) => {
    setCurrentMessage(message => message + emoji)
    setShowEmoji(false)
  }
  const logout = () => {
    socket.emit('leave_room', NameRoom)
    setMessageList([])
    setNameRoom('')
    localStorage.removeItem('username')
    setGetUsername('')
  }

  useEffect(() => {
    const username = localStorage.getItem("username")
    if(username){
      setGetUsername(JSON.parse(username))
    }
  }, [getUsername])

  return (
    <Context.Provider value={{
        sendMessage,
        joinRoom,
        username: getUsername,
        room: NameRoom,
        createUsername,
        getEmoji,
        messageList,
        setMessageList,
        currentMessage,
        setCurrentMessage,
        showEmoji,
        setShowEmoji,
        logout,
        loading,
        setLoading
    }}>
      <div className='App'>
        <ToastContainer/>
        {
          getUsername == '' && (
            <Username/>
          )
        }
        <div className='content'>
          <Header/>
          <div className='main'>
            <Sidebar/>
            <Chat socket={socket}/>
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
