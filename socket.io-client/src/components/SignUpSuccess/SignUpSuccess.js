import React, { Component } from 'react';
import './SignUpSuccess.scss';

// React Router Dom
import { NavLink, Redirect } from 'react-router-dom';

class SignUpSuccess extends Component {
    constructor (props) {
        super(props);
        this.state = {
            signUp : this.props.signUp
        }
    }

    componentDidMount() {
        document.title = "Welcome"
    }
    

    fetchWelcomeName () {
        let result = null;
        if (this.state.signUp.length > 0) {
            result = this.props.signUp.map ((info,index) => {
                return (
                    <header className="signup-success__title" key={index}>
                        Welcome {info.signUpUser.firstName} {info.signUpUser.lastName}
                    </header>
                )
            })
        }
        return result;
    }
    
    render() {
        // Nếu không phải từ trang sign up chuyển tới thì redirect về home
        if (this.props.location.state === undefined) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <section className="container signup-success">
                <i className="far fa-check-circle text-success animated zoomIn"></i>
                <div className="signup-success__content">
                    <header className="signup-success__title">
                        {this.fetchWelcomeName()}
                    </header>
                    <div className="signup-success__text">
                        Thanks for sign up my website.
                    </div>
                    <NavLink className="signup-success__link" to="/" exact>
                        <i className="fas fa-long-arrow-alt-left"></i>
                        Back To Home
                    </NavLink>
                </div>
            </section>
        )
    }
}

export default SignUpSuccess;