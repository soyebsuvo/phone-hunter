const loadData = async (searchText,showAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,showAll);
}



const displayPhones = (phones,showAll) => {
    const phoneCardContainer = document.getElementById("phones-container");
    phoneCardContainer.textContent = "";
    
    const showAllButton = document.getElementById("showAllButton");
    if(phones.length > 12 && !showAll){
      showAllButton.classList.remove("hidden");
    }else{
      showAllButton.classList.add("hidden");
    }
    if(!showAll){
      phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = "card bg-base-100 shadow-lg w-full";
        phoneCard.innerHTML = `
        <figure class="p-10"><img src="${phone.image}" alt="Shoes" class="w-full px-12"/></figure>
        <div class="card-body">
          <h2 class="text-2xl text-center">${phone.phone_name}</h2>
          <p class="text-center mb-3">${phone.slug}</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        phoneCardContainer.appendChild(phoneCard);
    });
    spinnerHandle(false);
}

const handleSearch = (showAll) => {
    spinnerHandle(true)
    const searchField = document.getElementById("searchField");
    const searchText = searchField.value;
    loadData(searchText,showAll);
    // searchField.value = "";
}

const spinnerHandle = (isloading) => {
    const spinnerHandle = document.getElementById("spinnerHandle");
    if(isloading){
      spinnerHandle.classList.remove("hidden");
    }else{
      spinnerHandle.classList.add("hidden");
    }
}

const handelShowAll = () => {
  handleSearch(true);
}