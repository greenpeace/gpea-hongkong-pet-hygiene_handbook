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
  let mailIsCorrect = false;
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
    let topLevelDomains = ["com", "net", "org", "edu", "gov", "hk", "tw"];
    Mailcheck.run({
      email: email.value,
      domains: domains,
      topLevelDomains: topLevelDomains,
      suggested: function(suggestion) {
        // callback code
        mailcheckMessage.innerHTML = `您要輸入的是 <span class="email-suggestion">${suggestion.full}</span> 嗎？`;
        mailIsCorrect = false;
      },
      empty: function() {
        // callback code
        mailcheckMessage.innerText = ""; // clean the suggestion
        mailIsCorrect = true;
      }
    });
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required()
  });
  if (mailcheckMessage) {
    mailcheckMessage.addEventListener("click", function() {
      const emailSuggestion = document.querySelector(".email-suggestion")
        .innerText;
      if (emailSuggestion) {
        email.value = emailSuggestion;
        this.innerText = "";
      }
    });
  }
  if (email) {
    email.addEventListener("blur", mailcheck);
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
      mailcheck();
      isValid.then(valid => {
        if (valid && mailIsCorrect) {
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
  const share = document.querySelector(".btn-share");
  whatsapp.addEventListener("click", () => {
    whatsappShare();
  });
  facebook.addEventListener("click", () => {
    fbShare();
  });
  share.addEventListener("click", () => {
    mainShare();
  });
  const whatsappShare = function() {
    console.log("whatsappShare");
    //set up the url
    var url =
      "whatsapp://send?text=綠色和平特別為大家制訂一本防疫手冊，內容包括《家居與出門的防疫篇》、《自製防疫用品篇》和《起居飲食篇》等，為您提供一系列綠色小貼士，讓大家抗疫之餘，亦盡力減低對地球環境的負荷！即刻睇 ";
    //define the message text
    var text = "https://act.gp/3c4FU1H";
    //encode the text
    var encodedText = encodeURIComponent(text);
    //set the href attribute on the link
    window.open(url + encodedText);
  };
  const fbShare = function() {
    console.log("fbShare");
    var baseURL = "https://www.facebook.com/sharer/sharer.php";
    var u =
      "https://act.greenpeace.org/page/56266/petition/1?utm_campaign=general&utm_source=facebook&utm_medium=social&utm_content=card-share";
    var t = (window.innerHeight - 436) / 2;
    var l = (window.innerWidth - 626) / 2;
    window.open(
      baseURL + "?u=" + encodeURIComponent(u),
      "_blank",
      "width=626,height=436,top=" + t + ",left=" + l
    );
  };
  const mainShare = function(e) {
    console.log(e);
    console.log("mainShare");
    // WEB SHARE API
    if (navigator.share) {
      // we can use web share!
      navigator
        .share({
          title: "",
          text:
            "綠色和平特別為大家制訂一本防疫手冊，內容包括《家居與出門的防疫篇》、《自製防疫用品篇》和《起居飲食篇》等，為您提供一系列綠色小貼士，讓大家抗疫之餘，亦盡力減低對地球環境的負荷！即刻睇",
          url: "https://act.gp/2TbekHI"
        })
        .then(() => console.log("Successfully shared"))
        .catch(error => console.log("Error sharing:", error));
    } else {
      fbShare();
    }
  };
});
