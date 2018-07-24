import axios from 'axios';
import URL from '../configs/url';

function apiCaller (method, endPoint, data, headers=null) {
    return (
            axios.request({
                method,
                url: `${URL}${endPoint}`,
                data,
                headers
            })
    )
}

export default apiCaller;