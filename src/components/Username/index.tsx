import React, { FormEvent, useState, useContext } from 'react';
import Styles from './Username.module.css'
import { toast } from 'react-toastify';

// context
import { Context } from '../../context/message';

const Username: React.FC = () => {

  const messageContext = useContext(Context)

  const [username, setUsername] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(username == ''){
      toast("Digite um nome de usuário, para poder prosseguir!")
      return
    }
    messageContext?.createUsername(username)
  }

  return (
    <div className={Styles.container}>
        <form className={Styles.form} onSubmit={handleSubmit}>
            <h2>Criar nome de Usuario</h2>
            <input 
              type="text"
              placeholder='Username...'
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
            <button type='submit'>Criar Username</button>
        </form>
    </div>
  );
}

export default Username;