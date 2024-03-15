import * as React from 'react';
import './Home.css';
import { Button, Card, Container } from 'react-bootstrap';
import { FormControl, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import { firestore } from '../../firebase';
import { addDoc, getDoc, getDocs, collection, getCountFromServer  } from "firebase/firestore";
import BgImage from "../../img/AttendanceTrackerimg.jpeg";

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

  async function addMember(event, value){
    const date = new Date();
    const today = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    const membersCollection = collection(firestore, today+'-'+event);
    let dupeCount;
    dupeCount = 0;
    const querySnapshot = await getDocs(membersCollection);
    querySnapshot.forEach((doc) =>
    {
      if(doc.data().id === value.trim())
      {
        dupeCount++;
      }
    })
    console.log("dupe count: %d",dupeCount);
    if(dupeCount === 0)
    {
      let AmPm = ' ';
      if (date.getHours() < 12)
        AmPm = 'AM';
      else
        AmPm = 'PM';
      let seconds = ' ';
      if (date.getSeconds() < 10) seconds = '0' + date.getSeconds();
      else seconds = date.getSeconds();
      let minutes = ' ';
      if (date.getMinutes() < 10) minutes = '0' + date.getMinutes();
      else minutes = date.getMinutes();
      const time = ((date.getHours() === 12) ? 12 : date.getHours() % 12) + ':' + minutes + ':' + seconds + ' ' + AmPm;
      const newMemberData = await addDoc(membersCollection, {
        date: today,
        event: event,
        description: description,
        id: value,
        time: time
      });
      console.log(`New member was added at: ${newMemberData.path}`);
    }
    else
    {
      console.log("Member unable to add, duplicates found: %d", dupeCount);
    }
  }

  async function submitLookup() {
    const membersCollection = collection(firestore, lookup);
      const snapshot = await getCountFromServer(membersCollection);
      let count = snapshot.data().count;
      console.log('count: ', count);
      setCount(count);
  }

  return (
    // eslint-disable-next-line react/style-prop-object
    <div className="App" style={{
        backgroundImage: `url(${BgImage}`,
        backgroundSize: 'cover'
    }}>
          <Container style={{ padding: '20px' }}>
            <Card>
              <Card.Body>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1 }}>
                    <h1 style={{ fontFamily: 'courier', fontSize: "60px", marginLeft: 'auto', marginRight: "auto", marginTop: "80px" }}>ACM</h1>
                    <h1 style={{ fontFamily: 'courier', fontSize: "60px", marginLeft: 'auto', marginRight: "auto" }}>Attendance Tracker</h1>
                  </div>
                  <div className={'right-side-Card'} style={{ flex: 1 }}>
                    <div className="top-section">
                      <h2 style={{ marginLeft: 'auto', marginRight: 'auto', textDecoration: 'underline' }}>Scan-In</h2>
                      <p style={{ marginLeft: "auto", marginRight: "auto" }}>Please select an event. After selecting an event click the UHM ID Number box and start scanning IDs. </p>
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
                        {club === 'other' && <TextField id="otherClub" label="Other Event Name" variant="outlined" style={{ marginTop: '20px' }} onChange={handleOtherChange}/>}
                        <TextField id="description" label="Optional Description" variant="outlined" style={{ marginTop: '20px' }} onChange={handleDescriptionChange}/>
                        <TextField id="uhIdNumber" label="UHM ID Number" variant="outlined" style={{ marginTop: '20px' }} onKeyDown={keyPress}/>
                      </FormControl>
                    </div>
                    <div className="bottom-section" style={{marginTop: '15px'}}>
                      <h2 style={{ marginRight: 'auto', marginLeft: 'auto', textDecoration: 'underline' }}>Attendee Counter</h2>
                      <p style={{ fontSize: "30px" }}>Count: {count}</p>
                      <FormControl>
                        <div>
                          <TextField id="lookup count" label="Lookup Attendance" variant="outlined" style={{ marginBottom: '10px' }} onChange={handleLookupChange}/>
                          <p style={{ fontSize: "10px", marginLeft: "5px", marginRight: "5px" }}>Lookup Attendance at an event, please type event date and name. E.g. if event name was "Career Fair" and the event was on May 3, 2023, type
                            "5-3-2023-Career Fair"</p>
                        </div>
                        <div>
                          <button className="submitButton" onClick={submitLookup}>Submit</button>
                          {/*<p>Count: {count}</p>*/}
                        </div>
                      </FormControl>
                    </div>
                  </div>

                </div>

              </Card.Body>
            </Card>
          </Container>
    </div>
  );
}

export default App;
