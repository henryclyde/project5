/*
Project:  Project 5
Name: Henry Clyde
Submitted: 8/8/24
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
*/

let phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/


const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form=null;
let successMsg=null;

function initValidation(formId, successId) {

  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = document.querySelectorAll("input");
  for (input of inputs) {
    input.addEventListener("change", inputChanged );
  }
  form.addEventListener("submit", submitForm );

}
function inputChanged(ev) {
    let el = ev.currentTarget;
    validateForm();
    el.classList.add('was-validated');
}

function submitForm(ev) {
    console.log("in submit");
    let form=ev.currentTarget;

    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    if (!form.checkValidity()) {
        document.querySelectorAll("input").classList.add('was-validated');
    } else {
        form.style.display = 'none';
        successMsg.style.display = 'block';
    }
}


function validateForm() {

    checkRequired("first-name", "First Name is Required");
    checkRequired("last-name", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");
    
    if(checkRequired("state", "State is Required")){
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }
    
    if (checkRequired("email", "Email Address is required")) {
        checkFormat("email", "email format is bad", emailRegex)
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
    }
    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "phone format is bad", phoneRegex)
    }
    checkRequired("newspaper", "you must select at least one!");
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;
    let value = el.value.toUpperCase();
    valid = stateAbbreviations.includes(value);
    
    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    
    let el = document.getElementById(id);
    let value = el.value.trim();
    let valid = regex.test(value);

    setElementValidity(id, valid, msg);
    return valid;

}

function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;
    switch (type) {
        case 'text':
        case 'password':
            valid = el.value !== "";
        break;
        case 'checkbox':
        case 'radio':
            let group = document.querySelectorAll(`input[name="${el.name}"]`);
            valid = Array.from(group).some(input => input.checked);
            break;       

  }
  setElementValidity(id, valid, message);
  

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);
  let errorDiv = el.nextElementSibling; 

  if (valid) { 
    el.classList.add('was-validated');
    el.setCustomValidity(''); 
    errorDiv.textContent = '';
  } else {
    el.classList.add('was-validated');
    
    el.setCustomValidity(message); 
    errorDiv.textContent = message;

  }

}
