//VARIABLES FOR INPUT ELEMENTS
let firstName = document.getElementById("first");
let lastName = document.getElementById("last");
let email = document.getElementById("email");
let newsletterCheck = document.getElementById("newsletter");
let printServiceCheck = document.getElementById("print");
let designServiceCheck = document.getElementById("design");
let designDetails = document.getElementById("req");
let quantity = document.getElementById("qty");
let printMethodFieldset = document.getElementById("method");
let printMethod;
let submitBttn = document.querySelector("[type='submit']");

//VARIABLES FOR OTHER ELEMENTS
let methodHeading =  document.getElementById("print-method-h2");
let methodParagraph = document.getElementById("print-method-info");
let quantityLabel = document.querySelector("[for='qty']");
let designDetailsLabel = document.querySelector("[for='req']");
let popup = document.querySelector(".popup");
let hoverArea = document.querySelector(".hover");
let estimatedTotal = document.querySelector(".cost");

//COLOR VARIABLES
const pink = "#F9E6DD";
const coral = "#ea8689";
const violet = "#6D597A";
const indigo = "#2E4561";

//WHEN THE DOCUMENT BODY LOADS
document.body.onload = onLoad;
function onLoad() {
    //when the page loads, fill the quantity select element with options
    for (let i = 1; i <= 500; i++) {
        let option = document.createElement("option");
        let text = document.createTextNode(i);
        option.appendChild(text);
        quantity.appendChild(option);
    }

    //DISABLE INPUT FIELDS
    designDetails.disabled = true;
    designDetails.style.borderColor = "Gainsboro";
    designDetailsLabel.style.color = "Gray";

    methodHeading.style.color = "Gray";
    methodParagraph.style.borderColor = "Gainsboro";
    
    quantity.disabled = true;
    quantityLabel.style.color = "Gray";

    submitBttnDisabled(true);

    printMethodFieldset.disabled = true;
    printMethodFieldset.style.color = "Gray";

    popup.style.display = 'none';
}

//CHECK IF NAME & EMAIL FIELDS CONTAIN TEXT TO DETERMINE IF THE SUBMIT BUTTON SHOULD BE ACTIVE
firstName.addEventListener("keyup", (event) => {
    if (contactInfoFilled() && servicesFilled()) {
        submitBttnDisabled(false);
    } else {
        submitBttnDisabled(true);
    }
});
lastName.addEventListener("keyup", (event) => {
    if (contactInfoFilled() && servicesFilled()) {
        submitBttnDisabled(false);
    } else {
        submitBttnDisabled(true);
    }
});
email.addEventListener("keyup", (event) => {
    if (contactInfoFilled() && servicesFilled()) {
        submitBttnDisabled(false);
    } else {
        submitBttnDisabled(true);
    }
});

//WHEN THE USER CLICKS THE DESIGN SERVICES CHECKBOX, ACTIVATE/DEACTIVATE FIELDS BASED ON IF IT'S CHECKED
designServiceCheck.addEventListener("input", printService);
function printService(event) {
    event.preventDefault();
    if (designServiceCheck.checked) {
        designDetails.disabled = false;
        designDetails.style.borderColor = coral;
        designDetailsLabel.style.color = indigo;
        designDetails.style.color = violet;

        if (servicesFilled() && contactInfoFilled() == true) {
            submitBttnDisabled(false);
        } else {
            submitBttnDisabled(true);
        }
    } else {
        designDetails.disabled = true;
        designDetails.style.color = "Gray";
        designDetails.style.borderColor = "Gainsboro";
        designDetailsLabel.style.color = "Gray";
        //if neither checkbox is clicked, disable the submit button
        if (!printServiceCheck.checked) {
            submitBttnDisabled(true);
        } else {
            submitBttnDisabled(false);
        }
    }
}

