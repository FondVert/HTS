/**
 * @param cookieName {string}
 * @param cookies object where cookies are
 * @return la valeur du cookie 'cookie name'
 */
module.exports = (cookieName,cookies)=>{
	let output;
	if(cookies){
		cookies.split(';').forEach(cookie => { // séparer les cookies entre eux
			let params = cookie.split('='); // séparer le nom et la valeur
			if(params[0].trim()==cookieName){
				output = params[1].trim();
			}
		});
	}
	return output
}