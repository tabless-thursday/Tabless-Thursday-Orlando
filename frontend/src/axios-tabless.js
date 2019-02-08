import axios from 'axios';

const instace = axios.create({
    baseURL: 'http://tabless-thursday-env.492axjrfys.us-east-2.elasticbeanstalk.com/'
})

export default instace;