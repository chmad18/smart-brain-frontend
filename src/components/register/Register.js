import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            name: "",
            password: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    } 

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    } 

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    } 

    onSubmitRegister = () => {
        fetch('https://salty-plateau-25318.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type' :'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
            })
        }).then(response => response.json().then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                alert('Unable to register')
            }
        }))
    }

    render() {
        return (
            <main className="pa4 black-80 center">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            onChange={this.onEmailChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="username">Name</label>
                            <input 
                            onChange={this.onNameChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            onChange={this.onPasswordChange} 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"/>
                        </div>
                    </fieldset>
                        <div className="">
                            <input 
                            onClick={this.onSubmitRegister} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Register" />
                        </div>                      
                        <div className="lh-copy mt3">
                            <p 
                            onClick={() => this.props.onRouteChange('signin')} 
                            className="f6 link dim black db pointer">
                            Sign in</p>
                        </div>
                </div>
            </main>
        );
    }
}
export default Register;