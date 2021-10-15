import csv,io
from django.shortcuts import render
from django.contrib import messages
from api.models import Profile
# Create your views here.
from api.serializers import ProfileSerializer
from rest_framework import routers, viewsets
from rest_framework.response import Response

def datesplit(date):
    date = date.split(" ")
    if date[1]=="Sep":
        return "September "+date[2]
    else:
        return "October "+date[2]
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
     for column in csv.reader(io_string, skipinitialspace=True):
            _, created = Profile.objects.update_or_create(
            studentname=column[0],
            studentemail=column[1],
            institution=column[2],
            date_joined=datesplit(column[3]),
            EntrolmentStatus=column[4],
            qwicklabsurl=column[5],
            track1=column[6],
            track2=column[7],
            defaults={"studentname":column[0]},
        )
     context = {}
     return render(request, template, context)
     
################################################################
 
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.order_by('track1' , 'track2').reverse()
    serializer_class = ProfileSerializer  
# class statusViewSet(viewsets.ViewSet):
#     def list(self, request):
#         queryset =  Profile.objects.all()
#         serializer = ProfileSerializer(queryset, many=True)
#         bothtracks=int()
#         anyonetrack=int()
#         for i in serializer.data:
#             if i['track1']==6 and i['track2']==6:
#                 bothtracks+=1
#             if i['track1']==6 or i['track2']==6:
#                 anyonetrack+=1
#         return Response(
#             {
#             'bothtracks':bothtracks,
#             'anyonetrack':anyonetrack,
#             'time':"October 27"
#             }
#             )
    
router = routers.DefaultRouter()
router.register('Profile', ProfileViewSet)
# router.register('status',statusViewSet,basename='status')