import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './Main.scss';

// Config Routes
import { routes } from '../../configs/routes';

class Main extends Component {
    mapRoute = () => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route key={index} path={route.path} component={route.main} exact={route.exact} />
                )
            })
        }
        return result
    }

    render() {
        return (
            <main className="container-fluid main">
                <Switch>
                    {this.mapRoute()}
                </Switch>
            </main>
        );
    }
}

export default Main;