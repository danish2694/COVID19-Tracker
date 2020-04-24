from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from App import worldData,indiaData
from django.http import JsonResponse

def test(request):
	return HttpResponse("Hello")

def index(request):
	return HttpResponseRedirect('/map/india')

def map(request,m):
	covidCases = worldData.data()
	data = covidCases['cases']
	worldList = ['country','totalCases','deaths','recovered']
	cases = []
	for j in data:
		k = [j[i] for i in worldList if i in j]
		cases.append(k)
		# print(len(cases))
	worldCases = cases[4]
	
	if m == 'india':
		indiaList = ['state','confirmed','active','recovered','deaths']
		cases1 = []
		indCases =indiaData.data()
		for p in indCases:
			r = [p[q] for q in indiaList if q in p]
			cases1.append(r)

		totalCases = cases1[0]
		totalConfirmed = totalCases[1]
		totalActive = totalCases[2]
		totalRecovered = totalCases[3]
		totalDead = totalCases[4]
		stateCases = cases1[1:]
	    # print(indiaCases)
		params = {"cases":cases[4:217],"total":worldCases[1],"dead":worldCases[2],
	    "recover":worldCases[3],"stateCases":stateCases,"totalCases":totalCases,
	    "totalConfirmed":totalConfirmed,"totalActive":totalActive,"totalRecovered":totalRecovered,
	    "totalDead":totalDead}
		return render(request,'india.html',params)
	
	elif m == 'world':
		indCases =indiaData.data()
		
		params = {"cases":cases[4:217],"total":worldCases[1],"dead":worldCases[2],"recover":worldCases[3]}

		return render(request,'worldmap.html',params)
	else:
		return HttpResponseRedirect('/')
	# return render(request,"map.html")

def worlddata(request):
	global covidCases
	covidCases = worldData.data()
	response = JsonResponse(covidCases)
	# print(covidCases)
	return HttpResponse(response)

