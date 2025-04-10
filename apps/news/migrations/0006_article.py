# Generated by Django 5.2 on 2025-04-05 19:36

import django.db.models.deletion
import django.utils.timezone
import django_ckeditor_5.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0005_alter_newspost_content"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                (
                    "slug",
                    models.SlugField(max_length=250, unique_for_date="publish_date"),
                ),
                (
                    "content",
                    django_ckeditor_5.fields.CKEditor5Field(verbose_name="Content"),
                ),
                (
                    "publish_date",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("updated_date", models.DateTimeField(auto_now=True)),
                ("is_published", models.BooleanField(default=False)),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="news_articles",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ("-publish_date",),
                "indexes": [
                    models.Index(
                        fields=["-publish_date"], name="news_articl_publish_345e4d_idx"
                    )
                ],
            },
        ),
    ]
