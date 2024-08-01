export const getAccessToken = () => {
    const authenticationJSON = localStorage.getItem('authentication');
    
    if (authenticationJSON == null || authenticationJSON == 'null') {
        return '';
    }

    const authenticationData = JSON.parse(authenticationJSON);
    return authenticationData.accessToken;
}

async function get(url){
    const options = {};
    options.method = 'GET';

    //const accessToken = localStorage.getItem('accessToken');
    const accessToken = getAccessToken();
    //console.log('accessToken ' + accessToken);

    if(accessToken){
        options.headers = {};
        options.headers['X-Authorization'] = accessToken;
    }
    
    //console.log('options');
    //console.log(options);

    const response = await fetch(url, options);
    if (response.status == 204) {
        return;
    }

    const result = response.json();
    
    return result;
}

async function getUnauthorised(url){
    const options = {};
    options.method = 'GET';

    const response = await fetch(url, options);
    if (response.status == 204) {
        return;
    }

    const result = response.json();
    
    return result;
}

async function post(url, data){
    const options = {};
    options.method = 'POST';

    options.headers = {
        'Content-Type': 'application/json'
    };

    //const accessToken = localStorage.getItem('accessToken');
    const accessToken = getAccessToken();
    
    if(accessToken){
        options.headers['X-Authorization'] = accessToken;
    }

    options.body = JSON.stringify(data);
    
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
        // console.log('here in result');
        // console.log(result);
        throw result;
    }

    return result;
}

export default {
    get,
    post,
    getUnauthorised
};
