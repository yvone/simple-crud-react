import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function BirbForm(props) {
    const initialBirb = {
        name: '',
        birthDate: new Date(),
        isAlive: true,
        sizeInInches: 2,
    }
    const [colors, setColors] = useState([]);
    const [birb, setBirb] = useState(initialBirb);

    const {
        status,
        setStatus,
        handleChangeBirbs,
        handleError,
    } = props;

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        setBirb({
            ...birb,
            [name]: name === 'isAlive' ? checked : value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let action = 'post';
        let url = 'http://localhost:5000/birds';

        axios[action](url, {
                name: birb.name,
                birthDate: birb.birthDate,
                isAlive: birb.isAlive,
                sizeInInches: Number(birb.sizeInInches),
                colors: colors.map(color => color.value),
            })
            .then(result => {
                setStatus('success')
                // Modify birbs array to include new/updated birb
                handleChangeBirbs(result.data);
                // Reset form
                setBirb(initialBirb);
                setColors([]);
            })
            .catch(handleError)
    }

    const optionsColors = [
        { value: 'red', label: 'Red'},
        { value: 'blue', label: 'Blue'},
        { value: 'yellow', label: 'Yellow'},
        { value: 'purple', label: 'Purple'},
        { value: 'orange', label: 'Orange'},
        { value: 'green', label: 'Green'},
        { value: 'white', label: 'White'},
        { value: 'black', label: 'Black'},
        { value: 'gray', label: 'Gray'},
        { value: 'brown', label: 'Brown'},
        { value: 'pink', label: 'Pink'},
        { value: 'turquoise', label: 'Turquoise'},
        { value: 'light green', label: 'Light green'},
        { value: 'light blue', label: 'Light blue'},
    ]

    if(status === 'error') {
        return (
            <p>Oops! something went wrong :(</p>
        );
    }
  
    if(status === 'idle' || status === 'loading') {
        return (
            <p>Loading...</p>
        );
    }

    if(status === 'success') {
        return (
            <form onSubmit={handleSubmit}>
                <span>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        value={birb.name}
                        onChange={handleChange}
                    />
                </span>
                <span>
                    <label htmlFor="birthDate">Birthday</label>
                    <input
                        name="birthDate"
                        type="date"
                        value={birb.birthDate}
                        onChange={handleChange}
                    />
                </span>
                <span>
                    <input
                        name="isAlive"
                        type="checkbox"
                        checked={birb.isAlive}
                        onChange={handleChange}
                    />
                    <label htmlFor="isAlive">Is Alive</label>
                </span>
                <span>
                    <label htmlFor="sizeInInches">Size (In)</label>
                    <input
                        name="sizeInInches"
                        type="range"
                        min="2"
                        max="8"
                        value={birb.sizeInInches}
                        onChange={handleChange}
                    />
                </span>
                <span>
                    <Select
                        isMulti
                        name="colors"
                        options={optionsColors}
                        placeholder="Colors"
                        value={colors}
                        onChange={setColors}
                    />
                </span>
                <button>SAVE</button>
            </form>
        );
    }
}

export default BirbForm;
