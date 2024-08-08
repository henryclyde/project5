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

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

let button = document.getElementById("themeToggle");
let link = document.getElementById("themeLink");

function toggle() {
    link.disabled=!link.disabled;
}

button.addEventListener("click", toggle);

document.addEventListener("DOMContentLoaded", function(event) {    
    initValidation("myform", "success");
 });