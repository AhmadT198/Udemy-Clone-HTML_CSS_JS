

/* 
/-----------------------------------------------------This is the Structure we want to build using DOM manipulation

<li class="course5">
    <a href="#">
        <div class="single-course">
            <img alt="Python Beyond the Basics - Object-Oriented Programming" src="https://img-c.udemycdn.com/course/480x270/449532_2aa9_7.jpg">
            <h3>Python Beyond the Basics - Object-Oriented Programming</h3>
            <span class="inst-name">Infinte Skills</span>
            <div class="rating">
                <span>4.4</span>
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <span>(2,927)</span>
            </div>
            <div>
                <span class="price">E£229.99</span> <span class="prev-price">E£519.99</span>
            </div>
        </div>
    </a>
</li>

 */




let courses = {

    fetchCourses: function(){
        //fetch the courses data
        fetch("https://my-json-server.typicode.com/AhmadT198/Project-1---Udemy-Clone/courses")
        .then((response) => response.json())
        .then((data) => this.displayCourses(data));
    },

    displayCourses: function(data){
        //for each course make its card component
        const searchBar = document.getElementById("search-submit");

        //Display all courses by default
        data.forEach(this.makeCard);


        const searchFunc = (e)=>{
            e.preventDefault(); //prevent page from refreshing when clicking the button (submitting the form)

            //get the value of the search bar
            searchVal = document.getElementById("search-bar").value.toLowerCase().trim();
            
            //delete all courses
            const ul = document.getElementById("courses-list");
            var child = ul.lastElementChild;
            while(child)
            {
                ul.removeChild(child);
                child = ul.lastElementChild;
            }
            
            //display only those that include the value of the search bar
            for(const course of data)
            {
                if(course["title"].toLowerCase().includes(searchVal)) this.makeCard(course);
            }

        }



        //if the search button is clicked, display only the courses that include the value of the search bar
        searchBar.addEventListener("click", searchFunc);


    },

    makeCard: function(course)
    {
        

        //We need to build the HTML structure commented above
        //Make an li element and adjust its class name
        const li = document.createElement("li");
        li.classList.add("course" + course["id"]);


        //make an "a" element and adjust its attributes
        const a = document.createElement("a");
        a.setAttribute("href", "#");
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
        div_single_course.appendChild(h3);
        
        //Append the instructor name SPAN
        const span = document.createElement("span");
        span.classList.add("inst-name");
        span.textContent = course["instructor"];
        div_single_course.appendChild(span);

        //Append the rating Container
        div_single_course.appendChild(makeRating(course["rating"][0],course["rating"][1]));

        //If there is a sale append both old and new prices... if not append the original price only
        const price_div = document.createElement("div");
        if(course["sale"])
        {
            const cur_price = document.createElement("span");
            cur_price.classList.add("price");
            cur_price.textContent = "E£" + course["new-price"];

            const prev_price = document.createElement("span");
            prev_price.classList.add("prev-price");
            prev_price.textContent = "E£" + course["original-price"];
            price_div.appendChild(cur_price);
            price_div.appendChild(prev_price);
        }
        else{
            const cur_price = document.createElement("span");
            cur_price.classList.add("price");
            cur_price.textContent = "E£" + course["original-price"];
            price_div.appendChild(cur_price);


        }
        div_single_course.appendChild(price_div);


        // if its a best seller append the bestseller icon
        if(course["best-seller"])
        {
            const best = document.createElement("span");
            best.classList.add("best-seller");
            best.textContent="Bestseller";
            div_single_course.appendChild(best);
        }

        //Append this new component to the Original UL element
        const ul = document.getElementById("courses-list");
        ul.appendChild(li);
    }
    


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
    for(let x = 0; x < Math.floor(rating); x++){
        let i = document.createElement("i");
        i.classList.add("fa-solid"); i.classList.add("fa-star");
        stars_div.appendChild(i);
    }

    //get the fraction part and display the right chape of the star
    let frac = Number(rating) - Math.floor(rating);
    frac = frac.toPrecision(1);

    if(frac >= 0.3 && frac <= 0.7){ //Half a star from 0.3 to 0.7
        let i = document.createElement("i");
        i.classList.add("fa-solid"); i.classList.add("fa-star-half-stroke");

        stars_div.appendChild(i);

    } else if(frac >= 0.8) //full star for 0.8 and 0.9
    {
        let i = document.createElement("i");
        i.classList.add("fa-solid"); i.classList.add("fa-star");
        stars_div.appendChild(i);

    }

    //Create the users Span and append it to the container
    const users_span = document.createElement("span");
    users_span.textContent = '('+users+')';
    div_rating.appendChild(users_span);

    return div_rating;
}




//----------------------------------Display The Courses
courses.fetchCourses();







