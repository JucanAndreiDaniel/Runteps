
from django.urls import path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('course/',views.Courses.as_view()),
    path('course/<int:pk>/',views.Courses.as_view()),
    path('code/<int:pk>/',views.Code.as_view()),
    path('userCourse/',views.UserCourseView.as_view()),
    path('userCourse/<int:pk>/',views.UserCourseView.as_view()),

    

]