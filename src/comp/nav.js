import React, { Component } from 'react';
import {menuitem} from "./menuitem.js"
import "./nav.css"
class nav extends Component{
  render() {
    return(
      <nav className="NavItem">
            <h1 className="navlogo">React</h1>
              <div classNam="menuico">

              </div>
                <ul>
                  {menuitem.map((item,index)=>{
                      return(
                          <li key={index}>
                              <a className={menuitem.cName} href={item.url}>
                                {item.title}
                              </a>
                          </li>
                      )
                  })}
                </ul>
      </nav>
    )
  }
}

export default nav
