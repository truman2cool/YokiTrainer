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

    render() {
        return (
            <div className="sign-in-wrapper">
                <div className="form">
                <div className="input-wrapper">
                        <div>Username</div> 
                        <input className="input" type="text" placeholder="Username" value={this.state.username} onChange={ e => this.setState({ username: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                        <div>Email Address</div> 
                        <input className="input" type="text" placeholder="Email Address" value={this.state.email} onChange={ e => this.setState({ email: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                      <div>Full Name</div> 
                      <input className="input" type="text" placeholder="Full Name" value={this.state.fullname} onChange={e => this.setState({ fullname: e.target.value })} />
                    </div>
                    <div className="input-wrapper">
                      <div>Password</div> 
                      <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>                   
            
                    <div className="btn" onClick={() => this.props.signUp({...this.state})}>Sign Up</div> 
                </div> 
            </div>
        )
    }
}