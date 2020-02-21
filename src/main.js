import "sanitize.css/sanitize.css";
import "./main.scss";
//
import $ from "jquery";
import Mailcheck from "mailcheck";
import * as yup from "yup";
//
$(function() {
  const init = function() {
    $(".en__field--emailAddress").append(
      `<span class="mailcheck-message"></span>`
    );
    $(".en__field--lastName").hide();
    $(".en__field--firstName").hide();
    $(".en__submit button").addClass("btn btn-block btn-round btn--download");
  };
  init();
  //
  const email = document.querySelector('input[name="supporter.emailAddress"]');
  const mailcheckMessage = document.querySelector(".mailcheck-message");
  const mailcheck = function() {
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
  };
  email.addEventListener("blur", mailcheck());
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
  //
  const enformButton = document.querySelector(".en__submit");
  enformButton.addEventListener("click", function(event) {
    event.preventDefault();
    const enform = document.querySelector("form.en__component");
    let isValid = validationSchema.isValid({ email: email.value });
    isValid.then(valid => {
      if (valid) {
        mailcheckMessage.innerText = "";
        enform.submit();
      } else {
        mailcheckMessage.innerText = "電郵地址格式錯誤";
      }
    });
  });
});
