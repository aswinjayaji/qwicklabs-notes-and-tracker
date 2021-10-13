from django.db import models

# Create your models here.

class Profile(models.Model):
    studentname = models.CharField(max_length=100)
    studentemail = models.EmailField(max_length=100)
    institution = models.CharField(max_length=100)
    date_joined = models.CharField(max_length=100)
    EntrolmentStatus = models.CharField(max_length=100)
    qwicklabsurl=models.CharField(max_length=100)
    track1=models.IntegerField()
    track2=models.IntegerField()
    def __str__(self):
        return self.studentname