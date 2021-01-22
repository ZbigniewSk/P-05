import React from 'react';

function LoginButton(props) {
    return(
        <button onClick={props.onClick}>
            Zaloguj się
        </button>
    );
}

function LogoutButton(props) {
    return(
        <button onClick={props.onClick}>
            Wyloguj się
        </button>
    );
}

function UserGreeting(props) {
    return <h1>Witamy witamy ponownie</h1>;
}

function GuestGreeting(props) {
    return <h1>Zarejestruj się</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLoginClick() {
        this.setState({
            isLoggedIn: true,
        });
    }
    handleLogoutClick() {
        this.setState({
            isLoggedIn: false,
        });
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if(isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

export default LoginControl;