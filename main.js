
import *  as cardMaker from '/card.js';




let courses = {

    fetchCourses: function () {
        //fetch the courses data
        fetch("https://api.jsonbin.io/v3/b/630013105c146d63ca76b380/latest", {
            method: 'GET',
            headers: {
                'X-Master-Key': '$2b$10$9VcIHL6nigHvFMssjhtAH.tp0tfttSGw0YM6VoCyQRPcg4D5y0eTm'
            }
        })
            .then((response) => response.json())
            .then((data) => this.displayCourses(data));
    },



    carouselDisplay: function (data) {
        //Get all Carousels of all tabs
        const carouselInnerArr = document.querySelectorAll(".carousel-inner");
        let idx = 0;

        //For each Tab DIsplay its courses in a seperate Carousel
        for (let course in data) {
            this.makeTab(data[course], carouselInnerArr[idx]);
            idx++;
        }


    },




    displayCourses: function (data) {


        //Display all courses by default
        this.carouselDisplay(data.record);


        const searchFunc = (e) => {
            e.preventDefault(); //prevent page from refreshing when clicking the button (submitting the form)

            //get the value of the search bar
            let searchVal = document.getElementById("search-bar").value.toLowerCase().trim();

            //delete all courses
            const carouselInner = document.querySelectorAll(".carousel-inner");
            for (let i in carouselInner) {
                var child = carouselInner[i].lastElementChild;
                while (child) {
                    carouselInner[i].removeChild(child);
                    child = carouselInner[i].lastElementChild;
                }
            }

            //For storing Modified Data
            const modData = {};

            //display only those that include the value of the search bar in each tab Separately 
            for (let genre in data.record) {

                modData[genre] = [];
                for (let course of data.record[genre]) {
                    if (course["title"].toLowerCase().includes(searchVal)) modData[genre].push(course);

                }
            }

            //Display Modified Data
            this.carouselDisplay(modData);

        }



        //if the search button is clicked, display only the courses that include the value of the search bar
        const searchBar = document.getElementById("search-submit");
        searchBar.addEventListener("click", searchFunc);


    },




    makeTab: function (data, carInner) {
        //Each SLide has a MAX of 5 Courses
        let SlideNum = Math.ceil(data.length / 5);

        for (let x = 1; x <= SlideNum; x++) {

            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (x == 1) { carouselItem.classList.add("active"); }

            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            rowDiv.classList.add("g-0");

            carouselItem.appendChild(rowDiv);
            carInner.appendChild(carouselItem);

            //Make Cards for the courses of the current slide 
            //and append them in the current Row Div
            for (let y = (x - 1) * 5; y <= x * 5 - 1 && y < data.length; y++) {
                const li = cardMaker.card(data[y]);
                rowDiv.appendChild(li);
            }
        }
    }

}





//----------------------------------Display The Courses
courses.fetchCourses();







