const loadPhones = () =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    fetch (url)
    .then (res => res.json())
    .then (data => displayPhones(data.data))
}

const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phone-container');
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
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
}

loadPhones();