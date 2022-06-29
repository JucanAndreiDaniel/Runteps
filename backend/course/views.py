from django.http import HttpResponse, JsonResponse, Http404

from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User

from course.models import Course, Lesson, Exercise, Solution, UserCourse, Code
from course.serializers import (
    CourseSerializer,
    LessonSerializer,
    ExerciseSerializer,
    UserCourseSerializer,
    SolutionSerializer,
    CodeSerializer,
)

# Create your views here.
class Courses(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get(self, _):
        queryset = self.get_queryset()
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

    def get(self, _, pk):
        # use get_object_or_404 to raise 404 if not found
        def get_object(self, pk):
            try:
                return Course.objects.get(pk=pk)
            except Course.DoesNotExist:
                raise Http404("Course does not exist")

        course = get_object(self, pk)
        serializer = CourseSerializer(course)
        return JsonResponse(serializer.data)

    def post(self, request):
        data = request.data
        data.owner = User.objects.get(id=request.user.id)
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)

    def put(self, request, pk):
        course = Course.objects.get(pk=pk)
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)

    def delete(self, request, pk):
        course = Course.objects.get(pk=pk)
        course.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


# class Lessons(APIView):
#     permission_classes = (IsAuthenticated,)

#     def get(self, request):
#         lessons = Lesson.objects.all()
#         serializer = LessonSerializer(lessons, many=True)
#         return JsonResponse(serializer.data)

#     def post(self, request):
#         serializer = LessonSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def put(self, request, pk):
#         lesson = Lesson.objects.get(pk=pk)
#         serializer = LessonSerializer(lesson, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def delete(self, request, pk):
#         lesson = Lesson.objects.get(pk=pk)
#         lesson.delete()
#         return HttpResponse(status=204)


# class Exercises(APIView):
#     permission_classes = (IsAuthenticated,)

#     def get(self, request):
#         exercises = Exercise.objects.all()
#         serializer = ExerciseSerializer(exercises, many=True)
#         return JsonResponse(serializer.data)

#     def post(self, request):
#         serializer = ExerciseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def put(self, request, pk):
#         exercise = Exercise.objects.get(pk=pk)
#         serializer = ExerciseSerializer(exercise, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def delete(self, request, pk):
#         exercise = Exercise.objects.get(pk=pk)
#         exercise.delete()
#         return HttpResponse(status=204)


# class Solutions(APIView):
#     permission_classes = (IsAuthenticated,)

#     def get(self, request):
#         solutions = Solution.objects.all()
#         serializer = SolutionSerializer(solutions, many=True)
#         return JsonResponse(serializer.data)

#     def post(self, request):
#         serializer = SolutionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def put(self, request, pk):
#         solution = Solution.objects.get(pk=pk)
#         serializer = SolutionSerializer(solution, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def delete(self, request, pk):
#         solution = Solution.objects.get(pk=pk)
#         solution.delete()
#         return HttpResponse(status=204)


# class UserCourseView(APIView):
#     permission_classes = (IsAuthenticated,)

#     def get(self, request):
#         user_courses = UserCourse.objects.all()
#         serializer = UserCourseSerializer(user_courses, many=True)
#         return JsonResponse(serializer.data)

#     def put(self, request, pk):
#         user_course = UserCourse.objects.get(pk=pk)
#         serializer = UserCourseSerializer(user_course, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def delete(self, request, pk):
#         user_course = UserCourse.objects.get(pk=pk)
#         user_course.delete()
#         return HttpResponse(status=204)


# class Code(APIView):
#     def get(self, request, pk):
#         code = Code.objects.get(pk=pk)
#         serializer = CodeSerializer(code)
#         return JsonResponse(serializer.data)

#     def put(self, request, pk):
#         code = Code.objects.get(pk=pk)
#         serializer = CodeSerializer(code, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

#     def delete(self, request, pk):
#         code = Code.objects.get(pk=pk)
#         code.delete()
#         return HttpResponse(status=204)
