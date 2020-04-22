import React from 'react';

class GoogleAuth extends React.Component {

    state = { isSignedIn: null};

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '943474639860-anrdnnll4jr4kpa5od6d4uu38ts2udm4.apps.googleusercontent.com',
                scope : 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null){
            return<div>Unknown</div>
        } else if(this.state.isSignedIn) {
            return<div>Signed In</div>
        } else {
            return <div>Not signed in</div>
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

export default GoogleAuth