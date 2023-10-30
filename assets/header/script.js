// document.addEventListener('DOMContentLoaded', function () {
//   // Read the user's email from the cookie
//   const cookies = document.cookie.split('; ');
//   let userEmail = '';
//   for (const cookie of cookies) {
//       const [name, value] = cookie.split('=');
//       if (name === 'userEmail') {
//           userEmail = value;
//           break;
//       }
//   }

//   if (userEmail) {
//       // User is signed in, replace "Sign Up" with user's email
//       updateHeader(userEmail);
//   } else {
//       // User is not signed in, keep "Sign Up" link
//       updateHeaderSignUp();
//   }

//   displayCookies(cookies);
// });

// function displayCookies(cookies) {
//   const cookieDisplay = document.getElementById('cookieDisplay');
//   if (cookieDisplay) {
//       const cookiesList = cookies.map(cookie => {
//           const [name, value] = cookie.split('=');
//           return `${name}: ${value}`;
//       });

//       cookieDisplay.innerHTML = cookiesList.join('<br>');
//   }
// }

// function updateHeader(email) {
//   const headerRight = document.getElementById('headerRight');
//   headerRight.innerHTML = `
//       <a href="/">Home</a>
//       <a href="/stats/">Statistics</a>
//       <a href="/About">About</a>
//       <span>${email}</span>
//       <a href="javascript:signOut()">Sign Out</a>
//   `;
// }

// function updateHeaderSignUp() {
//   const headerRight = document.getElementById('headerRight');
//   headerRight.innerHTML = `
//       <a href="/">Home</a>
//       <a href="/stats/">Statistics</a>
//       <a href="/About">About</a>
//       <a href="/sign_in">Sign Up</a>
//   `;
// }

// <script>
// const resultContainer = document.getElementById("result");

// function fetchData() {
//   resultContainer.innerHTML = "";

//   const filterInput = document.getElementById("filterInput");
//   const filter = filterInput.value;

//   const url = "https://" + encodeURIComponent(filter);
//   const headers = {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'default',
//     credentials: 'omit',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   };

//   fetch(url, headers)
//     .then(response => {
//       if (response.status !== 200) {
//         const errorMsg = 'Database response error: ' + response.status;
//         console.log(errorMsg);
//         const tr = document.createElement("tr");
//         const td = document.createElement("td");
//         td.innerHTML = errorMsg;
//         tr.appendChild(td);
//         resultContainer.appendChild(tr);
//         return;
//       }

//       response.json().then(data => {
//         console.log(data);

//       for (const row of data.results) {
//           console.log(row);

//           const tr = document.createElement("tr");

//           const artist = document.createElement("td");
//           const track = document.createElement("td");
//           const image = document.createElement("td");
//           const preview = document.createElement("td");

//           artist.innerHTML = row.artistName;
//           track.innerHTML = row.trackName; 
//           const img = document.createElement("img");
//           img.src = row.artworkUrl100;
//           image.appendChild(img);

//           const audio = document.createElement("audio");
//           audio.controls = true;
//           const source = document.createElement("source");
//           source.src = row.previewUrl;
//           source.type = "audio/mp4";
//           audio.appendChild(source);
//           preview.appendChild(audio);

//           tr.appendChild(artist);
//           tr.appendChild(track);
//           tr.appendChild(image);
//           tr.appendChild(preview);

//           resultContainer.appendChild(tr);
//         }
//       })
//     })
//     .catch(err => {
//       console.error(err);
//       const tr = document.createElement("tr");
//       const td = document.createElement("td");
//       td.innerHTML = err;
//       tr.appendChild(td);
//       resultContainer.appendChild(tr);
//     });
// }
// </script>


// function signOut() {
//   // Remove the "userEmail" cookie
//   document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

//   // Redirect to the sign-in page or any other desired page
//   window.location.href = '/sign_in';
// }

<script>
const resultContainer = document.getElementById("result");

function fetchData() {
  resultContainer.innerHTML = "";

  const filterInput = document.getElementById("filterInput");
  const filter = filterInput.value;

  const url = "https://" + encodeURIComponent(filter);
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
</script>
