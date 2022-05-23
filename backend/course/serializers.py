from rest_framework import serializers
from course.models import *
from datetime import datetime

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username']



class ExerciseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=500)
    lesson = serializers.IntegerField()
    exercise_type = serializers.CharField(max_length=50)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    solved = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return Exercise.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.exercise_type = validated_data.get(
            "exercise_type", instance.exercise_type
        )
        instance.updated_at = datetime.now()
        instance.solved = validated_data.get("solved", instance.solved)
        instance.save()
        return instance

    def get_solution(self, obj):
        if obj.solution:
            return SolutionSerializer(obj.solution).data
        else:
            return None

    class Meta:
        model = Exercise
        fields = (
            "id",
            "name",
            "description",
            "lesson",
            "exercise_type",
            "created_at",
            "updated_at",
            "solved",
            # "solution",
        )


class LessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=500)
    course = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    # exercises = ExerciseSerializer(many=True)

    def get_exercises(self, obj):
        return ExerciseSerializer(obj.exercises.all(), many=True).data

    def create(self, validated_data):
        return Lesson.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

    class Meta:
        model = Lesson
        fields = (
            "id",
            "name",
            "description",
            "course",
            "created_at",
            "updated_at",
            # "exercises",
        )


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=500)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    owner = UserSerializer()
    # lessons = LessonSerializer(many=True)

    def create(self, validated_data):
        return Course.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

    def get_lessons(self, obj):
        return LessonSerializer(obj.lessons.all(), many=True).data

    class Meta:
        model = Course
        fields = (
            "id",
            "name",
            "description",
            "created_at",
            "updated_at",
            "owner",
            # "lessons",
        )


class SolutionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    exercise = ExerciseSerializer()
    content = serializers.CharField(max_length=500)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def create(self, validated_data):
        return Solution.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get("content", instance.content)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

    class Meta:
        model = Solution
        fields = ("id", "exercise", "content", "created_at", "updated_at")


class CodeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    code = serializers.CharField(max_length=8000)
    language = serializers.CharField(max_length=50)
    input = serializers.CharField(max_length=500)
    owner = UserSerializer()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def create(self, validated_data):
        return Code.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.code = validated_data.get("code", instance.code)
        instance.language = validated_data.get("language", instance.language)
        instance.input = validated_data.get("input", instance.input)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

    class Meta:
        model = Code
        fields = (
            "id",
            "code",
            "language",
            "input",
            "owner",
            "created_at",
            "updated_at",
        )


class UserCourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer()
    course = CourseSerializer()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def create(self, validated_data):
        return UserCourse.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.course = validated_data.get("course", instance.course)
        instance.updated_at = datetime.now()
        instance.save()
        return instance

    class Meta:
        model = UserCourse
        fields = ("id", "user", "course", "created_at", "updated_at")
