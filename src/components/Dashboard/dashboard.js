import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
  const [status, setStatus] = useState('idle');
  const [birbs, setBirbs] = useState([]);

  useEffect(() => {
    setStatus('loading')
    axios
      .get('http://192.168.100.9:5000/birds')
      .then(result => {
        setStatus('success')
        setBirbs(result.data)
      })
      .catch(err => {
        setStatus('error')
      })
  }, []);

  const resetForm = ({ name, birthDate, isAlive, sizeInInches, colors }) => {
    name.value = "";
    birthDate.value = "";
    isAlive.checked = false;
    sizeInInches.value = "";
    colors.value = "";
  }

  const handleError = (error) => {
    setStatus('error')
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(`[${error.response.status}]: "${error.response.data}"`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config.data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      birthDate,
      isAlive,
      sizeInInches,
      colors,
    } = event.target.elements;

    axios
      .post('http://192.168.100.9:5000/birds', {
        name: name.value,
        birthDate: birthDate.value,
        isAlive: isAlive.checked,
        sizeInInches: Number(sizeInInches.value),
        colors: colors.value.split(','),
      })
      .then(result => {
        setStatus('success')
        setBirbs([
          ...birbs,
          result.data
        ])
        resetForm({ name, birthDate, isAlive, sizeInInches, colors })
      })
      .catch(handleError)
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://192.168.100.9:5000/birds/${id}`)
      .then(result => {
        setStatus('success')
        setBirbs([
          ...birbs.filter(birb => birb._id !== id),
        ])
      })
      .catch(handleError)
  }

  if(status === 'error') {
    return (
      <div className="layout">Oops! something went wrong :(</div>
    );
  }
  
  if(status === 'idle' || status === 'loading') {
    return (
      <div className="layout">Loading...</div>
    );
  }

  if(status === 'success') {
    return (
      <nav className="layout">
        <section className="crud-section">
          <h1>Hey look! Birbs!</h1>
          <div className="content">
            <ul>
              {birbs.map(birb => (
                <li key={birb._id}>
                  <p>{birb.name}</p>
                  <button onClick={() => handleDelete(birb._id)}>
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="crud-section">
          <h1>Let's add more!</h1>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <span>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                />
              </span>
              <span>
                <label htmlFor="birthDate">Birthday</label>
                <input
                  name="birthDate"
                  type="date"
                />
              </span>
              <span>
                <input
                  name="isAlive"
                  type="checkbox"
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
                />
              </span>
              <span>
                <label htmlFor="colors">Colors (separated by commas, no spaces)</label>
                <input
                  name="colors"
                />
              </span>
              <button>SAVE</button>
            </form>
          </div>
        </section>
      </nav>
    );
  }
}

export default Dashboard;
