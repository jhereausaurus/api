module.exports = (request, response) => {

    const APIKEY = request.headers['x-api-key']
    
    if(!APIKEY)
        return response.response('Access Required').code(404).takeover()

    if(process.env.SECRET_API_KEY !== APIKEY)
       return response.response('Invalid Access').code(404).takeover()

    return APIKEY    
}

