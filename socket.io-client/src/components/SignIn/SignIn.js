import React, { Component } from 'react';
import './SignIn.scss';

// React Router Dom
import { Redirect } from 'react-router-dom';
// Use validation form
import Validation from '../../utils/validation';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailValid: true,
            plainPassword: '',
            plainPasswordValid: true,
            signIn: [],
            verifySignIn: this.props.verifySignIn
        }
    }

    // Kiểm tra form có valid hay không
    validateEmail = () => {
        let { email } = this.state;
        // Email
        if (!Validation.isNotEmpty(email) || !Validation.isEmail(email)) {
            this.setState({
                emailValid: false
            })
        }
        else {
            this.setState({
                emailValid: true
            })
        }
    }

    validatePassword = () => {
        let { plainPassword } = this.state;
        // Password
        if (!Validation.isNotEmpty(plainPassword) || !Validation.isPassword(plainPassword, 6)) {
            this.setState({
                plainPasswordValid: false
            })
        }
        else {
            this.setState({
                plainPasswordValid: true
            })
        }
    }

    // Lấy dữ liệu từ form vào state
    onHandleChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onHandleSubmit = event => {
        event.preventDefault();
        let { email, plainPassword } = this.state;
        // Nếu thông tin không valid thì không được submit
        if (Validation.isNotEmpty(email, plainPassword) &&
            Validation.isEmail(email)) {
            // Thực hiện đăng nhập
            this.props.onSignIn({
                email: email,
                plainPassword: plainPassword
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        // Phải đăng nhập thành công
        if (nextProps.signIn.length > 0 && nextProps.signIn[0].signInUser) {
            // Set sign in data vào state
            this.setState({
                signIn: nextProps.signIn
            })
            // Lưu token
            localStorage.setItem('token', nextProps.signIn[0].signInUser.token)
        }
    }

    componentDidMount() {
        document.title = 'Sign In'
    }
    

    // Hiện thông báo lỗi
    displayIncorectInfo() {
        let { signIn } = this.props;
        let result = null;
        // Nếu sai thông tin đăng nhập thì hiện thông báo lỗi
        if (signIn.length > 0 && !signIn[0].success) {
            result = (
                "Incorect Email Or Password, Please Try Again !"
            )
        }
        return result;
    }

    render() {
        // Nếu đã đăng nhập thành công thì redirect qua chat component
        if (this.props.signIn.length > 0 && this.props.signIn[0].success ||
            this.props.verifySignIn.length > 0 && this.props.verifySignIn[0].success) {
            return <Redirect to='/message' />
        }
        let { email, emailValid, plainPassword, plainPasswordValid } = this.state;
        return (
            <React.Fragment>
                <section
                    className={
                        (this.props.signIn.length > 0 && !this.props.signIn[0].success) ?
                            "signin__warning bg-danger animated slideInDown" :
                            "signin__warning--empty"
                    }
                >
                    {this.displayIncorectInfo()}
                </section>
                <section className="container signin animated zoomIn">
                    <header className="signin__title">Sign In</header>
                    <div className="signin__content">
                        <form className="form-group row">
                            <input
                                type="text"
                                className="form-control signin__input col-12"
                                style={emailValid ? {} : { borderColor: 'red', color: 'red' }}
                                name="email"
                                placeholder="Email"
                                onChange={this.onHandleChange}
                                onBlur={this.validateEmail}
                                onFocus={() => { this.setState({ emailValid: true }) }}
                                value={email}
                                required
                            />
                            <i
                                className="fas fa-envelope signin__icon col-12"
                                style={emailValid ? {} : { color: 'red' }}>
                            </i>
                            <input
                                type="password"
                                className="form-control signin__input"
                                style={plainPasswordValid ? {} : { borderColor: 'red', color: 'red' }}
                                onFocus={() => { this.setState({ plainPasswordValid: true }) }}
                                name="plainPassword"
                                placeholder="Password"
                                onChange={this.onHandleChange}
                                onBlur={this.validatePassword}
                                value={plainPassword}
                                required
                            />
                            <i className="fas fa-lock signin__icon"
                                style={plainPasswordValid ? {} : { color: 'red' }}>
                            </i>
                            <input type="submit"
                                value="Sign In"
                                className="form-control btn btn-primary signin__button col-12"
                                disabled={(Validation.isNotEmpty(email, plainPassword) &&
                                    Validation.isEmail(email) &&
                                    Validation.isPassword(plainPassword, 6)) ? false : true}
                                onClick={this.onHandleSubmit}
                            />
                        </form>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default SignIn;