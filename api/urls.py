from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('posts', views.PostViewSet, basename='posts')
router.register('users', views.UserViewSet, basename='users')

urlpatterns = router.urls + [
    path('current-user/', views.CurrentUserView.as_view())
]

