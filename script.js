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
    let qs = (a,b) => document[`querySelector${b ?"All":""}`](a);
    let isValid = regex.test(window.location.href)&&(window.location.href).includes("page=challenge");
    let inChallenge = (document.querySelector("#trumps-gameid") != null);
    let isError = (document.querySelector("#cloudflare-error-box") != null)
     if(isValid){
         let difference = (qs("h2",1)[1].textContent.includes("pts")) ? +(qs("h2",1)[1].textContent.split(": ")[1].replace(" pts","").replace("+","")) : 0;
         if(difference<=0&&difference>=-4){//edit to your liking
            qs("input[type=submit]").click();
         }
         else location.reload();
    }
    if(inChallenge){
        let isDefeat = qs("#trumps-result").children[0].textContent.toLocaleLowerCase().includes("defeat");
        let isTie = qs("#trumps-result").children[0].textContent.toLocaleLowerCase().includes("tie");
        if(isDefeat||isTie)location.reload();
        else{
            fetch(`https://www.nationstates.net/page=ajax2/a=finalize_challenge/gid=${qs("#trumps-gameid").textContent}`, {
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
    if(isError){
        window.location.href = "https://www.nationstates.net/page=challenge/matchmaker=1";
    }
})();
