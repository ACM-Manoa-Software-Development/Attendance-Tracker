import * as React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { FormControl, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import { firestore } from '../../firebase';
import { doc, setDoc, addDoc, getDoc, collection } from "firebase/firestore";

function App() {
  /*****************
   * lines 13-23 are used for time display in the memberData functions
   *****************/
  const [club, setClub] = React.useState('');
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const today = day + '/' + month + '/' + year;
  let AmPm = ' ';
  if(date.getHours() < 12)
    AmPm = 'AM';
  else
    AmPm = 'PM';
  const time = (date.getHours() % 12) + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + AmPm;
  const membersCollection = collection(firestore, 'members');

  const handleChange = (event) => {
    setClub(event.target.value);
  };

  const keyPress = (e) => {
    if(e.keyCode === 13){
       console.log('value', e.target.value);
       console.log('date.now', new Date());
       console.log('club', club)
       addMember(club, e.target.value);
       e.target.value = '';
    }
 }

 /*

 Need to finish collection viewing function

  */

  async function readMemberData(docName){
    const read = await getDoc(docName);
    if(read.exists()){
      const readData = read.data();
      console.log(`Member Data: ${JSON.stringify(readData)}`);
    }
  }

  async function addMember(event, id){
    const newMemberData = await addDoc(membersCollection, {
      date: today,
      event: event,
      id: id,
      time: time
    });
    console.log(`New member was added at: ${newMemberData.path}`);
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
            <MenuItem value={'game dev'}>Game Dev</MenuItem>
            <MenuItem value={'greyhats'}>Grey Hats</MenuItem>
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
