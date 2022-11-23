import React from 'react';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email: '',
            fullname: '',
            password: '',

        }
    }

    handleUsernameInput = e =>{
        this.setState({username : e.target.value});
    }
    handleEmailInput = e =>{
        this.setState({email: e.target.value});
    }

    handleFullnameInput = e =>{
        this.setState({fullname : e.target.value});
    }
    handlePasswordInput = e =>{
        this.setState({password : e.target.value});
    }

    render() {
        return (
            <div className="sign-in-wrapper">
                <div className="form">
                <div className="input-wrapper">
                        <div>Username</div> 
                        <input className="input" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameInput } />
                    </div>
                    <div className="input-wrapper">
                        <div>Email Address</div> 
                        <input className="input" type="text" placeholder="Email Address" value={this.state.email} onChange={ this.handleEmailInput } />
                    </div>
                    <div className="input-wrapper">
                      <div>Full Name</div> 
                      <input className="input" type="text" placeholder="Full Name" value={this.state.fullname} onChange={this.handleFullnameInput} />
                    </div>
                    <div className="input-wrapper">
                      <div>Password</div> 
                      <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordInput} />
                    </div>                   
            
                    <div className="btn" onClick={() => this.props.signUp({...this.state})}>Sign Up</div> 
                </div> 
            </div>
        )
    }
}