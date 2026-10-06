// CADPOINT Course Selection

const category = document.getElementById("category");
const course = document.getElementById("course");

if (category && course) {

    category.addEventListener("change", function () {

        course.innerHTML =
            '<option value="">Select Course</option>';

        if (category.value === "arts") {

            course.innerHTML += `
                <option>MS Office</option>
                <option>Python</option>
                <option>DCA</option>
                <option>Advanced Excel</option>
                <option>C Programming</option>
                <option>C++ Programming</option>
                <option>Java Programming</option>
                <option>Python Full Stack</option>
                <option>Java Full Stack</option>
                <option>Data Analytics</option>
                <option>Graphics Designing</option>
                <option>UI/UX Design</option>
            `;
        }

        if (category.value === "engineering") {

            course.innerHTML += `
                <option>AutoCAD</option>
                <option>Mechanical CAD</option>
                <option>Civil CAD</option>
                <option>Electrical CAD</option>
                <option>Revit MEP</option>
                <option>MEP</option>
                <option>SolidWorks</option>
                <option>CATIA</option>
                <option>Creo</option>
            `;
        }

    });

}
// =====================================
// ENQUIRY FORM VALIDATION
// =====================================

// =====================================
// ENQUIRY FORM VALIDATION
// =====================================

const enquiryForm = document.querySelector(".hero-enquiry form");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        const mobile =
            enquiryForm.querySelector('input[type="tel"]').value.trim();

        const email =
            enquiryForm.querySelector('input[type="email"]').value.trim();

        // Mobile validation
        if (!/^[0-9]{10}$/.test(mobile)) {

            event.preventDefault();

            alert("Please enter a valid 10-digit mobile number.");

            return;
        }

        // Email validation
        if (!email.endsWith("@gmail.com")) {

            event.preventDefault();

            alert("Please enter a valid Gmail address.");

            return;
        }

        // DO NOT use event.preventDefault()
        // DO NOT use enquiryForm.reset()

    });

}
// =====================================
// ARTS & SCIENCE COURSE SEARCH
// =====================================

const courseSearch = document.getElementById("courseSearch");

if (courseSearch) {

    courseSearch.addEventListener("input", function () {

        const searchText = courseSearch.value.toLowerCase();

        const courseGroups =
            document.querySelectorAll(".course-group");

        courseGroups.forEach(function (group) {

            const courseItems =
                group.querySelectorAll(".course-list p");

            let found = false;

            courseItems.forEach(function (item) {

                const courseName =
                    item.textContent.toLowerCase();

                if (courseName.includes(searchText)) {

                    item.style.display = "block";
                    found = true;

                } else {

                    item.style.display = "none";

                }

            });

            // Group heading hide/show
            if (found || searchText === "") {

                group.style.display = "block";

            } else {

                group.style.display = "none";

            }

        });

    });

}
// =====================================
// ENGINEERING COURSE SEARCH
// =====================================

const engineeringSearch = document.getElementById("courseSearch");

if (engineeringSearch) {

    engineeringSearch.addEventListener("input", function () {

        const searchText = engineeringSearch.value.toLowerCase();

        const courseGroups =
            document.querySelectorAll(".course-group");

        courseGroups.forEach(function (group) {

            const courseItems =
                group.querySelectorAll(".course-list p");

            let found = false;

            courseItems.forEach(function (item) {

                const courseName =
                    item.textContent.toLowerCase();

                if (courseName.includes(searchText)) {

                    item.style.display = "block";
                    found = true;

                } else {

                    item.style.display = "none";

                }

            });

            if (found || searchText === "") {

                group.style.display = "block";

            } else {

                group.style.display = "none";

            }

        });

    });

}
// =====================================
// CONTACT FORM VALIDATION
// =====================================

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        

        const name =
            contactForm.querySelector('input[type="text"]').value.trim();

        const mobile =
            contactForm.querySelector('input[type="tel"]').value.trim();

        const email =
            contactForm.querySelector('input[type="email"]').value.trim();

        const course =
            contactForm.querySelector("select").value;

        const message =
            contactForm.querySelector("textarea").value.trim();


        // Name validation

        if (name === "") {
            alert("Please enter your name.");
            return;
        }


        // Mobile validation

        if (!/^[0-9]{10}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }


        // Email validation

        if (!email.endsWith("@gmail.com")) {
            alert("Please enter a valid Gmail address.");
            return;
        }


        // Course validation

        if (course === "") {
            alert("Please select a course.");
            return;
        }


        // Message validation

        if (message === "") {
            alert("Please enter your message.");
            return;
        }


        // Message validation

if (message === "") {
    alert("Please enter your message.");
    return;
}

});
}
   
// =====================================
// LOGIN FORM VALIDATION
// =====================================

const loginForm = document.querySelector(".login-box form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        const loginType =
            loginForm.querySelector('select[name="loginType"]').value;

        const name =
            loginForm.querySelector('input[name="name"]').value.trim();

        const email =
            loginForm.querySelector('input[name="email"]').value.trim();

        const password =
            loginForm.querySelector('input[name="password"]').value.trim();


        if (loginType === "") {
            event.preventDefault();
            alert("Please select Student or Admin.");
            return;
        }


        if (name === "") {
            event.preventDefault();
            alert("Please enter your name.");
            return;
        }


        if (!email.endsWith("@gmail.com")) {
            event.preventDefault();
            alert("Please enter a valid Gmail address.");
            return;
        }


        if (password === "") {
            event.preventDefault();
            alert("Please enter your password.");
            return;
        }


        if (password.length < 6) {
            event.preventDefault();
            alert("Password must contain at least 6 characters.");
            return;
        }

        // Valid details → Flask submission
    });

}
