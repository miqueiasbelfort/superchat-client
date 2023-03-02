import React, { useContext, useEffect } from "react";
import Styles from "./Chat.module.css";

import { toast } from 'react-toastify';

import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import Emojis from "../Emojis";

// context
import { Context } from "../../context/message";

interface SocketIData {
  room: string,
  author: string,
  message: string,
  time: string
}

const Chat: React.FC<any> = ({ socket }: any) => {
  const messageContext = useContext(Context);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if(!messageContext?.room){
      toast("Escolha uma sala para poder mandar messagens!", {
        className: 'notfication'
      })
      return
    } else if (messageContext?.currentMessage == ''){
      toast("Escreva algo para poder mandar a messagem!", {
        className: 'notfication'
      })
      return
    }

    messageContext?.sendMessage();
    messageContext.setCurrentMessage('')
    //console.log(messageContext?.messageList)
  };

  useEffect(() => {
    socket.on('receive_message', (data: SocketIData) => {
      messageContext?.setMessageList([...messageContext.messageList, data])
    })
  }, [socket, messageContext?.messageList]);


  if (messageContext?.loading){
    return (
      <div>
        <h1>Carregando</h1>
      </div>
    )
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h3>
          Sala: {!messageContext?.room ? '||||' : messageContext?.room} - Username: {messageContext?.username}
        </h3>
      </div>
      <div className={Styles.chat}>

        {messageContext?.messageList.map((item, i) => (
          <div className={Styles.messages} key={i}>
            <div className={Styles.message} id={item.author == messageContext.username ? Styles.you : ''}>
              <div className={Styles.messageContent}>
                <p>{item.message}</p>
              </div>
              <div className={Styles.messageInfo}>
                <span id={Styles.time}>{item.time}</span>
                <span>-</span>
                <span id={Styles.author}>{item.author}</span>
              </div>
            </div>
          </div>
        ))}

        {messageContext?.showEmoji && <Emojis />}
      </div>
      <form className={Styles.sendMessage} onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Hey... What's up?"
          onChange={(e) => messageContext?.setCurrentMessage(e.target.value)}
          value={messageContext?.currentMessage}
        />
        <button
          type="button"
          onClick={() => messageContext?.setShowEmoji(!messageContext.showEmoji)}
          className={Styles.emoji}
        >
          <BsFillEmojiHeartEyesFill />
        </button>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
