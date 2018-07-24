import React, { Component } from 'react';
import './Home.scss';

import avatar from '../../assets/img.jpg';

class Home extends Component {
    componentDidMount() {
        document.title = "Home Page"
    }
    

    render() { 
        return (
            <div className="home">
                <div className="home__container">
                    <div className="card">
                        <div className="card-body">
                            <div className="home__avatar">
                                <img src={avatar} style={{width: '25%', borderRadius:'100px'}}/>
                            </div>
                            <h5 className="card-title">Tạ Đăng Được</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Fresher Developer</h6>
                            <p className="card-text">
                                Hello, my name is Được. I'm looking for fullstack Javascript ( NodeJS - ReactJS ) developer jobs,
                                as I mention in my CV, I haven't worked in any IT company, so that's mean I have no experience,
                                therefore I make this simple project, to help you guys can understand basically my abilities.
                                This is just a simple global chat website, you just need sign up an account then sign in, so you can chat with each others.
                            </p>
                            <a href="https://github.com/dangduoc08/socket.io" className="card-link" target="_blank">
                                Link To Source Code
                            </a>
                            <p className="card-text mb-2">
                                If you also looking for fresher developer and want to give me chance, please contact me:<br/>
                                <strong>Phone number: 0983978757</strong><br/>
                                <strong>
                                    Email:<a href='mailto:duoc200894@gmail.com'> duoc200894@gmail.com</a>
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;