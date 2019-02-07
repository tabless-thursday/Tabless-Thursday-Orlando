import axios from 'axios';

const instace = axios.create({
    baseURL: 'https://jm020801tablessthursday.herokuapp.com/'
})

export default instace;