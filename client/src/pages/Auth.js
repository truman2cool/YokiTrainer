import React from 'react';
import SignupClass from './SignupClass';
import LoginClass from './LoginClass';
import axios from 'axios';
import store from '../store/store';
import Toast from '../pages/Toast';
//import './Auth.css';

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'login',
            showToast: false
        }
    }

   
    logIn = (username,password) => { 
        axios.post('/login', {username, password}).then(res => {
            if(res.data.success){
                console.log(res);
                store.dispatch({
                    type: 'login',
                    _id: res.data.user._id,
                    user: res.data.user,
                    token: res.data.token
                })
                console.log(store.getState());
            }else {
                this.setState({
                    showToast: true
                });
                setTimeout(() => {
                    this.setState({showToast: false})
                }, 3000);
            }
            }).catch(er=>{
                this.setState({
                    showToast: true
                });
                setTimeout(() => {
                    this.setState({showToast: false})
                }, 3000);
            })
    }


    signUp = ({username, email, fullname, password}) => {
        axios.post('/signup', {username, email, fullname, password},{headers:{"Content-Type": "application/json"}}).then(res => {
            if (res.data.success) {
                this.setState({tab: 'login'});
            }
            console.log(res.data);
        }).catch(er => {
            console.log(er);
        })
    }

    changeTab = () => {
        this.setState({
            tab: this.state.tab === 'signup' ? 'login' : 'signup'
        });
    }

    render() {
        let page = this.state.tab === 'login' ? <LoginClass logIn={this.logIn} /> : <SignupClass signUp={this.signUp} />
        return (
            <div className="auth-wrapper">
            <Toast model={this.state.showToast} message="Incorrect login" backgroundColor="#FF4539" />
                <div className="left">
                    <img src="https://freesvg.org/img/chemist.png" alt='idk'/>
                </div>
                <div className="right">
                    <div className="header">Yoki Trainer</div>
                    <div className="sub-header">Welcome </div>
                    {page}
                    <div className="new" onClick={this.changeTab}>{this.state.tab === `login` ? `Don't have an account? Sign up here` : `Already have an account with us? Sign in`}</div>
                </div>
            </div>
        )
    };
}