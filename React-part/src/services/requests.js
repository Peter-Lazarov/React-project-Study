async function get(url){
    const options = {};
    options.method = 'GET';

    //const accessToken = localStorage.getItem('accessToken');
    //const accessToken = getAccessToken();
    
    const accessToken = '';
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

async function post(url, data, accessToken){
    const options = {};
    options.method = 'POST';

    options.headers = {
        'Content-Type': 'application/json'
    };

    options.body = JSON.stringify(data);

    options.credentials = 'include';
    
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
        // console.log('here in result');
        // console.log(result);
        throw result;
    }

    return result;
}

async function postWithCredentials(url, data, accessToken){
    const options = {};
    options.method = 'POST';

    options.headers = {
        'Content-Type': 'application/json'
    };
    
    if(accessToken){
        options.headers['X-Authorization'] = accessToken;
    }

    options.body = JSON.stringify(data);

    options.credentials = 'include';
    
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
        // console.log('here in result');
        // console.log(result);
        throw result;
    }

    return result;
}

async function putWithCredentials(url, data, accessToken){
    const options = {};
    options.method = 'PUT';

    options.headers = {
        'Content-Type': 'application/json'
    };

    if(accessToken){
        options.headers['X-Authorization'] = accessToken;
    }

    options.body = JSON.stringify(data);
    
    options.credentials = 'include';

    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
        throw result;
    }
    return result;
}

async function deleteWithCredentials(url, data, accessToken){
    const options = {};
    options.method = 'DELETE';

    options.headers = {
        'Content-Type': 'application/json'
    };
    
    if(accessToken){
        options.headers['X-Authorization'] = accessToken;
    }

    options.body = JSON.stringify(data);

    options.credentials = 'include';
    
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
        throw result;
    }

    return result;
}

export default {
    get,
    getUnauthorised,
    post,
    postWithCredentials,
    putWithCredentials,
    deleteWithCredentials
};
