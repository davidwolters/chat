

export const baseURL = 'http://www.davidkodar.nu/chat/index.php/'


export const sendRequest = (action, params, callback) => {
	const formData = new FormData()
	formData.append('action', action)

	Object.entries(params).forEach(([k, v]) => formData.append(k, v))

	const requestOptions = {
		method: 'POST',
		body: formData,
		redirect: 'follow',
	}

	fetch('http://www.davidkodar.nu/chat/index.php', requestOptions)
		.then(response => response.text())
		.then(result => {callback(JSON.parse(result))})
		.catch(error => {console.log(error)});
}
