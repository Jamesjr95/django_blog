from pyexpat import model
from rest_framework import serializers
from django.contrib.auth import get_user_model

from posts.models import Post

class NestedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'created', 'updated', 'body')
        
class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

class PostSerializer(serializers.ModelSerializer):
    author_detail = NestedUserSerializer(read_only=True, source='author')
    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'author_detail', 'created', 'updated', 'body')
        
class UserSerializer(serializers.ModelSerializer):
    posts_detail = NestedPostSerializer(many=True, source='posts', read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'posts', 'posts_detail')