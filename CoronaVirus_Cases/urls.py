"""CoronaVirus_Cases URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from App import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('test/',views.test,name='test'),
    path('',views.index,name='index'),
    path('worlddata/',views.worlddata,name='worlddata'),
    # path('map/<str:m>',views.map,name='map'),
    # path('graphOne/',views.graphOne,name='graphOne'),
    # path('allgraphs/',views.allgraphs,name='allgraphs'),
    # path('graph/',views.graph,name='graph'),
    # path('globe/',views.globe,name='globe'),
    path('globe_data/',views.globe_data,name='globe_data'),

] 