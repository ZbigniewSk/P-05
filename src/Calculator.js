import React from 'react';

const scaleNames = {
    c: "Celsjuszach",
    f: "Fahrenheitach",
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if(Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>Woda bedzie się gotować.</p>;
    }
    return <p>Woda nie będzie się gotować.</p>;
}

class TemperatureImput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        this.props.onTemperatureChange(event.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Podaj temperaturę w {scaleNames[scale]}: </legend>
                <input 
                    value={temperature}
                    onChange={this.handleChange}
                />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: "",
            scale: "c",
        };
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheiChange = this.handleFahrenheiChange.bind(this);
    }

    handleCelsiusChange(temperature) {
        this.setState({
            temperature,
            scale: "c",
        });
    }

    handleFahrenheiChange(temperature) {
        this.setState({
            temperature,
            scale: "f",
        });
    }
    

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureImput 
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureImput 
                    scale="f" 
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheiChange}
                />
                <BoilingVerdict 
                    celsius={parseFloat(celsius)}
                />
            </div>
        );
    }
}

export default Calculator;