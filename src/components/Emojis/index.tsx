import React, {useState, useContext} from 'react';
import Styles from './Emojis.module.css'
import EmojiPicker, {Theme, EmojiClickData, EmojiStyle} from 'emoji-picker-react';

// context
import { Context } from '../../context/message';

const Emojis: React.FC = () => {

  const messageContext = useContext(Context)

  const handleEmoji = (e:EmojiClickData) => {
    //console.log(e.emoji)
    messageContext?.getEmoji(e.emoji)
  }

  return (
    <div className={Styles.container}>
        <EmojiPicker emojiStyle={EmojiStyle.NATIVE} theme={Theme.DARK} onEmojiClick={e => handleEmoji(e)}/>
    </div>
  );
}

export default Emojis;