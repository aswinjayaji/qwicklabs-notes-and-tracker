async function getUsers() {
  let url = 'https://a30daysofgooglecloud.herokuapp.com/Profile/';
  try {
      let res = await fetch(url);
      console.log(res);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
async function renderUser() {
  const colors=[" #DB4437"," #4285F4","#0F9D58","#F4B400","#FF3B30","#9C27B0","#2196F3","#009688","#FF9800","#795548","#607D8B","#E91E63","#9E9E9E","#F44336","#3F51B5","#2196F3","#4CAF50","#FFEB3B","#FFC107","#FF5722","#795548","#607D8B","#E91E63","#9E9E9E","#F44336","#3F51B5","#2196F3","#4CAF50","#FFEB3B","#FFC107","#FF5722","#795548","#607D8B","#E91E63","#9E9E9E","#F44336","#3F51B5","#2196F3","#4CAF50","#FFEB3B","#FFC107","#FF5722","#795548","#607D8B","#E91E63","#9E9E9E","#F44336","#3F51B5","#2196F3","#4CAF50","#FFEB3B","#FFC107","#FF5722","#795548","#607D8B"];
  let apiResult = await getUsers();
  const container = document.getElementById('iteratorcard');
  let i = 0,j=0;
  apiResult.forEach((result) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'project-box-wrapper';
    
let content =
`<div class='project-box-wrapper'>
<div class="project-box" style="background-color:${colors[i]} ">
  <div class="project-box-header">
    <span>Date Joined: ${result.date_joined}</span>
    <div class="more-wrapper">
      <button class="project-btn-more">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-more-vertical"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    </div>
  </div>
  <div class="project-box-content-header">
    <p class="box-content-header">${result.studentname}</p>
    <p class="box-content-subheader">${result.EntrolmentStatus}</p>
  </div>
  <div class="box-progress-wrapper">
    <p class="box-progress-header">Track 1</p>
    <div class="box-progress-bar">
      <span
        class="box-progress"
        style="width: ${parseInt((result.track1/6)*100)}%; background-color: #7F00FF"
      ></span>
    </div>
    <p class="box-progress-percentage">${parseInt((result.track1/6)*100)}%</p>
  </div>
  <div class="box-progress-wrapper">
    <p class="box-progress-header">Track 2</p>
    <div class="box-progress-bar">
      <span
        class="box-progress"
        style="width: ${parseInt((result.track2/6)*100)}%; background-color: #7F00FF"
      ></span>
    </div>
    <p class="box-progress-percentage">${parseInt((result.track2/6)*100)}%</p>
  </div>
  <div class="project-box-footer">
    <button class="days-left" >
    <a href="${result.qwicklabsurl}">Visit Profile</a>
    </button>
  </div>
</div>
</div>`;
    if(j<150){
      j++;
      if(i==3)
        i=0;
      else
        i++;
      container.innerHTML+=content;
    }
    
  });
}


async function getstatus() {
  let url = 'https://a30daysofgooglecloud.herokuapp.com/status/';
  try {
      let res = await fetch(url);
      console.log(res);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function renderstatus(){
  const containerstatus = document.getElementById('track-status');
  const containertime=document.getElementById('time');
  let statusapiResult = await getstatus();
  console.log(statusapiResult);
    let content =`
      <div class="item-status">
       <span class="status-number">${statusapiResult.bothtracks}</span>
        <span class="status-type">Completed Both Tracks</span>
      </div>
      <div class="item-status">
        <span class="status-number">${statusapiResult.anyonetrack}</span>
        <span class="status-type">Completed Any One Track</span>
      </div>
    `;
  containertime.innerHTML=`Date of Completion: ${statusapiResult.time}`;
  containerstatus.innerHTML+=content;

}
renderstatus();
renderUser();