function dataLoader() {
  // console.log("This is a function");
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data.tools);
      showDetails(data.data.tools);
    });
}

// .................... card container.......................

const cardContainer = document.getElementById("card-container");

// .....................................................................

// .........................................................
// Show More Button
const showMoreButton = document.getElementById("show-more-button");
// ......................................................

// ...............................................................
// Spinner Container
const spinnerContainer = document.getElementById("spinner-container");
// ......................................................................

// ...........................................................................................
// Card Arrow Button
const cardArrowButton = document.getElementById('card-arrow-button');
// ..............................................................................................


// <img src="${info.data.image_link[0]}" alt="Shoes" />


// ...................................................................
// Function that is written for showing cards details for any array(data) length
// .....................................................................

  function showInfo(info, intel) {
    console.log(info.data);
    console.log(intel);
    const card = document.createElement("div");
    card.classList.add("card", "w-96", "bg-base-100", "shadow-xl");
    card.innerHTML = `
    <figure><img src="${intel.image}"/></figure>
                <div class="card-body">
                    <h2 class="card-title">${info.data.tool_name}</h2>
                    <p class="font-black text-lg">Features</p>
                    </ol>
                      <li>${info.data.features[1].description}</li>
                      <li>${info.data.features[2].description}</li>
                      <li>${info.data.features[3].description}</li>
                    <ol>
                    <div class="flex justify-between items-center">
                    <div class="card-actions">
                    <p>${intel.published_in}</p>
                    </div>
                    <div class="card-actions">
                    <button class="btn btn-primary" onclick="my_modal_3.showModal()" id="card-arrow-button"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    </div>
                    
                </div>
    `;
    cardContainer.appendChild(card);

    cardArrowButton.addEventListener('click',function(){
      const innerModalContent1= document.getElementById("inner-modal-content-1");
      const innerModalContent2= document.getElementById("inner-modal-content-2");
      const innerModalImage = document.createElement("img");
      const image = 
      innerModalImage.setAttribute("src","info.data.image_link[0]");

    })
  }
/* ...............................................................................................................
 End of function that is written for showing all cards of any array(data) length
................................................................................................................*/

function showDetails(data) {
  // .......................................................
  // Array of length 6 Starts here
  // .......................................................
  if (data.length >= 6) {
    showMoreButton.classList.replace("hidden", "block");
    const newDataSet = data.slice(0, 6);
    for (const information of newDataSet) {
      const productID = information.id;
      const url = `https://openapi.programming-hero.com/api/ai/tool/${productID}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => showInfo(data, information));
    }

    // .....................................................................
    //Showing All Cards
    // .........................................................................
    showMoreButton.addEventListener("click", function () {
      cardContainer.innerText = "";
       if(data.length===0){
      spinnerContainer.classList.replace("hidden", "block");
      }
      else{
        spinnerContainer.classList.replace('block','hidden')
      }
      for (const information of data) {
        const productID = information.id;
        const url = `https://openapi.programming-hero.com/api/ai/tool/${productID}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => showInfo(data, information));
      }
      showMoreButton.classList.replace('block','hidden')
      
    });
  }
  // ........................................................................................................
  // Showing All Cards ends here
  // ......................................................................................................

  // .......................................................
  // Array of length 6 ends here
  // .......................................................
  else{
    showMoreButton.classList.replace("block", "hidden");
  }
}
dataLoader();
