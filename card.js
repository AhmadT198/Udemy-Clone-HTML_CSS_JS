export function card(course) {
    //We need to build an HTML structure 
    //Make an li element and adjust its class name
    const li = document.createElement("li");
    li.classList.add("course" + course["id"]);
    li.classList.add("col");
    li.classList.add("p-0");

    //make an "a" element and adjust its attributes
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    a.classList.add("text-decoration-none");
    a.classList.add("text-dark");
    li.appendChild(a);


    //Create the Container of the card
    const div_single_course = document.createElement("div");
    div_single_course.classList.add("single-course");
    a.appendChild(div_single_course);

    //Append the course image and adjust it attributes
    const img = document.createElement("img");
    img.setAttribute("alt", course["title"]);
    img.setAttribute("src", course["image"]);
    div_single_course.appendChild(img);

    //Append the header element
    const h3 = document.createElement("h3");
    h3.textContent = course["title"];
    h3.classList.add("fs-7");
    h3.classList.add("fw-bold");
    div_single_course.appendChild(h3);

    //Append the instructor name SPAN
    const span = document.createElement("span");
    span.classList.add("inst-name");
    span.textContent = course["instructor"];
    div_single_course.appendChild(span);

    //Append the rating Container
    div_single_course.appendChild(makeRating(course["rating"][0], course["rating"][1]));

    //If there is a sale append both old and new prices... if not append the original price only
    const price_div = document.createElement("div");
    if (course["sale"]) {
        const cur_price = document.createElement("span");
        cur_price.classList.add("price");
        cur_price.textContent = "E£" + course["new-price"];

        const prev_price = document.createElement("span");
        prev_price.classList.add("prev-price");
        prev_price.textContent = "E£" + course["original-price"];
        price_div.appendChild(cur_price);
        price_div.appendChild(prev_price);
    }
    else {
        const cur_price = document.createElement("span");
        cur_price.classList.add("price");
        cur_price.textContent = "E£" + course["original-price"];
        price_div.appendChild(cur_price);


    }
    div_single_course.appendChild(price_div);


    // if its a best seller append the bestseller icon
    if (course["best-seller"]) {
        const best = document.createElement("span");
        best.classList.add("best-seller");
        best.textContent = "Bestseller";
        div_single_course.appendChild(best);
    }

    return li;

}



//Making the Rating Div
const makeRating = (rating, users) => {

    //Create the container
    const div_rating = document.createElement("div");
    div_rating.classList.add("rating");

    //Create the Rating span and append it to the container
    const rating_span = document.createElement("span");
    rating_span.textContent = rating;
    div_rating.appendChild(rating_span);


    //Create the Stars Div and append it to the container
    const stars_div = document.createElement("div");
    stars_div.classList.add("stars");
    div_rating.appendChild(stars_div);

    //Display the right amount of stars:
    //Display Full stars for the integer part
    for (let x = 0; x < Math.floor(rating); x++) {
        let i = document.createElement("i");
        i.classList.add("fa-solid"); i.classList.add("fa-star");
        stars_div.appendChild(i);
    }

    //get the fraction part and display the right chape of the star
    let frac = Number(rating) - Math.floor(rating);
    frac = frac.toPrecision(1);

    if (frac >= 0.3 && frac <= 0.7) { //Half a star from 0.3 to 0.7
        let i = document.createElement("i");
        i.classList.add("fa-solid"); i.classList.add("fa-star-half-stroke");

        stars_div.appendChild(i);

    } else if (frac >= 0.8) //full star for 0.8 and 0.9
    {
        let i = document.createElement("i");
        i.classList.add("fa-solid"); i.classList.add("fa-star");
        stars_div.appendChild(i);

    }

    //Create the users Span and append it to the container
    const users_span = document.createElement("span");
    users_span.textContent = '(' + users + ')';
    div_rating.appendChild(users_span);

    return div_rating;
}

