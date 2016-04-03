export function verifyStorage() {
	return ('localStorage' in window) && (window.localStorage !== null);
}

export function save(data) {
	localStorage["wsid.items"] = data;
	return true;
}

export function load() {
	return localStorage["wsid.items"];
}
