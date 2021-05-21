import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPollH, faGlassCheers, faUser, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
    label: 'Sign Out',
    path: '/signout',
    icon: <FontAwesomeIcon icon={faSignOutAlt}/>
  },
];

export default authenticatedNavButtons
