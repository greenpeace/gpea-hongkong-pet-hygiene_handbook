"use strict";
import "sanitize.css/sanitize.css";
import "./main.scss";
import $ from "jquery";
import SmoothScroll from "smooth-scroll";
import Mailcheck from "mailcheck";
import * as yup from "yup";
$(function() {
  var scroll = new SmoothScroll('a[href*="#"]');
  //
  const enformInit = function() {
    $(".en__field--emailAddress").append(
      `<span class="mailcheck-message"></span>`
    );
    $(".en__field--lastName").hide();
    $(".en__field--firstName").hide();
    $(".en__submit button").addClass("btn btn-block btn-round btn--download");
  };
  enformInit();
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
  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required()
  });
  if (email && mailcheckMessage) {
    mailcheckMessage.addEventListener("click", function() {
      const emailSuggestion = document.querySelector(".email-suggestion")
        .innerText;
      if (emailSuggestion) {
        email.value = emailSuggestion;
        this.innerText = "";
      }
    });
    email.addEventListener("blur", mailcheck());
  }
  //
  const enformButton = document.querySelector(".en__submit");
  if (enformButton) {
    enformButton.addEventListener("click", function(event) {
      event.preventDefault();
      const enform = document.querySelector("form.en__component");
      let isValid = validationSchema.isValid({
        email: email.value
      });
      isValid.then(valid => {
        if (valid) {
          mailcheckMessage.innerText = "";
          enform.submit();
        } else {
          mailcheckMessage.innerText = "電郵地址格式錯誤";
        }
      });
    });
  }
  //
  const whatsapp = document.querySelector(".btn-whatsapp");
  const facebook = document.querySelector(".btn-facebook");
  const instagram = document.querySelector(".btn-instagram");
  const fbShare = () => {
    var baseURL = "https://www.facebook.com/sharer/sharer.php";
    var u =
      "https://act.greenpeace.org/page/56266/petition/1?utm_campaign=general&utm_source=facebook&utm_medium=social&utm_content=thankyou_page";
    var t = (window.innerHeight - 436) / 2;
    var l = (window.innerWidth - 626) / 2;
    window.open(
      baseURL + "?u=" + encodeURIComponent(u),
      "_blank",
      "width=626,height=436,top=" + t + ",left=" + l
    );
  };
  const mainShare = () => {
    // WEB SHARE API
    if (navigator.share) {
      // we can use web share!
      navigator
        .share({
          title: "",
          text: "",
          url: "https://act.gp/2T27O5N"
        })
        .then(() => console.log("Successfully shared"))
        .catch(error => console.log("Error sharing:", error));
    } else {
      fbShare();
    }
  };
});
