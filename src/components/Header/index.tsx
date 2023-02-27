import React from 'react';
import Styles from './Header.module.css'

import {FaGithubSquare, FaInstagramSquare, FaLink} from 'react-icons/fa'

const Header: React.FC = () => {
  return (
    <div className={Styles.container}>
        <h1><span className={Styles.logo}><span id={Styles.logo_}>Super</span>Chat</span></h1>
        <div className={Styles.links}>
            <a href="#"><FaGithubSquare/></a>
            <a href="#"><FaInstagramSquare/></a>
            <a href="#"><FaLink/></a>
        </div>
    </div>
  );
}

export default Header;