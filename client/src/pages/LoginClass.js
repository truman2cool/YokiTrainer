import React from 'react';

export default class LoginClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return ( 
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="input-wrapper">
                        <div>Username</div> 
                        <input className="input" 
                        type="username" 
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={ e => this.setState({ username: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                      <div>Password</div> 
                      <input className="input" 
                      type="password" placeholder="Password" 
                      value={this.state.password} 
                      onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="btn" onClick={() => this.props.logIn({...this.state})}>Sign In</div> 
                </div> 
            </div>
        )
    }
}