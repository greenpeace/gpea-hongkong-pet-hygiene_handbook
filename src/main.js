import "sanitize.css/sanitize.css";
// import "flexboxgrid/css/flexboxgrid.min.css";
import "./main.scss";
//
import $ from "jquery";
import Mailcheck from "mailcheck";
import validate from "validate.js";
//
$(function() {
  const email = document.querySelector("#email");
  const emailMessage = document.querySelector(".input-group-message");
  const emailField = document.querySelector(".form-group--email");
  const btnDownload = document.querySelector(".btn--download");
  //
  let domains = [
    "me.com",
    "outlook.com",
    "netvigator.com",
    "cloud.com",
    "live.hk",
    "msn.com",
    "gmail.com",
    "hotmail.com",
    "ymail.com",
    "yahoo.com",
    "yahoo.com.tw",
    "yahoo.com.hk"
  ];
  email.addEventListener("blur", function() {
    emailMessage.innerText = "";
    if (email.value === "") {
    } else {
      Mailcheck.run({
        email: email.value,
        domains: domains, // optional
        suggested: function(suggestion) {
          // callback code
          emailMessage.innerHTML = `您要輸入的是 <span class="email-suggestion">${suggestion.full}</span> 嗎？`;
        },
        empty: function() {
          // callback code
          console.log("empty");
        }
      });
    }
  });
  const resetEmailMessage = function() {
    emailMessage.innerHTML = "";
  };
  emailMessage.addEventListener("click", function() {
    email.value = document.querySelector(".email-suggestion").innerText;
    resetEmailMessage();
  });
  btnDownload.addEventListener("click", function(event) {
    event.preventDefault;
    document.querySelector('input[name="supporter.emailAddress"]').value =
      email.value;
    console.log("click");
  });
  const enFormSubmit = function() {
    $(".enform__wrapper form").submit();
  };
});
