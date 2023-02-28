import React from 'react';
import Styles from './Header.module.css'

import {FaGithubSquare, FaInstagramSquare, FaLink} from 'react-icons/fa'

const Header: React.FC = () => {
  return (
    <div className={Styles.container}>
        <h1><span className={Styles.logo}><span id={Styles.logo_}>Super</span>Chat</span></h1>
        <div className={Styles.links}>
            <a href="https://github.com/miqueiasbelfort"><FaGithubSquare/></a>
            <a href="https://www.instagram.com/miqueiasbelfort/"><FaInstagramSquare/></a>
            <a href="https://miqueiasbelfort.netlify.app/"><FaLink/></a>
        </div>
    </div>
  );
}

export default Header;