//WHEN THE USER CLICKS THE PRINT SERVICES CHECKBOX, ACTIVATE/DEACTIVATE FIELDS BASED ON IF IT'S CHECKED
printServiceCheck.addEventListener("input", designService);
function designService(event) {
    event.preventDefault();
    if (printServiceCheck.checked) {
        methodHeading.style.color = indigo;
        methodParagraph.style.borderColor = coral;
        methodParagraph.style.color = indigo;

        quantity.disabled = false;
        quantityLabel.style.color = indigo;
    
        printMethodFieldset.disabled = false;
        printMethodFieldset.style.color = indigo;

        if (contactInfoFilled() && servicesFilled()) {
            submitBttnDisabled(false);
        }

        //if nothing has been selected, select the first radio button
        if (document.querySelector("[name='print-method']:checked") == null) {
            document.getElementById("direct").checked = true;
            methodHeading.innerText = "Direct to Garmet (DTG)";
            methodParagraph.innerText = "An inkjet printer is used to print the artwork onto the shirt." +
            " This technique is ideal for complex designs or photos. DTG prints will fade over time," +
            " but they are fast and cheap to produce. DTG printing requires light-colored cotton (100% or a blend) fabric.";
        }
    } else {
        methodHeading.style.color = "Gray";
        methodParagraph.style.borderColor = "Gainsboro";
        methodParagraph.style.color = "Gray";

        quantity.disabled = true;
        quantityLabel.style.color = "Gray";
    
        printMethodFieldset.disabled = true;
        printMethodFieldset.style.color = "Gray";

        //if neither checkbox is clicked, disable the submit button
        if (!designServiceCheck.checked) {
            submitBttnDisabled(true);
        }

        let selected = document.querySelector("[name='print-method']:checked");
        selected.checked = false;
    }
}

//CHECK IF DESIGN DETAILS CONTAINS TEXT TO DETERMINE IF SUBMIT BUTTON SHOULD BE ENABLED
designDetails.addEventListener("input", (event) => {
    event.preventDefault();
    if (servicesFilled() && contactInfoFilled()) {
        submitBttnDisabled(false);
        designDetails.style.color = violet;
    } else {
        submitBttnDisabled(true);
    }
});

//CHANGE PRINT METHOD HEADING & PARAGRAPH BASED ON RADIO BUTTON SELECTION
printMethodFieldset.addEventListener("input", (event) => {
    event.preventDefault();
    printMethod = document.querySelector("[name='print-method']:checked");

    switch (printMethod.value) {
        case "1.00":
            methodHeading.innerText = "Direct to Garmet (DTG)";
            methodParagraph.innerText = "An inkjet printer is used to print the artwork onto the shirt." +
            " This technique is ideal for complex designs or photos. DTG prints will fade over time," +
            " but they are fast and cheap to produce. DTG printing requires light-colored cotton (100% or a blend) fabric.";
            break;
        case "3.00":
            methodHeading.innerText = "Direct to Film (DTF)";
            methodParagraph.innerText = "A special PET film is used with adhesive powder and heat to transfer artwork to fabric." +
            " A shiny finish is left from the powder, but DTF produces very vibrant prints. DTF printing can be used on any color fabric," +
            " and on most types of material. It lasts longer than DTG prints, but is more expensive to produce.";
            break;
        case "4.00":
            methodHeading.innerText = "Screen Printing";
            methodParagraph.innerText = "Ink is applied to fabric using a mesh screen stencil. This method creates fade-resistant prints" +
            " and is best suited for simple designs with fewer colors. It can be used on most materials, including polyester. Screen printing has a high" + " initial setup cost, and is not suited for small orders.";
    }
});

/* CREATES A SCROLLABLE DROPDOWN FOR THE QUANTITY SELECT BOX */
//https://stackoverflow.com/questions/48560072/how-to-add-vertical-scrollbar-to-select-box-options-list
quantity.addEventListener("focus", (event) => {
    quantity.setAttribute("size", 10);
});
quantity.addEventListener("blur", (event) => {
    quantity.setAttribute("size", 1);
});

