// import logo from '/favicon.ico';
// import './style/scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
// import { useState, useEffect } from 'react';

// function App() {
//     const [ searchInput, setSearchInput ] = useState("");

//     return {
//         <div className="App">
//             <Container>
//                 <InputGroup className="mb-3" size="lg">
//                     <FormControl
//                         placeholder="Search for Artist"
//                         type="input"
//                         onKeyPress={event => {
//                             if (event.key == "Enter") {
//                                 console.log("Pressed Enter");
//                             }
//                         }}
//                         onChange={event => setSearchInput(event.target.value)}
//                     />
//                     <Button onClick={() => {console.log("Clicked Button")}}>
//                         Search
//                     </Button>
//                 </InputGroup>
//             </Container>
//             <Container>
//                 <Row className="mx-2 row row-cols-4">
//                     <Card>
//                         <Card.Img src="#" />
//                         <Card.Body>
//                             <Card.Title>Album Name Here</Card.Title>
//                         </Card.Body>
//                     </Card>
//                 </Row>
//             </Container>
//         </div>
//     };
// }

// export default App;

const resultContainer = document.getElementById("result");

function fetchData() {
  resultContainer.innerHTML = "";

  const filterInput = document.getElementById("filterInput");
  const filter = filterInput.value;

  const url = "https://api.spotify.com/v1/search" + encodeURIComponent(filter);
  const headers = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  fetch(url, headers)
    .then(response => {
      if (response.status !== 200) {
        const errorMsg = 'Database response error: ' + response.status;
        console.log(errorMsg);
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerHTML = errorMsg;
        tr.appendChild(td);
        resultContainer.appendChild(tr);
        return;
      }

      response.json().then(data => {
        console.log(data);

      for (const row of data.results) {
          console.log(row);

          const tr = document.createElement("tr");

          const artist = document.createElement("td");
          const track = document.createElement("td");
          const image = document.createElement("td");
          const preview = document.createElement("td");

          artist.innerHTML = row.artistName;
          track.innerHTML = row.trackName; 
          const img = document.createElement("img");
          img.src = row.artworkUrl100;
          image.appendChild(img);

          const audio = document.createElement("audio");
          audio.controls = true;
          const source = document.createElement("source");
          source.src = row.previewUrl;
          source.type = "audio/mp4";
          audio.appendChild(source);
          preview.appendChild(audio);

          tr.appendChild(artist);
          tr.appendChild(track);
          tr.appendChild(image);
          tr.appendChild(preview);

          resultContainer.appendChild(tr);
        }
      })
    })
    .catch(err => {
      console.error(err);
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.innerHTML = err;
      tr.appendChild(td);
      resultContainer.appendChild(tr);
    });
}