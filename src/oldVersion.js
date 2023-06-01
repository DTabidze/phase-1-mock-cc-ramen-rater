// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenCreateForm = document.querySelector("form#new-ramen");
    //ramenCreateForm.addEventListener('submit', (event) => addNewRamen(event));

    ramenCreateForm.addEventListener('submit', (event) => {
        //event.preventDefault();
        const submitButton = event.submitter;
      
        if (submitButton.value === 'Create') {
          // Handle Create button click
          addNewRamen(event)
        }
          // Perform create operation
        // } else if (submitButton.value === 'Edit') {
        //   // Handle Edit button click
        //   ramenEdit(event);
        //   console.log('Edit button clicked');
        //   // Perform edit operation
        // }
      });

    const URL = 'http://localhost:3000/ramens'
    fetch (URL)
    .then (response => response.json())
    .then (ramens => ramens.forEach(ramen => showRamens(ramen)))
})

function showRamens (ramen) {
    const ramenMenuDiv = document.querySelector("div#ramen-menu");
    //console.log (ramenMenuDiv);

    //console.log(ramen);

    const ramenImg = document.createElement("img");
    ramenImg.src = ramen['image'];

    ramenMenuDiv.appendChild(ramenImg);

    ramenImg.addEventListener ('click', (event) => displayRamenInfo (event,ramen));


}

function displayRamenInfo (event,ramen) {
    // console.log (ramen);
    console.log(event.target);

    const ramenDitails = document.querySelector('div#ramen-detail');
    const ramenDitailsImg = document.querySelector('img.detail-image');
    ramenDitailsImg.src = ramen['image'];

    const ramenName = document.querySelector('h2.name');
    ramenName.textContent = ramen['name'];

    const ramenRestaurant = document.querySelector('h3.restaurant');
    ramenRestaurant.textContent = ramen['restaurant'];

    const ramenRating = document.querySelector('span#rating-display');
    ramenRating.textContent = `${ramen['rating']}`;

    const ramenComment = document.querySelector('p#comment-display');
    ramenComment.textContent = ramen['comment'];

    const ramenDelete = document.querySelector("button#ramen-delete");
    //let hidden = ramenDelete.getAttribute("hidden");
    ramenDelete.removeAttribute("hidden");
    //console.log (ramen.id);
    ramenDelete.addEventListener('click', (event) => deleteRamenMenu(event, ramen), { once: true });
    // if (hidden) {
    //    ramenDelete.removeAttribute("hidden");
    // } else {
    //    ramenDelete.setAttribute("hidden", "hidden");
    // }

    // ramenDelete.textContent = "Delete Selected Ramen";
    // ramenDitails.appendChild(ramenDelete);
    

    //console.log (ramenDitails);

    document.querySelector('#new-name').value = ramen.name;
    document.querySelector('#new-restaurant').value = ramen.restaurant;
    document.querySelector('#new-image').value = ramen.image;
    document.querySelector('#new-rating').value = ramen.rating;
    document.querySelector('#new-comment').value = ramen.comment;

    const ramenCreateForm = document.querySelector("form#new-ramen");
    ramenCreateForm.addEventListener('submit', (event) => {
        const submitButton = event.submitter;
        if (submitButton === 'Edit' ) {
            ramenEdit(event,ramen);
        }
    })

}

function addNewRamen (event) {
    event.preventDefault();
    // console.log (event.target);
    // console.log(event.target.name.value);
    // console.log(event.target.restaurant.value);
    //console.log(event.target['new-comment'].value);

    const name = event.target.name.value;
    const restaurant = event.target.restaurant.value;
    const image = event.target.image.value;
    const rating = event.target.rating.value;
    const comment = event.target['new-comment'].value;

    //console.log (name,restaurant,image,rating,comment)
    const newRamen = {name,restaurant,image,rating,comment};

    const URL = 'http://localhost:3000/ramens';
    fetch (URL, {
        method:'POST',
        headers: {
            "Content-Type":"application/json",
            "Accept":"application.json"
        },
        body: JSON.stringify(newRamen)
    })
    .then (response => response.json())
    .then (updateRamenList => showRamens(updateRamenList));
}

function deleteRamenMenu (event,ramen) {
    console.log (ramen);
    //console.log (event.target.name.value);
    const URL = `http://localhost:3000/ramens/${ramen.id}`;
    console.log (URL);
    // console.log (event.target.image);
    
    // console.log (removeImg);
    fetch (URL, {
        method: "DELETE"
    })
    .then (response => {
        if (response.ok) {
            const removeImg = document.querySelector(`img[src="${ramen.image}"]`);
            removeImg.remove();

            //const clearForm = document.querySelector ("form#ramen-detail");
            const ramenDitailsImg = document.querySelector('img.detail-image');
            ramenDitailsImg.src = './assets/image-placeholder.jpg';

            const ramenName = document.querySelector('h2.name');
            ramenName.textContent = 'Insert Name Here';
        
            const ramenRestaurant = document.querySelector('h3.restaurant');
            ramenRestaurant.textContent = 'Insert Restaurant Here';

            const ramenDelete = document.querySelector("button#ramen-delete");
            ramenDelete.setAttribute("hidden", "hidden");

        } else {
            alert("Deletin Fail")
        }
    })
    .catch (error => alert(error.message));
}

function ramenEdit (event,ramen) {
    event.preventDefault();

    const name = event.target.name.value;
    const restaurant = event.target.restaurant.value;
    const image = event.target.image.value;
    const rating = event.target.rating.value;
    const comment = event.target['new-comment'].value;

    //console.log (name,restaurant,image,rating,comment)
    const newRamen = {name,restaurant,image,rating,comment};
    const URL = `http://localhost:3000/ramens/${ramen.id}`;
    console.log(newRamen);
    console.log(ramen.id)
    console.log(URL);

    // fetch (URL, {
    //     method:'PATCH',
    //     headers: {
    //         "Content-Type":"application/json",
    //         "Accept":"application.json"
    //     },
    //     body: JSON.stringify(newRamen)
    // })
    // .then (response => response.json())
    // //.then (updateRamenList => showRamens(updateRamenList));
}