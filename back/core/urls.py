"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.conf.urls import include
import stonkapi
from stonkapi import views
from django.contrib import admin
from django.urls import path

from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'user', views.UserViewSet)
router.register(r'group', views.GroupViewSet)

router.register(r'item', views.ItemViewSet)
router.register(r'item_price', views.ItemPriceViewSet)
router.register(r'report', views.ReportViewSet)
router.register(r'transaction', views.TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
