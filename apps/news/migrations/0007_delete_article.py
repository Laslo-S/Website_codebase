# Generated by Django 5.2 on 2025-04-06 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0006_article"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Article",
        ),
    ]
