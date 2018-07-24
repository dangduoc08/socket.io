import React, { Component } from 'react';
import './SignInUp.scss';

// React Router Dom
import { NavLink } from 'react-router-dom';

// Config Links
import { links } from '../../../configs/links';

class SignInUp extends Component {
    render() {
        return (
            links.map((link, index) => {
                if (link.className === 'nav-text') {
                    return (
                        <li className="nav-item" key={index}>
                            <span className={link.className}>
                                {link.label}
                            </span>
                        </li>
                    )
                }
                else
                    return (
                        < li className="nav-item" key={index}>
                            <NavLink
                                className={link.className}
                                to={link.to}
                                exact={link.exact}
                                activeClassName={link.activeClassName}
                            >
                                {link.label}
                            </NavLink>
                        </li >
                    )
            })
        )
    }
}

export default SignInUp;