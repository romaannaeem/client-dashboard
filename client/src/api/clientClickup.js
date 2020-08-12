import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.clickup.com/api/v2', //! Remember to add cors anywhere again! ~ https://cors-anywhere.herokuapp.com/https://api.clickup.com/api/v2
  headers: {
    Authorization: 'pk_10562356_NUYQBFZ3D521WGB1FHFVO52LLSBCPF6Q',
  },
});
