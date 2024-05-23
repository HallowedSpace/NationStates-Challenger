// ==UserScript==
// @name         NationStates AutoChallenger
// @namespace    http://tampermonkey.net/
// @version      2024-05-03
// @description  NationStates Enhancer
// @author       HallowedSpace
// @match        https://www.nationstates.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beautifier.io
// ==/UserScript==
(function() {
    'use strict';
    let regex = /[a-zA-Z]\/(.*)(=)(0|1)/m;
    let isValid = regex.test(window.location.href)&&(window.location.href).includes("page=challenge");
    let inChallenge = (document.querySelector("#trumps-scorecard-round-2") != null);
     if(isValid){
         let difference = (document.querySelectorAll("h2")[1].textContent.includes("pts")) ? +(document.querySelectorAll("h2")[1].textContent.split(": ")[1].replace(" pts","").replace("+","")) : 0;
         if(difference<=0&&difference>-3){
            document.querySelector("input[type=submit]").click();
         }
         else setTimeout(()=>{location.reload()},150);
    }
    if(inChallenge){
        let isDefeat = document.querySelector("#trumps-result").children[0].textContent.toLocaleLowerCase().includes("defeat");
        let isTie = document.querySelector("#trumps-result").children[0].textContent.toLocaleLowerCase().includes("tie");
        if(isDefeat||isTie)location.reload();
        else{
            fetch(`https://www.nationstates.net/page=ajax2/a=finalize_challenge/gid=${document.querySelector("#trumps-gameid").textContent}`, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9,hi;q=0.8",
                    "cache-control": "no-cache",
                    "pragma": "no-cache",
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not=A?Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                },
                "referrer": "https://www.nationstates.net/page=challenge",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            });
            window.location.href = "https://www.nationstates.net/page=challenge/matchmaker=1";
        }
    }
})();
