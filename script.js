
// =====================================
// OPEN INVITATION
// =====================================

const openButton = document.getElementById("openInvitation");
const envelope = document.getElementById("envelopeContainer");
const introScreen = document.getElementById("introScreen");
const mainInvitation = document.getElementById("mainInvitation");

openButton.addEventListener("click", function () {

    // Start envelope animation
    envelope.querySelector(".envelope").classList.add("open");

    openButton.disabled = true;
    openButton.textContent = "OPENING...";

    // Wait for envelope and letter animation
    setTimeout(function () {

        // Fade out intro screen
        introScreen.style.transition = "opacity 1.5s ease";
        introScreen.style.opacity = "0";

        setTimeout(function () {

            // Hide intro screen
            introScreen.style.display = "none";

            // Show wedding invitation
            mainInvitation.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1500);

    }, 3000);

});


// =====================================
// EVENT DATE CONFIGURATION
// =====================================

// Change this to your actual event date.
// Format: YYYY-MM-DDTHH:MM:SS

const eventDate = new Date("2026-12-26T10:00:00");


// Display event date

document.getElementById("eventDateText").textContent =
    eventDate.toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });


// =====================================
// COUNTDOWN TIMER
// =====================================

function updateCountdown() {

    const now = new Date().getTime();
    const target = eventDate.getTime();

    const difference = target - now;

    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown, 1000);



// =====================================
// WEDDING ENQUIRY - WHATSAPP
// =====================================

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const guestName =
        document.getElementById("guestName").value.trim();

    
    const guestQuestion =
        document.getElementById("guestQuestion").value.trim();

    const message =
        document.getElementById("rsvpMessage");

    if (!guestName  || !guestQuestion) {

        message.textContent = "Please complete all fields.";
        message.style.color = "red";

        return;
    }

    // Wedding organiser's WhatsApp number
    const whatsappNumber = "27729451324";

    // Prepare WhatsApp message
    const whatsappMessage =
        `Welcoming of Makoti Ka Lucky ENQUIRY

Name: ${guestName}

Question:
${guestQuestion}

Sent from the  Welloming of Makoti Ka Lucky Website.`;

    // Generate WhatsApp link
    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    message.textContent =
        "Your enquiry is ready! Please send it on WhatsApp.";

    message.style.color = "#8c6537";

    rsvpForm.reset();

});

