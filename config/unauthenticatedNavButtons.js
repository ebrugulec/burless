import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faGlassCheers, faPollH, faUser, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

const authenticatedNavButtons = [
  {
    label: 'Links',
    path: '/',
    icon: <FontAwesomeIcon icon={faGlassCheers}/>
  },
  {
    label: 'Report',
    path: '/report',
    icon: <FontAwesomeIcon icon={faPollH}/>
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: <FontAwesomeIcon icon={faUser}/>
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: <FontAwesomeIcon icon={faEnvelope}/>
  },
  {
    label: 'Login',
    path: '/login',
    icon: <FontAwesomeIcon icon={faSignInAlt}/>
  },
];

export default authenticatedNavButtons
