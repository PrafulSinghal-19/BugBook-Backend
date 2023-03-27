const axios=require("axios");

module.exports.github_oauth = async (req, res) => {
    let response = await axios.post('https://github.com/login/oauth/access_token', { 'client_id': process.env.GITHUB_CLIENT_ID, 'client_secret': process.env.GITHUB_SECRET_KEY, 'code': req.body.code }, { headers: { 'Accept': 'application/json' }, })
 
    response = await axios.get("https://api.github.com/user", { headers: { 'Authorization': 'Bearer ' + response.data.access_token } })
    
    return res.json(response.data);
}
