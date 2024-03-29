# Generated by Django 4.2.4 on 2023-08-08 03:49

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('accound_id', models.AutoField(primary_key=True, serialize=False)),
                ('account_number', models.IntegerField(validators=[django.core.validators.MinLengthValidator(12), django.core.validators.MaxLengthValidator(12)])),
                ('current_balance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id_account', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
