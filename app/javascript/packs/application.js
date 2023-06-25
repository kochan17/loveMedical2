// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// 以下に共有されたJavaScriptを追加します
document.addEventListener('DOMContentLoaded', (event) => {
  function sl_txt(className) {
    if (document.getElementsByClassName(className).length > 0) {
      const targets = document.getElementsByClassName(className);
      const options = { rootMargin: "0px 0px -25% 0px" };
      const setAnimationClass = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className + "--active");
          } else {
            entry.target.classList.remove(className + "--active");
          }
        });
      };
      for (let i = 0; i < targets.length; i++) {
        const typeData = targets[i].getAttribute("data-type");
        const colorData = targets[i].getAttribute("data-color");
        const colorArray = ["light", "dark"];
        let colorClass = "light";
        const text = targets[i].innerHTML.replace(/<br>/g, "*");
        let array = text.split("");
        const range = array.join("").match(/[^*]/g).length;
        let normalArray = [];
        let shuffledArray = [];
        for (let i = 1; i <= range; i++) {
          normalArray.push(i);
          shuffledArray.push(i);
        }
        function compareRandom() {
          return Math.random() - 0.5;
        }
        shuffledArray = shuffledArray.sort(compareRandom);
        targets[i].innerHTML = "";
        let index = 0;
        let tag = "";
        if (colorArray.includes(colorData)) {
          colorClass = colorData;
        }
        if (typeData === "random") {
          for (let i = 0; i < array.length; i++) {
            if (array[i] !== "*") {
              tag += '<span class="sl-txtInr sl-txtInr--' + shuffledArray[index] + " sl-txtInr--" + colorClass + '">' + array[i] + "</span>";
              index++;
            } else {
              tag += "<br />";
            }
          }
        } else {
          for (let i = 0; i < array.length; i++) {
            if (array[i] !== "*") {
              tag += '<span class="sl-txtInr sl-txtInr--' + normalArray[index] + " sl-txtInr--" + colorClass + '">' + array[i] + "</span>";
              index++;
            } else {
              tag += "<br />";
            }
          }
        }
        targets[i].innerHTML = tag;
        const observer = new IntersectionObserver(setAnimationClass, options);
        observer.observe(targets[i]);
      }
    } else {
      alert("「" + className + "」というclass名をもつ要素が存在しません。");
    }
  }
  sl_txt("sl-txtNz");
});