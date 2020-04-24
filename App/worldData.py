def data():
	import requests
	from bs4 import BeautifulSoup
	url = 'https://www.worldometers.info/coronavirus/'

	r = requests.get(url)
	soup = BeautifulSoup(r.content, 'html5lib')

	countryData = {}

	tableBody = soup.find_all("tbody")
	for data in tableBody:
		row = data.find_all("tr")[3:]
		for finalData in row:
			country = finalData.find_all("td")[0].text
			totalCases = finalData.find_all("td")[1].text
			newCases = finalData.find_all("td")[2].text
			deaths = finalData.find_all("td")[3].text
			newDeaths = finalData.find_all("td")[4].text
			recovered = finalData.find_all("td")[5].text
			activeCases = finalData.find_all("td")[6].text
			seriousCritical = finalData.find_all("td")[7].text
			totalTests = finalData.find_all("td")[10].text
			
			# print(country,totalCases,newCases,deaths,newDeaths,recovered,activeCases,seriousCritical,totalTests)

			key = "cases"
			countryData.setdefault(key,[])
			countryData[key].append({"country":country,"totalCases":totalCases,"newCases":newCases,
				"deaths":deaths,"newDeaths":newDeaths,"recovered":recovered,"activeCases":activeCases,
				"seriousCritical":seriousCritical,"totalTests":totalTests})
	return countryData
	# print(countryData)

	# file = open('countriesSorted.json','w')
	# json.dump(countries, file)

# print(data())