import * as React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { FormControl, MenuItem, Select } from '@mui/material';

function App() {
  const [club, setClub] = React.useState('');

  const handleChange = (event) => {
    setClub(event.target.value);
    console.log(club);
  };

  return (
    <div className="App" style={{ backgroundColor: "rgb(48, 185, 253)"}}>
      <h1 style={{ fontFamily: 'courier'}}>Clubs Menu</h1>
      <Container>
        <FormControl>
        <h1 style={{ fontFamily: 'courier'}}>Club Choice:</h1>
          <Select
            id="clubChoice"
            value={club}
            label="club"
            onChange={handleChange}
          >
            <MenuItem value={'ballroom'}>Ballroom Dance</MenuItem>
            <MenuItem value={'game'}>Game Dev</MenuItem>
            <MenuItem value={'grey'}>Grey Hats</MenuItem>
            <MenuItem value={'icspark'}>ICSpark</MenuItem>
            <MenuItem value={'panda'}>PANDA</MenuItem>
            <MenuItem value={'switch'}>SWITCH</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
        </FormControl>
        <div><h2>UHM ID:</h2></div>
        <form>
          <label>
            <button style={{backgroundColor: "white",
	                          padding: "15px 32px",
	                          fontSize: "20px",
	                          transitionDuration: "0.4s",
                            border: "2px solid #000000",
                            borderRadius: "8px",
                            fontFamily: 'Comic Sans MS'}}>Submit
            </button>
          </label>
        </form>
      </Container>
    </div>
    
  );
}

export default App;
