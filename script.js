/*
    Project 01_06_02
    Author: Christopher Merriman
    Date: 8.17.18
    File: script.js
*/

'use strict';
var formValidity = true;
var badInput = 'rgb(229, 95, 68)';


//Function to validate the required fields
function validateRequired() {
    var inputElement = document.querySelectorAll('#contactinfo input');
    var errorDiv = document.getElementById('errorText');
    var numError = document.getElementById('numErrorText');
    var fieldsetValidity = true;
    var elementCount = inputElement.length;
    var current;
    try {
    //Loop to check if the input elements are empty
    for (var i = 0; i < elementCount; i++) {
        current = inputElement[i];
        //Blank
        if (current.value === '') {
            current.style.background = badInput;
            fieldsetValidity = false;
        }
        //Filled
        else {
            current.style.background = 'white';
        }
    }
        //Error message for incompleted fields
        if (fieldsetValidity === false) {
            throw 'Please enter your information';
        } else {
            errorDiv.style.display = '';
            errorDiv.innerHTML = '';
        }
    }
    //Displays error message
    catch (msg){
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}
//Function to validate the form
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    formValidity = true;
    validateRequired();
    //Framework if the form fields are all valid
    if (formValidity === true) {
        document.getElementById('errorText').innerHTML = '';
        document.getElementById('errorText').style.display = '';
        document.getElementsByTagName('form')[0].submit();
    }
}

//Functions added for this project start here
//Remove fallback placeholder text
function zeroPlaceholder() {
    var addressBox = document.getElementById('addrinput');
    addressBox.style.color = 'black';
    if (addressBox.value === addressBox.placeholder) {
        addressBox.value = '';
    }
}

//Restore placeholder text if box contains no user entry
function checkPlaceholder() {
    var addressBox = document.getElementById('addrinput');
    if (addressBox.value === '') {
        addressBox.style.color = 'rgb(178,184,183)';
        addressBox.value === addressBox.placeholder
    }
}

//Add placeholder text for browsers that don't support placeholder attribute
function generatePlaceholder() {
    if (!Modernizr.input.placeholder) {
        var addressBox = document.getElementById('addrinput');
        addressBox.value = addressBox.placeholder;
        addressBox.style.color = 'rgb(178,184,183)';
        if (addressBox.addEventListener) {
            addressBox.addEventListener('focus', zeroPlaceholder, false);
            addressBox.addEventListener('blur', checkPlaceholder, false);
        } else if (addressBox.attachEvent) {
            addressBox.attachEvent('onfocus', zeroPlaceholder);
            addressBox.attachEvent('onblur', checkPlaceholder);
        }
    }
}

//Run initial form configuration functions
function setUpPage() {
    createEventListeners();
    generatePlaceholder();
}

//Function to create event listeners
function createEventListeners() {
    //Event listener for the submit action
    var form = document.getElementsByTagName('form')[0];
    if (form.addEventListener) {
        form.addEventListener('submit', validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent('onsubmit', validateForm);
    }
}

//Add load event listeners - Update for Project
if (window.addEventListener) {
    window.addEventListener('load', setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', setUpPage);
}
