# Generated by Django 4.2.4 on 2023-08-09 17:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('transactions_Api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]