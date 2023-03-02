import * as React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { FormControl, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import { firestore , setDoc, doc} from '../../firebase';
//import * as constants from 'constants';
export const members = doc(firestore, '/members');

function App() {
  const [club, setClub] = React.useState('');

  const handleChange = (event) => {
    setClub(event.target.value);
  };

  const keyPress = (e) => {
    if(e.keyCode === 13){
       console.log('value', e.target.value);
       console.log('date.now', new Date());
       console.log('club', club)
       e.target.value = '';
    }
 }

 //problem is somewhere between 27-41, possible also line 7

  function writeMemberData(event, id){
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = day + '/' + month + '/' + year;
    const time = date.getTime();
    const docData = {
      date: today,
      event: this.event,
      id: this.id,
      time: time
    };
    setDoc(members, docData);
  }

  return (
    <div className="App" style={{ backgroundColor: "rgb(48, 185, 253)"}}>
      <h1 style={{ fontFamily: 'courier'}}>Attendance Tracker</h1>
      <p>Please select an event. After selecting an event click the UHM ID Number box and start scanning IDs. </p>
      <Container style={{ padding: '20px' }}>
        <FormControl>
          <InputLabel id="inputLabel">Event</InputLabel>
          <Select
            id="clubChoice"
            value={club}
            label="Club Name"
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
          <TextField id="uhIdNumber" label="UHM ID Number" variant="outlined" style={{marginTop: '20px'}} onKeyDown={keyPress}/>
        </FormControl>
      </Container>
    </div>
  );
}

export default App;
