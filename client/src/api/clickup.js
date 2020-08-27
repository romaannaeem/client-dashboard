import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-duck.herokuapp.com/https://api.clickup.com/api/v2', //! Remember to add cors duck again! ~ https://cors-duck.herokuapp.com/https://api.clickup.com/api/v2
  headers: {
    Authorization: '1495561_c50210781cfaf81dd192910d5835967f670e3cc0',
  },
});
