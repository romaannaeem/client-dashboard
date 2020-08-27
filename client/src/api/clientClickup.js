import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-duck.herokuapp.com/https://api.clickup.com/api/v2', //! Remember to add cors duck again! ~ https://cors-duck.herokuapp.com/https://api.clickup.com/api/v2
  headers: {
    Authorization: 'pk_10588308_ZSRRQSRF7LYRUKSRY78OVUZS4YZ3PGJC',
  },
});