/* LISTEN FOR ESTIMATE TOTAL BUTTON CLICK */
document.querySelector("[type='button']").addEventListener("click", (event) => {
    try {
        //get all checked inputs to calculate the total (that aren't the newsletter checkbox)
        let values = document.querySelectorAll('input:checked:not(#newsletter)');
        let total = calculateEstimatedTotal(values);
        if (total == 0) {
            estimatedTotal.innerText = "Please choose a service first.";
        } else {
            estimatedTotal.innerText = "Estimated Total: $" + total.toFixed(2);
        }
    } catch (ex) {
        console.log(ex);
        estimatedTotal.innerText = "Please choose a service first.";
    }
});
/* LISTEN FOR SUBMIT EVENT */
document.querySelector("form").addEventListener("submit", validateForm);
function validateForm(event) {
    //prevent the page from reloading
    event.preventDefault();

    /* ENSURE EMAIL IS VALID */
    /* expression to validate email address */
    let emailRegEx = /\S@\S+\.\w{2,4}$/;
    if (!emailRegEx.test(email.value)) {
        alert("Invalid email entered. Must contain '@' and a domain.\nEX: johndoe@gmail.com");
        email.focus();
        return;
    }

    document.getElementById('message').innerText = "Thank you for your order! We'll be in touch soon.";
    document.querySelector("form").reset();
}

/* LISTEN FOR THE RESET EVENT */
document.querySelector("form").addEventListener("reset", (event) => {
    //RESET PRINT METHOD INFORMATION TEXT
    methodHeading.innerText = "More Information"
    methodParagraph.innerText = "";

    //DISABLE INPUT FIELDS
    designDetails.disabled = true;
    designDetails.style.borderColor = "Gainsboro";
    designDetailsLabel.style.color = "Gray";

    methodHeading.style.color = "Gray";
    methodParagraph.style.borderColor = "Gainsboro";
    
    quantity.disabled = true;
    quantityLabel.style.color = "Gray";

    submitBttnDisabled(true);

    printMethodFieldset.disabled = true;
    printMethodFieldset.style.color = "Gray";

    estimatedTotal.innerText = "";
});

/* LISTENS FOR MOUSE HOVER OVER BUTTON DIV TO DISPLAY HELP TEXT WHEN SUBMIT BUTTON IS INACTIVE */
hoverArea.addEventListener("mouseover", (event) => {
    if (submitBttn.disabled == true) {
        popup.style.display = 'block';
    }
});
hoverArea.addEventListener("mouseout", (event) => {
    popup.style.display = 'none';
});

/****************************************************/
/******************** FUNCTIONS *********************/

//DEACTIVATE/ACTIVATE THE SUBMIT BUTTON BASED ON BOOLEAN ARGUMENT
function submitBttnDisabled(boolean) {
    if (boolean) {
        submitBttn.disabled = true;
        submitBttn.style.borderColor = "Gainsboro";
        submitBttn.style.background = "WhiteSmoke";
        submitBttn.style.color = "Gray";
    } else {
        submitBttn.disabled = false;
        submitBttn.style.borderColor = coral;
        submitBttn.style.background = pink;
        submitBttn.style.color = violet;
    }
}

//CHECK IF CONTACT FIELDS ARE FILLED
function contactInfoFilled() {
    if (firstName.value == '' || lastName.value == '' || email.value == '') {
        return false;
    } else {
        return true;
    }
}

//WHEN CHECKBOX IS CHECKED, ENSURE APPROPRIATE FIELDS ARE FILLED IN
function servicesFilled() {
    //see which checkboxes are checked and determine if appropriate related fields are filled in
    if (designServiceCheck.checked) {
        if (designDetails.value != '') {
            return true;
        } else {
            return false;
        }
    } else if (printServiceCheck.checked && designServiceCheck.checked) {
        if (designDetails.value != '') {
            return true;
        } else {
            return false;
        }
    } else if (printServiceCheck.checked) {
        return true;
    } else {
        return false;
    }
}
//CALCULATE ESTIMATED TOTAL
function calculateEstimatedTotal(list) {
    let total = 0;
    let designFee = 0;
    for (var i = 0; i < list.length; i++) {
        //Arithmetic Operators
        //don't add design fee until the end
        if (parseFloat(list[i].value) != 50.00) {
            total += parseFloat(list[i].value);
        } else {
            designFee = parseFloat(list[i].value);
        }
    }
    //multiply total by the quantity of shirts ordered
    total *= quantity.value;
    //add the design fee
    total += designFee;

    let method = document.querySelector("[name='print-method']:checked");
    //if the printing method selected is 'Screen Printing', add an initial setup fee
    //note: check if the element is null first to prevent TypeError: Cannot read properties of null
    if (method != null && method.value == 4.00) {
        total += 20;
    }
    return total;
}
