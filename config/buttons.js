import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faLink,
  faRobot,
  faSignOutAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    label: "Links",
    path: "/link",
    icon: <FontAwesomeIcon icon={faLink} />
  },
  {
    label: "Statistic",
    path: "/chart-line",
    icon: <FontAwesomeIcon icon={faChartBar} />
  },
  {
    label: "Profile",
    path: "/grav",
    icon: <FontAwesomeIcon icon={faRobot} />
  },
  {
    label: "Contact",
    path: "/envelope",
    icon: <FontAwesomeIcon icon={faEnvelope} />
  },
  {
    label: "Sign Out",
    path: "/sign-out-alt",
    icon: <FontAwesomeIcon icon={faSignOutAlt} />
  }
];

export default navButtons;