const loadPhones = (searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch (url)
    .then (res => res.json())
    .then (data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = '';

    //Show 9 Phones Only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 9);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');

    }

    //Display No Phone 
      const noPhone = document.getElementById('no-found-message');
      
      if(phones.length === 0){
        noPhone.classList.remove('d-none');
      }
      else{
        // noPhone.innerHTML = ''; Also we can use bottom codes
        noPhone.classList.add('d-none');

      }
      
    //Display All Phone


    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top w-75 d-block mx-auto m-3" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //Stop Spinner or Loader
    toggleSpinner(false);
}


const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}

//handle search button click
document.getElementById('btn-search').addEventListener('click', function (){
  //Start Loader
  // toggleSpinner(true);
  // const searchField = document.getElementById('search-field');
  // const searchText = searchField.value;
  // loadPhones(searchText);

  processSearch(10);
})


// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
  console.log(e.key);
  if(e.key === 'Enter'){
    processSearch(10)
  }
})


const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');

  }
}


//Not the best way to show all 
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch()
})


const loadPhoneDetails = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch (url)
  .then (res => res.json())
  .then (data => console.log(data.data))
}

// loadPhones();