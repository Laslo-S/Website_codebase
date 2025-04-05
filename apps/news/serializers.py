from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User

class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username') # Display author username

    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'slug',
            'author', # Keep author ID for write operations (e.g., associating submitted article)
            'author_username', # Read-only field for display
            'content',
            'publish_date',
            'is_published',
            'created_date',
            'updated_date',
        ]
        read_only_fields = ['slug', 'author_username', 'created_date', 'updated_date'] # Slug might be auto-generated or set server-side

    def create(self, validated_data):
        # Automatically set the author based on the requesting user
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data) 