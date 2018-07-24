import React, { Component } from 'react';
import './Header.scss';

// Containers
import NavContainer from '../../redux/containers/Nav-Container';

class Header extends Component {
    render() {
        return (
            <header className="container-fluid header">
                <NavContainer />
            </header>
        );
    }
}

export default Header;