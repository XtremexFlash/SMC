/* =====================================================
   SIGMA MACHINERY CORPORATION
   MAIN JAVASCRIPT FILE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       MOBILE MENU
    ========================================== */

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", function () {

            navMenu.classList.toggle("active");

        });

    }

    /* ==========================================
       MOBILE DROPDOWN
    ========================================== */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {

        const link = dropdown.querySelector("a");

        if (window.innerWidth <= 768) {

            link.addEventListener("click", function (e) {

                if (dropdown.querySelector(".dropdown-menu")) {

                    e.preventDefault();

                    dropdown.classList.toggle("open");

                }

            });

        }

    });

    /* ==========================================
       CLOSE MENU ON LINK CLICK
    ========================================== */

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                navMenu.classList.remove("active");

            }

        });

    });

});

/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitButton =
            contactForm.querySelector("button[type='submit']");

        submitButton.disabled = true;

        submitButton.innerText = "Sending...";

        /*
        EmailJS integration occurs inside
        emailjs-config.js

        The function sendEmailForm()
        is called here if available.
        */

        if (typeof sendEmailForm === "function") {

            sendEmailForm(contactForm, submitButton);

        } else {

            setTimeout(() => {

                alert(
                    "EmailJS not configured yet. Please complete emailjs-config.js"
                );

                submitButton.disabled = false;

                submitButton.innerText = "Send Inquiry";

            }, 1000);

        }

    });

}

/* ==========================================
   HEADER SCROLL EFFECT
========================================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================================
   SMOOTH SCROLL FOR INTERNAL LINKS
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const headerOffset = 90;

        const elementPosition =
            target.getBoundingClientRect().top;

        const offsetPosition =
            elementPosition +
            window.pageYOffset -
            headerOffset;

        window.scrollTo({

            top: offsetPosition,

            behavior: "smooth"

        });

    });

});

/* ==========================================
   IMAGE FALLBACK HANDLER
========================================== */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function () {

        this.src =
            "https://via.placeholder.com/600x400?text=Sigma+Machinery";

    });

});

/* ==========================================
   PRODUCT BUTTONS
========================================== */

const quoteButtons =
    document.querySelectorAll(".product-card .btn");

quoteButtons.forEach(button => {

    button.addEventListener("click", function () {

        console.log("Quote Request Clicked");

    });

});

/* ==========================================
   PAGE READY
========================================== */

console.log(
    "Sigma Machinery Corporation website loaded successfully."
);
/* =====================================================
   SIGMA MACHINERY CORPORATION
   EMAILJS CONFIGURATION
===================================================== */

/*
=====================================================

SETUP GUIDE

1. Create a free EmailJS account:
   https://www.emailjs.com

2. Connect your Gmail account:
   harshit.hyd1@gmail.com

3. Create an Email Service

4. Create an Email Template

5. Replace the placeholders below:

   YOUR_PUBLIC_KEY
   YOUR_SERVICE_ID
   YOUR_TEMPLATE_ID

=====================================================
*/

(function () {

    emailjs.init({

        publicKey: "8ZQTTx_02rENqrgC4"

    });

})();

/* =====================================================
   SEND EMAIL FUNCTION
===================================================== */

function sendEmailForm(form, submitButton) {

    const serviceID = "service_dy8l13f";

    const templateID = "template_ky16c2i";

    const formData = {

        from_name:
            form.user_name.value,

        from_email:
            form.user_email.value,

        subject:
            form.subject.value,

        message:
            form.message.value,

        to_email:
            "harshit.hyd1@gmail.com"

    };

    emailjs.send(

        serviceID,
        templateID,
        formData

    )

    .then(function (response) {

        console.log(
            "SUCCESS!",
            response.status,
            response.text
        );

        alert(
            "Thank you for contacting Sigma Machinery Corporation. We will get back to you shortly."
        );

        form.reset();

        submitButton.disabled = false;

        submitButton.innerText =
            "Send Inquiry";

    })

    .catch(function (error) {

        console.error(
            "FAILED...",
            error
        );

        alert(
            "Unable to send message. Please try again later."
        );

        submitButton.disabled = false;

        submitButton.innerText =
            "Send Inquiry";

    });

}

/* =====================================================
   EXAMPLE EMAIL TEMPLATE VARIABLES

   {{from_name}}
   {{from_email}}
   {{subject}}
   {{message}}

===================================================== */

/*
=====================================================

EMAILJS TEMPLATE EXAMPLE

Subject:

New Inquiry From Website

Message:

Name:
{{from_name}}

Email:
{{from_email}}

Subject:
{{subject}}

Message:
{{message}}

=====================================================
*/

/* =====================================================
   SECURITY NOTES

   NEVER place:

   Gmail password
   App passwords
   Secret keys

   inside frontend code.

   Only use:

   Public Key
   Service ID
   Template ID

===================================================== */