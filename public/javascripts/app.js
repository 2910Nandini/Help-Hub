document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const modeToggle = document.querySelector(".dark-light");
    const searchToggle = document.querySelector(".searchToggle");
    const sidebarOpen = document.querySelector(".sidebarOpen");
    const sidebarClose = document.querySelector(".siderbarClose");
    const wrapper = document.querySelector(".wrapper");
    const signupHeader = document.querySelector(".signup header");
    const loginHeader = document.querySelector(".login header");

    // Function to toggle dark mode
    function toggleDarkMode() {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");

        // Update localStorage with the current mode
        const currentMode = body.classList.contains("dark") ? "dark-mode" : "light-mode";
        localStorage.setItem("mode", currentMode);
    }

    // Check if the user's preferred mode is stored in localStorage
    const storedMode = localStorage.getItem("mode");

    if (storedMode === "dark-mode") {
        // Apply dark mode if it was previously selected
        toggleDarkMode();
    }

    // Dark mode toggle event listener
    modeToggle.addEventListener("click", toggleDarkMode);

    // Toggle search box event listener
    searchToggle.addEventListener("click", () => {
        searchToggle.classList.toggle("active");
    });

    // Toggle sidebar event listener
    sidebarOpen.addEventListener("click", () => {
        nav.classList.add("active");
    });

    // Close sidebar when clicking outside of it
    body.addEventListener("click", (e) => {
        let clickedElm = e.target;

        if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
            nav.classList.remove("active");
        }
    });

    // Form switching event listeners
    loginHeader.addEventListener("click", () => {
        wrapper.classList.add("active");
    });

    signupHeader.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });

    // Function to toggle dark mode in forms
    function toggleDarkModeInForms() {
        const forms = document.querySelectorAll(".form");
        forms.forEach((form) => {
            form.classList.toggle("dark");
        });
    }

    // Dark mode toggle event listener for forms
    modeToggle.addEventListener("click", toggleDarkModeInForms);
});
function toggleServiceProviderForm() {
    const signupForm = document.getElementById("signupForm");
    signupForm.classList.toggle("active");
}