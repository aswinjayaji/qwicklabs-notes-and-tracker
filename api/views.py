import csv,io
from django.shortcuts import render
from django.contrib import messages
from api.models import Profile
# Create your views here.
from api.serializers import ProfileSerializer
from rest_framework import routers, viewsets


def csvupload(request):
     template = 'csvupload.html'
     data = Profile.objects.all()
     prompt = {
        'order': 'Order of the CSV should be name,email,institution,date_joined,EntrolmentStatus,qwicklabsurl,track1,track2',
        'profiles': data    
              }
     if request.method == 'GET':
         return render(request, template, prompt)
     csv_file = request.FILES['file']
     if not csv_file.name.endswith('.csv'):
            messages.error(request, 'THIS IS NOT A CSV FILE')
     data_set = csv_file.read().decode('UTF-8')
     io_string = io.StringIO(data_set)
     next(io_string)
     for column in csv.reader(io_string, delimiter=',', quotechar="|"):
            print(type(column[0]))
            _, created = Profile.objects.update_or_create(
            studentname=column[0],
            studentemail=column[1],
            institution=column[2],
            date_joined=column[3],
            EntrolmentStatus=column[4],
            qwicklabsurl=column[5],
            track1=column[6],
            track2=column[7]
        )
     context = {}
     return render(request, template, context)
     
################################################################
 
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer  

router = routers.DefaultRouter()
router.register('Profile', ProfileViewSet)