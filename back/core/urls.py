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
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import stonkapi
from stonkapi.views import *
from django.contrib import admin
from django.urls import path

from rest_framework import routers

router = routers.DefaultRouter()

# router.register(r'user', views.UserViewSet)
# router.register(r'group', views.GroupViewSet)

router.register(r'game', GameViewSet)
router.register(r'server', ServerViewSet)
router.register(r'team', TeamViewSet)
router.register(r'wallet', WalletViewSet)
router.register(r'marketplace', MarketplaceViewSet)
router.register(r'good_blueprint', GoodBlueprintViewSet)
router.register(r'good', GoodViewSet)
router.register(r'good_value_time', GoodValueTimeViewSet)
router.register(r'good_movement', GoodMovementsViewSet)
router.register(r'sell_order', SellOrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
]

# urlpatterns = [
#     path('', include(router.urls)),
#     path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
#     path('api-auth/token/obtain/', TokenObtainPairView.as_view()),
#     path('api-auth/token/refresh/', TokenRefreshView.as_view()),
#     path('admin/', admin.site.urls),
# ]
