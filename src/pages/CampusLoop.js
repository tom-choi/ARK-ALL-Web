import * as React from "react";
import { NavLink } from "react-router-dom";

export default function CampusLoop() {
  let activeStyle = {
    textDecoration: "underline"
  };

  let activeClassName = "underline"

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="messages"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/campus-loop">
            {
            ({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                Tasks
              </span>
              )
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}