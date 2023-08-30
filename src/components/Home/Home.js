import * as React from 'react';
import './Home.css';
import { Button, Container } from 'react-bootstrap';
import { FormControl, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import { firestore } from '../../firebase';
import { addDoc, getDoc, collection, getCountFromServer } from "firebase/firestore";

function App() {
  const [club, setClub] = React.useState('');
  const [otherClub, setOtherClub] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [lookup, setLookup] = React.useState('');
  const [count, setCount] = React.useState(0); 

  const handleChange = (event) => {
    setClub(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleOtherChange = (event) => {
    setOtherClub(event.target.value);
  }

  const handleLookupChange = (event) => {
    setLookup(event.target.value);
  }

  const keyPress = (e) => {
    if(e.keyCode === 13){
       console.log('value', e.target.value);
       console.log('date.now', new Date());
       console.log('club', club)
       addMember(club === 'other' ? otherClub: club , e.target.value);
       e.target.value = '';
    }
 }

 /*

TO DO:

 - Need to finish collection viewing page/function (maybe add read function into this new page)

 - Fix up UI

  */


  async function readMemberData(docName){
    const read = await getDoc(docName);
    if(read.exists()){
      const readData = read.data();
      console.log(`Member Data: ${JSON.stringify(readData)}`);
    }
  }

  async function addMember(event, id){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = month + '-' + day + '-' + year;
    let AmPm = ' ';
    if(date.getHours() < 12)
      AmPm = 'AM';
    else
      AmPm = 'PM';
    let seconds = ' ';
    if(date.getSeconds() < 10) seconds = '0' + date.getSeconds();
    else seconds = date.getSeconds();
    let minutes = ' ';
    if(date.getMinutes() < 10) minutes = '0' + date.getMinutes();
    else minutes = date.getMinutes();
    const time = ((date.getHours() === 12) ? 12 : date.getHours() % 12) + ':' + minutes + ':' + seconds + ' ' + AmPm;
    const membersCollection = collection(firestore, today+'-'+event);
    const newMemberData = await addDoc(membersCollection, {
      date: today,
      event: event,
      description: description,
      id: id,
      time: time
    });
    console.log(`New member was added at: ${newMemberData.path}`);
  }

  async function submitLookup() {
    const membersCollection = collection(firestore, lookup);
      const snapshot = await getCountFromServer(membersCollection);
      let count = snapshot.data().count;
      console.log('count: ', count);
      setCount(count);
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
            labelId="inputLabel"
            value={club}
            label="Event"
            onChange={handleChange}
          >
            <MenuItem value={'ballroom'}>Ballroom Dance</MenuItem>
            <MenuItem value={'game dev'}>Game Dev</MenuItem>
            <MenuItem value={'greyhats'}>Grey Hats</MenuItem>
            <MenuItem value={'icspark'}>ICSpark</MenuItem>
            <MenuItem value={'panda'}>PANDA</MenuItem>
            <MenuItem value={'switch'}>SWITCH</MenuItem>
            <MenuItem value={'general meeting'}>General Meeting</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
          {club === 'other' && <TextField id="otherClub" label="Other Event Name" variant="outlined" style={{marginTop: '20px'}} onChange={handleOtherChange}/>}
          <TextField id="description" label="Optional Description" variant="outlined" style={{marginTop: '20px'}} onChange={handleDescriptionChange}/>
          <TextField id="uhIdNumber" label="UHM ID Number" variant="outlined" style={{marginTop: '20px'}} onKeyDown={keyPress}/>
        </FormControl>
      </Container>
      <p>Lookup Attendance at an event, please type event date and name. E.g. if event name was "Career Fair" and the event was on May 3, 2023, type "5-3-2023-Career Fair"</p>
      <FormControl>
        <TextField id="lookup count" label="Lookup Attendance" variant="outlined" style={{marginTop: '20px'}} onChange={handleLookupChange}/>
        <Button onClick={submitLookup}>Submit</Button>
        <p>Count: {count}</p>
      </FormControl>
    </div>
  );
}

export default App;
