import React from 'react';

class FormName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Lucek",
            novel: "Napisz wypracowanie o niczym",
            select: Array(0).fill(null),
            isGoing: true,
            numberOfGuests: 2,
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleChangeInput(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleChangeText(event) {
        this.setState({
            novel: event.target.value,
        });
    }

    handleChangeSelect(event) {
        if(event.target.value === "Reset") {
            this.setState({
                select: Array(0).fill(null),
            })
        } else {  
            this.setState({
                select: [...this.state.select].concat(event.target.value),
            });
        }
    }

    handleSubmit(event) {
        alert("Podano następujące imię: " + this.state.value
             + "\nI wypracowanie: " + this.state.novel
              + "\nWybrałeś smak: " + this.state.select
               + "\nLiczba gości: " + this.state.numberOfGuests + ",  Wybiera się: " + this.state.isGoing);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Imię
                    <input type="text" onChange={this.handleChangeInput} value={this.state.value} />
                    </label>
                    <input type="submit" value="Wyślij" />
                </div>
                <div>
                    <label>
                    <div>Wypracowanie o niczym: </div>
                    <textarea value={this.state.novel} onChange={this.handleChangeText} />
                    </label>
                </div>
                <div>
                    <label>
                        <div>Wybierz se jake lubisz: </div> 
                        <select multiple={true} value={this.state.select} onChange={this.handleChangeSelect} >
                            <option value="Gumowate">Gumowate</option>
                            <option value="Zylaste">Żylaste</option>
                            <option value="Rozlazle">Rozlazłe</option>
                            <option value="Ciapowate">Ciapowate</option>
                            <option value="Reset">Reset</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Wybiera się? 
                        <div></div>
                        <input name="isGoing"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleChange}
                         />
                    </label>
                    <br/>
                    <label>
                        Liczba gości: 
                        <div></div>
                        <input name="numberOfGuests" 
                            type="number"
                            value={this.state.numberOfGuests}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
            </form>
        );
    }
}

export default FormName;