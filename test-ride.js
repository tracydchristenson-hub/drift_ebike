"use strict";

const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM"
];

const booking = {
    location: "",
    date: "",
    time: ""
};


// DOM
const locationButtons = document.querySelectorAll(".location-card");

const schedulingMessage =
    document.querySelector("#scheduling-message");

const dateSection =
    document.querySelector("#date-section");

const dateInput =
    document.querySelector("#test-date");

const timeSection =
    document.querySelector("#time-section");

const timeSlots =
    document.querySelector("#time-slots");

const bookingForm =
    document.querySelector("#booking-form");

const confirmation =
    document.querySelector("#confirmation");


// Prevent past dates
dateInput.min = getToday();


// LOCATION
locationButtons.forEach((button) => {

    button.addEventListener("click", () => {

        booking.location = button.dataset.location;
        booking.date = "";
        booking.time = "";

        locationButtons.forEach((item) => {
            item.classList.remove("is-selected");
        });

        button.classList.add("is-selected");

        dateInput.value = "";

        dateSection.hidden = false;
        timeSection.hidden = true;
        bookingForm.hidden = true;
        confirmation.hidden = true;

        schedulingMessage.textContent =
            `${booking.location} selected. Choose a date.`;
    });
});


// DATE
dateInput.addEventListener("change", () => {

    if (!dateInput.value) {
        return;
    }

    booking.date = dateInput.value;
    booking.time = "";

    renderTimes();

    timeSection.hidden = false;
    bookingForm.hidden = true;
});


// TIME
function renderTimes() {

    timeSlots.innerHTML = "";

    availableTimes.forEach((time) => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "time-slot";

        if (
            isBooked(
                booking.location,
                booking.date,
                time
            )
        ) {

            button.textContent =
                `${time} — Booked`;

            button.disabled = true;

        } else {

            button.textContent = time;

            button.addEventListener("click", () => {

                booking.time = time;

                document
                    .querySelectorAll(".time-slot")
                    .forEach((item) => {
                        item.classList.remove("is-selected");
                    });

                button.classList.add("is-selected");

                updateSummary();

                bookingForm.hidden = false;
            });
        }

        timeSlots.appendChild(button);
    });
}


// SUMMARY
function updateSummary() {

    document.querySelector("#summary-location")
        .textContent = booking.location;

    document.querySelector("#summary-date")
        .textContent = formatDate(booking.date);

    document.querySelector("#summary-time")
        .textContent = booking.time;
}


// FORM
bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }


    // Check the slot again before saving.
    if (
        isBooked(
            booking.location,
            booking.date,
            booking.time
        )
    ) {
        alert(
            "This appointment has already been booked. Please choose another time."
        );

        bookingForm.hidden = true;
        renderTimes();

        return;
    }


    const reservation = {
        location: booking.location,
        date: booking.date,
        time: booking.time,

        name:
            document.querySelector("#customer-name")
                .value.trim(),

        email:
            document.querySelector("#customer-email")
                .value.trim(),

        bike:
            document.querySelector("#bike-selection")
                .value,

        question:
            document.querySelector("#customer-question")
                .value.trim()
    };


    const reservations = getReservations();

    reservations.push(reservation);

    localStorage.setItem(
        "driftTestRideReservations",
        JSON.stringify(reservations)
    );


    showConfirmation(reservation);
});


// CONFIRMATION
function showConfirmation(reservation) {

    dateSection.hidden = true;
    timeSection.hidden = true;
    bookingForm.hidden = true;

    document.querySelector("#confirmation-location")
        .textContent = reservation.location;

    document.querySelector("#confirmation-date")
        .textContent = formatDate(reservation.date);

    document.querySelector("#confirmation-time")
        .textContent = reservation.time;

    document.querySelector("#confirmation-bike")
        .textContent = reservation.bike;

    schedulingMessage.textContent =
        "Your reservation is complete.";

    confirmation.hidden = false;
}


// BOOK ANOTHER
document.querySelector("#book-another")
    .addEventListener("click", () => {

        booking.location = "";
        booking.date = "";
        booking.time = "";

        bookingForm.reset();
        dateInput.value = "";

        locationButtons.forEach((button) => {
            button.classList.remove("is-selected");
        });

        dateSection.hidden = true;
        timeSection.hidden = true;
        bookingForm.hidden = true;
        confirmation.hidden = true;

        timeSlots.innerHTML = "";

        schedulingMessage.textContent =
            "Choose a location to view available appointments.";
    });


// LOCAL STORAGE
function getReservations() {

    const stored =
        localStorage.getItem(
            "driftTestRideReservations"
        );

    if (!stored) {
        return [];
    }

    try {
        const reservations = JSON.parse(stored);

        return Array.isArray(reservations)
            ? reservations
            : [];

    } catch {
        return [];
    }
}


function isBooked(location, date, time) {

    return getReservations().some((reservation) => {

        return (
            reservation.location === location &&
            reservation.date === date &&
            reservation.time === time
        );
    });
}


// TODAY
function getToday() {

    const today = new Date();

    const year = today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// DATE DISPLAY
function formatDate(dateString) {

    const [year, month, day] =
        dateString.split("-").map(Number);

    const date =
        new Date(year, month - 1, day);

    return new Intl.DateTimeFormat(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(date);
}