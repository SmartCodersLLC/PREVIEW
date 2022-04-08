import React from "react";
import { NavLink } from "react-router-dom";
import { appName } from "../../Service/http";
import { FileResultIcon } from "../Icons/FileResultIcon";

import styles from "./menuItem.module.css";

export default function MenuItem({ menu, hovered, handleHover }) {
  return (
    <NavLink
      to={`${appName}/${menu.path}`}
      className={styles.menuItem}
      onMouseEnter={() => handleHover(menu.id)}
      onMouseLeave={() => handleHover(0)}
    >
      <p>{menu.id}</p>
      <h3>{menu.title}</h3>
      <FileResultIcon isActive={hovered === menu.id ? true : false} />
    </NavLink>
  );
}
