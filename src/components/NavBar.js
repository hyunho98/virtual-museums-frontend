import React from 'react'
import { NavLink, BrowserRouter } from 'react-router-dom'

const linkStyles = {
    display: "inline-block",
    width: "15vh",
    padding: "12px",
    margin: "0 6px 6px",
    background: "grey",
    textDecoration: "none",
    color: "black",
}

function NavBar() {
    return (
        <div>
            <NavLink
                to="/"
                exact
                style={ linkStyles }>
                Home
            </NavLink>
        </div>
    )

}

export default NavBar