def data():
	import requests
	url = 'https://api.covid19india.org/data.json'

	response = requests.request("GET",url)
	x = response.json()
	y =x['statewise']
	return y