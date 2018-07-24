import React, { Component } from 'react';
import './SignUp.scss';
// Use validation form
import Validation from '../../utils/validation';
// Redirect
import { Redirect } from 'react-router-dom';
// Image
import noAvatar from '../../assets/noAvatar.jpg'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            firstNameValid: true,
            lastName: '',
            lastNameValid: true,
            email: '',
            emailValid: true,
            plainPassword: '',
            plainPasswordValid: true,
            selectedFile: null,
            imagePreview : '',
            signUp: []
        }
    }

    // Kiểm tra form có valid hay không
    validateFirstname = () => {
        let {firstName} = this.state;
        // First name
        if (!Validation.isNotEmpty(firstName)) {
            this.setState({
                firstNameValid: false
            })
        }
        else {
            this.setState({
                firstNameValid: true
            })
        }
    }
    validateLastname = () => {
        let {lastName} = this.state;
        // Last name
        if (!Validation.isNotEmpty(lastName)) {
            this.setState({
                lastNameValid: false
            })
        }
        else {
            this.setState({
                lastNameValid: true
            })
        }
    }
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
        if (!Validation.isNotEmpty(plainPassword) || !Validation.isPassword(plainPassword,6)) {
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

    // Set dữ liệu vào form
    onHanleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        if (target.files !== null) {
            this.setState({
                selectedFile: target.files[0],
                imagePreview: URL.createObjectURL(target.files[0])
            })
        }
        else 
            this.setState({
                [name]: value
            })
    }

    // Xử lý submit
    onHandleSubmit = (event) => {
        event.preventDefault();
        let { firstName, lastName, email, plainPassword, selectedFile } = this.state;
        let formData = new FormData ();
        formData.append ('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('plainPassword', plainPassword);
        formData.append('avatar', selectedFile);
        // Nếu form hợp lệ thì mới được submit
        if (Validation.isNotEmpty(firstName, lastName, email, plainPassword) &&
            Validation.isEmail(email) &&
            Validation.isPassword(plainPassword,6)
        ) {
            // Thực hiện đăng ký
            this.props.onSignUp(formData)
        }
    }

    // Set lại state nếu props thay đổi
    componentWillReceiveProps(nextProps) {
        // Nếu success thì mới set state
        if (nextProps.signUp[0].success) {
            this.setState({
                signUp: nextProps.signUp
            })
            // Điều hướng tới trang success
            this.props.history.push({
                pathname: '/signup/success',
                state: {
                    from: this.props.history.location.pathname
                }
            })
        }
    }

    componentDidMount() {
        document.title = 'Sign Up'
    }

    // Hiện thông báo lỗi
    displayIncorectInfo() {
        let { signUp } = this.props;
        let result = null;
        // Nếu sai thông tin đăng nhập thì hiện thông báo lỗi
        if (signUp.length > 0 && !signUp[0].success) {
            result = (
                "This Email Already Registered, Please Try Another Email !"
            )
        }
        return result;
    }

    render() {
        let { firstName, 
            firstNameValid, 
            lastName, 
            lastNameValid, 
            email, 
            emailValid, 
            plainPassword, 
            plainPasswordValid,
            imagePreview } = this.state;
        // Nếu đã đăng nhập thành công thì redirect qua chat component
        if (this.props.signIn.length > 0 && this.props.signIn[0].success ||
            this.props.verifySignIn.length > 0 && this.props.verifySignIn[0].success) {
            return <Redirect to='/message' />
        }
        return (
            <React.Fragment>
                <section
                    className={
                        (this.props.signUp.length > 0 && !this.props.signUp[0].success) ?
                            "signup__warning bg-danger animated slideInDown" :
                            "signup__warning--empty"
                    }
                >
                    {this.displayIncorectInfo()}
                </section>
                <section className="container signup animated zoomIn">
                    <header className="signup__title">Sign Up</header>
                    <div className="signup__content">
                        <form className="form-group row">
                            <input
                                type="text"
                                className="form-control signup__input signup__input--inline col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                                style={firstNameValid ? {} : { borderColor: 'red' }}
                                name="firstName"
                                placeholder="First Name"
                                onChange={this.onHanleChange}
                                onBlur={this.validateFirstname}
                                onFocus={() => { this.setState({ firstNameValid: true }) }}
                                value={firstName}
                                required
                            />
                            <input
                                type="text"
                                className="form-control signup__input signup__input--left signup__input--inline col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                                style={lastNameValid ? {} : { borderColor: 'red' }}
                                name="lastName"
                                placeholder="Last Name"
                                onChange={this.onHanleChange}
                                onBlur={this.validateLastname}
                                onFocus={() => { this.setState({ lastNameValid: true }) }}
                                value={lastName}
                                required
                            />
                            <input
                                type="email"
                                className="form-control signup__input col-12"
                                style={emailValid ? {} : { borderColor: 'red', color: 'red' }}
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={this.onHanleChange}
                                onBlur={this.validateEmail}
                                onFocus={() => { this.setState({ emailValid: true }) }}
                                required
                            />
                            <input
                                type="password"
                                className="form-control signup__input col-12"
                                style={plainPasswordValid ? {} : { borderColor: 'red', color: 'red' }}
                                name="plainPassword"
                                placeholder="Password"
                                value={plainPassword}
                                onChange={this.onHanleChange}
                                onBlur={this.validatePassword}
                                onFocus={() => { this.setState({ plainPasswordValid: true }) }}
                                required
                            />
                            <img
                                className="col-2"
                                src={imagePreview ? imagePreview : noAvatar}
                                style={{height: '100%', margin: '.5% 0 .5% 0'}}/>
                            <input
                                type="file"
                                onChange={this.onHanleChange}
                                className="from-control-file signup__input col-xl-9 col-lg-9 col-md-8 col-sm-8 col-7"
                                style={{paddingLeft: '0px'}}
                            />
                            <input type="submit"
                                value="Sign Up"
                                className="btn btn-primary signup__button col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3"
                                disabled={(Validation.isNotEmpty(firstName, lastName, email, plainPassword) &&
                                    Validation.isEmail(email) &&
                                    Validation.isPassword(plainPassword,6)) ? false : true}
                                onClick={this.onHandleSubmit}
                            />
                        </form>
                        <span className="alert alert-danger">* Only upload images on localhost.</span>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default SignUp;