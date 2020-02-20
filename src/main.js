import "sanitize.css/sanitize.css";
import "./main.scss";
//
import $ from "jquery";
import Mailcheck from "mailcheck";
import * as yup from "yup";
//
$(function() {
  $(".en__field--emailAddress").append(
    `<span class="mailcheck-message"></span>`
  );
  $(".en__field--lastName").hide();
  $(".en__field--firstName").hide();
  $(".en__submit button").addClass("btn btn-block btn-round btn--download");
  const email = document.querySelector('input[name="supporter.emailAddress"]');
  const mailcheckMessage = document.querySelector(".mailcheck-message");
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
    Mailcheck.run({
      email: email.value,
      domains: domains, // optional
      suggested: function(suggestion) {
        // callback code
        mailcheckMessage.innerHTML = `您要輸入的是 <span class="email-suggestion">${suggestion.full}</span> 嗎？`;
      },
      empty: function() {
        // callback code
      }
    });
  });
  mailcheckMessage.addEventListener("click", function() {
    const emailSuggestion = document.querySelector(".email-suggestion")
      .innerText;
    if (emailSuggestion) {
      email.value = emailSuggestion;
      this.innerText = "";
    }
  });
  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required()
  });
  const enformButton = document.querySelector(".en__submit");
  enformButton.addEventListener("click", function(event) {
    event.preventDefault();
    let isValid = validationSchema.isValid({ email: email.value });
    isValid.then(valid => {
      if (valid) {
        mailcheckMessage.innerText = "";
        document.querySelector("form.en__component").submit();
      } else {
        mailcheckMessage.innerText = "請檢查您的電郵地址";
      }
    });
  });
});
