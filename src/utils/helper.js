export function idToShortURL(n) {
	let a = n.split("-")
	let s = ""
	let p = [6, 3, 3, 3, 9]
	for (let i = 0; i < a.length; i++) {
		let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let shorturl = [];
		let t = a[i]
		t = parseInt(t, 16)
		while (t) {
			shorturl.push(map[t % 62]);
			t = Math.floor(t / 62);
		}
		shorturl.reverse();
		s += shorturl.join("").padStart(p[i], 'a');
	}
	return s
}

export function shortURLtoID(shortURL) {
	let p = [6, 3, 3, 3, 9]
	let padZeros = [8, 4, 4, 4, 12]
	let x = []
	let s = 0
	for (let k = 0; k < p.length; k++) {
		let l = shortURL.slice(s, (s + p[k]))
		x.push(l)
		s += p[k]
	}
	let z = ""
	for (let j = 0; j < x.length; j++) {
		let id = 0;
		for (let i = 0; i < x[j].length; i++) {
			if ('a' <= x[j][i] && x[j][i] <= 'z')
				id = id * 62 + x[j][i].charCodeAt(0) - 'a'.charCodeAt(0);
			if ('A' <= x[j][i] && x[j][i] <= 'Z')
				id = id * 62 + x[j][i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
			if ('0' <= x[j][i] && x[j][i] <= '9')
				id = id * 62 + x[j][i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
		}
		z += id.toString(16).padStart(padZeros[j], 0) + "-"
	}
	return z.slice(0, -1);
}

export function dateParser(date) {
	var date = date.replace(/-/g, "/")
	var date = new Date(date);
	let d = date.toLocaleString('zh-HK', { timeZone: 'Asia/Macau', hour12: false });
	d = d.slice(0, -3)
	if (d.includes("24:00")) {
		d = d.slice(0, -5)
	}
	let td = d.split(" ")
	let dr = td[0].split("/").reverse().join("/");
	return dr + " " + td[1]
}

export function newsIDtoURL(date, id) {
	//publishDate + itemId (2022-08-25T00:00:00+08:00 + 53981) into 20220825-53981
	return date.replace(/-/g, "").slice(0, 8) + "-" + id
}

/*
export function URLtoNewsDate(url) {
	//url:id 20220825-53981 into 2022-08-25T00:00:00+08:00 + 53981 (publishDate + itemId)
	let date = url.split("-")[0]
	let datetime = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8)+"T00:00:00"
	let id = url.split("-")[1]
	return [datetime, id]
}
*/