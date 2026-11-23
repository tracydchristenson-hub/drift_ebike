"use strict";
// this creates the variables for each of the radio button groups for the product configurator

let batteryRadios = document.querySelectorAll('input[name="battery"]');
let frameStyleRadios = document.querySelectorAll('input[name="frameStyle"]');
let handlebarRadios = document.querySelectorAll('input[name="handlebar"]');
let wheelsRadios = document.querySelectorAll('input[name="wheels"]');

// this uses a for each loop to add event listeners to each radio button group for the product configurator and creates
// a method to update the price and image when a radio button is selected
frameStyleRadios.forEach(radio => {
    radio.addEventListener('change', BikeFrameStyle);
});
handlebarRadios.forEach(radio => {
    radio.addEventListener('change', BikeHandlebar);
});
wheelsRadios.forEach(radio => {
    radio.addEventListener('change', BikeWheelStyle);
});

// these functions change the bike image based on the selected color, frame style, handlebar, and wheels radio button and updates the image source to the corresponding color image and each function follow this formate
// create a variable to store the selected color value from the radio button group
// creates a variable to store the bike image element 
// updates the bike image source to the corresponding color image base on the selected color value using a string literal to concatenate the selected color value into the image file name
// test to see if the new bike image is being selected correctly

function BikeFrameStyle(){
    // variables
    let selectedFrameStyle = document.querySelector('input[name="frameStyle"]:checked').value;  
    let bikeFrameStyle = document.querySelector('.frameStyle');
    // src update
    bikeFrameStyle.src = `config_images/frame_${selectedFrameStyle}.png`;
    // test 
    let newBikeImage = document.querySelector('.frameStyle');
    console.log(newBikeImage);
}
function BikeHandlebar(){
    // variables
    let selectedHandlebar = document.querySelector('input[name="handlebar"]:checked').value;  
    let bikeHandlebar = document.querySelector('.handlebar');
    // src update
    bikeHandlebar.src = `config_images/handlebar_${selectedHandlebar}.png`;
    // test 
    let newBikeImage = document.querySelector('.handlebar');
    console.log(newBikeImage);
}
function BikeWheelStyle(){
    // variables
    let selectedWheelStyle = document.querySelector('input[name="wheels"]:checked').value;  
    let bikeWheelStyle = document.querySelector('.wheels');
    // src update
    bikeWheelStyle.src = `config_images/wheel_${selectedWheelStyle}.png`;
    // test 
    let newBikeImage = document.querySelector('.wheels');
    console.log(newBikeImage);
}