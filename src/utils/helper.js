export function idToShortURL(n)
{
    let a = n.split("-")
    let s = ""
    for (let i = 0; i < a.length; i++){
        let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    let shorturl = [];
	    let t = a[i]
	    t=parseInt(t, 16)
	    while (t)
	        {
		    shorturl.push(map[t % 62]);
		    t = Math.floor(t / 62);
	        }
	    shorturl.reverse();
	    s += shorturl.join("") + "-";
    }
    return s
}

export function shortURLtoID(shortURL) {
    shortURL = shortURL.slice(0,-1)
    let x = shortURL.split("-")
    let z = ""
    for (let j = 0; j < x.length; j++){
        let id = 0;
	    for (let i = 0; i < x[j].length; i++) {
		    if ('a' <= x[j][i] && x[j][i] <= 'z')
			    id = id * 62 + x[j][i].charCodeAt(0) - 'a'.charCodeAt(0);
		    if ('A' <= x[j][i] && x[j][i] <= 'Z')
			    id = id * 62 + x[j][i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
		    if ('0' <= x[j][i] && x[j][i] <= '9')
			    id = id * 62 + x[j][i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
	    }
    	z += id.toString(16) + "-"
    }
	return z;
}
