async function getUsers() {
  let url = 'http://127.0.0.1:8000/Profile/';
  try {
      let res = await fetch(url);
      console.log(res);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
async function renderUser() {
  const colors=["#3cba54","#f4c20d","#db3236","#4885ed"]
  let apiResult = await getUsers();
  console.log(apiResult);
  const container = document.getElementById('iteratorcard');
  let i = 0;
  apiResult.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'project-box-wrapper';
    
let content =
`<div class='project-box-wrapper'>
<div class="project-box" style="background-color:${colors[i]} ">
  <div class="project-box-header">
    <span>${result.date_joined}</span>
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
        style="width: ${parseInt((result.track1/6)*100)}%; background-color: #ff942e"
      ></span>
    </div>
    <p class="box-progress-percentage">${parseInt((result.track1/6)*100)}%</p>
  </div>
  <div class="box-progress-wrapper">
    <p class="box-progress-header">Track 2</p>
    <div class="box-progress-bar">
      <span
        class="box-progress"
        style="width: ${parseInt((result.track2/6)*100)}%; background-color: #ff942e"
      ></span>
    </div>
    <p class="box-progress-percentage">${parseInt((result.track2/6)*100)}%</p>
  </div>
  <div class="project-box-footer">
    <button class="days-left" >
      View Profile
    </button>
  </div>
</div>
</div>`;
    if(result.track1>1){
      if(i==3)
        i=0;
      else
        i++;
      container.innerHTML+=content;
    }
    
  });
}
renderUser();