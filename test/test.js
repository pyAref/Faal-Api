const axios = require('axios').default;
const fs = require('fs');

// send request to /rfaal and /rfaal/:id
axios.post('http://localhost:8080/rfaal').then(response => {
    console.log(response.data);
});

axios.post('http://localhost:8080/rfaal/2').then(response => {
    console.log(response.data);
});

axios.post('http://localhost:8080/faal/89').then(response => {
    console.log(response.data);
});