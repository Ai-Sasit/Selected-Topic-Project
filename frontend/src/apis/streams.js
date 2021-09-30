import axios from 'axios';

export default axios.create({
    baseURL: 'https://likestream-42add-default-rtdb.asia-southeast1.firebasedatabase.app/'
})