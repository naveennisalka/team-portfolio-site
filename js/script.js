// MEMBER 3: all JavaScript interactivity
document.addEventListener("DOMContentLoaded", function () {

    // 1. Typing animation
    const typingText = document.getElementById("typingText");

    if (typingText) {
        const phrases = [
            "with code",
            "with creativity",
            "with teamwork",
            "with passion"
        ];

        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let deleting = true;

        function typeEffect() {
            const phrase = phrases[phraseIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = phrase.substring(0, charIndex);

            let delay = deleting ? 60 : 100;

            if (deleting && charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 300;
            } else if (!deleting && charIndex === phrase.length) {
                deleting = true;
                delay = 1500;
            }

            setTimeout(typeEffect, delay);
        }

        setTimeout(typeEffect, 1500);
    }


    // 2. Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    // 3. Update copyright year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 4. Contact form validation
    const form = document.getElementById("contactForm");

    if (!form) {
        console.error('Contact form not found. Check id="contactForm".');
        return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formStatus = document.getElementById("formStatus");

    // Make sure all required elements exist.
    if (
        !nameInput || !emailInput || !messageInput ||
        !nameError || !emailError || !messageError || !formStatus
    ) {
        console.error("Contact form is missing one or more required elements.");
        return;
    }

    function setError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.toggle("invalid", message !== "");
        input.setAttribute("aria-invalid", String(message !== ""));
    }

    function validateName() {
        const value = nameInput.value.trim();

        if (value.length === 0) {
            setError(nameInput, nameError, "Name is required.");
            return false;
        }

        if (value.length < 2) {
            setError(nameInput, nameError, "Name must contain at least 2 characters.");
            return false;
        }

        setError(nameInput, nameError, "");
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            setError(emailInput, emailError, "Email is required.");
            return false;
        }

        if (!emailPattern.test(value)) {
            setError(emailInput, emailError, "Please enter a valid email address.");
            return false;
        }

        setError(emailInput, emailError, "");
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();

        if (value === "") {
            setError(messageInput, messageError, "Message is required.");
            return false;
        }

        if (value.length < 5) {
            setError(messageInput, messageError, "Message must contain at least 5 characters.");
            return false;
        }

        setError(messageInput, messageError, "");
        return true;
    }

    
    form.noValidate = true;

    // Validate when submitting.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        formStatus.textContent = "";
        formStatus.className = "form-status";

        const nameValid = validateName();
        const emailValid = validateEmail();
        const messageValid = validateMessage();

        if (!nameValid || !emailValid || !messageValid) {
            formStatus.textContent = "Please correct the errors above.";
            formStatus.classList.add("error");

            if (!nameValid) {
                nameInput.focus();
            } else if (!emailValid) {
                emailInput.focus();
            } else {
                messageInput.focus();
            }

            return;
        }

       
        formStatus.textContent =
            "Thanks! Your message was validated successfully.";
        formStatus.classList.add("success");

        form.reset();

        [nameInput, emailInput, messageInput].forEach(function (input) {
            input.classList.remove("invalid");
            input.setAttribute("aria-invalid", "false");
        });

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
    });

    // Validate fields when the user leaves them.
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    messageInput.addEventListener("blur", validateMessage);

    // Clear the field's error while typing.
    nameInput.addEventListener("input", function () {
        setError(nameInput, nameError, "");
    });

    emailInput.addEventListener("input", function () {
        setError(emailInput, emailError, "");
    });

    messageInput.addEventListener("input", function () {
        setError(messageInput, messageError, "");
    });

});
