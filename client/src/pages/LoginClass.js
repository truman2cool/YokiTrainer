import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    logUser = () =>{
        console.log(this.state.username);
        console.log(this.state.password);
    }

    handleUsernameInput = e =>{
        this.setState({username : e.target.value});
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
                        <input className="input" 
                        type="text" 
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleUsernameInput} />
                    </div>
                    <div className="input-wrapper">
                      <div>Password</div> 
                      <input className="input" 
                      type="password" placeholder="Password" 
                      value={this.state.password} 
                      onChange={this.handlePasswordInput} />
                    </div>
                    <div className="btn" onClick={()=> this.props.logIn(this.state.username, this.state.password)}>Sign In</div> 
                </div> 
            </div>
        )
    }
}