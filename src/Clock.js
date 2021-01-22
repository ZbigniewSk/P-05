import React from 'react';


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        const date = this.state.date.toLocaleTimeString();

        return(
            <div>
                <h1>Witaj świecie!</h1>
                <h2>
                Aktualny czas: {date}.
                </h2>
             </div>
        );
    }
}

export default Clock;