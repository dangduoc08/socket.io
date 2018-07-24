import React, { Component } from 'react';
import './Nav.scss';

import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

class Nav extends Component {
    render() {
        return (
            <nav className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <Link to="/">
                            <img className="logo" src={logo} alt='logo' />
                        </Link>
                    </div>
                    <ul className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 nav justify-content-end">
                        {this.props.children}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;