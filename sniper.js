// ==UserScript==
// @name         WebSniper (GameId Detection)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  by .lunary.
// @author       Your grandmother (shes not gonna tell u if u ask her)
// @match        https://discord.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      auth.roblox.com
// @connect      apis.roblox.com
// @run-at       document-end
// ==/UserScript==

(async function() {
    'use strict';


//////////////////////////////////////////////

    const robloxcookie = ""; // WARNING if no cookie, then script cant tell if its sols rng or not. (you can use any cookie, even ur alts, it doesnt matter just put a valid one and make sure it is valid)
    let checkgameid = true
    if (!robloxcookie && checkgameid) alert("No roblox cookie. Disabling checking gameId. Look on github for more info.")

//////////////////////////////////////////////




    let dreamspaceenabled = true
    let glitchenabled = true
    let formattedRequiredG = [], formattedRequiredD = [], formattedIgnoreKeywords = [], ignoreKeywords = [], requiredG = [], requiredD = [];
    const audio = new Audio("site with .mp3"); // this is the sound that plays when a link is sniped
    audio.volume = 0.5;

    // Create the log box UI
    const box = document.createElement('div');
    box.id = 'logBox';
    box.style.position = 'fixed';
    box.style.top = '10px';
    box.style.right = '10px';
    box.style.width = '500px';
    box.style.height = '200px';
    box.style.background = 'rgba(100, 100, 100, 0.5)';
    box.style.backdropFilter = 'blur(8px)';
    box.style.webkitBackdropFilter = 'blur(8px)'; // Safari support
    box.style.color = '#FFF';
    box.style.fontFamily = 'monospace';
    box.style.fontSize = '12px';
    box.style.padding = '10px';
    box.style.border = '1px solid #FFF';
    box.style.borderRadius = '8px';
    box.style.zIndex = '999999';
    box.style.cursor = 'move';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';


    const title = document.createElement('button');
    title.textContent = 'Debug Box';
    title.style.padding = '5px 10px';
    title.style.setProperty('cursor', 'default', 'important');
    const titleheader = document.createElement('div');
    titleheader.style.position = 'absolute';
    titleheader.style.top = '10px';
    titleheader.style.left = '10px';
    titleheader.style.display = 'flex';
    titleheader.style.gap = '10px';

    box.appendChild(titleheader);
    titleheader.appendChild(title);
    const logContent = document.createElement('div');
    logContent.style.width = '400px';
    logContent.style.height = '175px';
    logContent.style.paddingBottom = '6px';
    logContent.style.boxSizing = 'border-box';
    logContent.style.overflowY = 'auto';
    logContent.style.color = '#FFF';
    logContent.style.fontFamily = 'monospace';
    logContent.style.fontSize = '12px';
    logContent.style.lineHeight = '1.2em';
    logContent.style.display = 'flex';
    logContent.style.flexDirection = 'column';
    logContent.style.zIndex = '999999';
    logContent.style.position = 'absolute';
    logContent.style.top = '40px';
    logContent.style.right = '110px';


    box.appendChild(document.createElement('br'));

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '10px';
    buttonsContainer.style.right = '10px';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '10px';

    // Create two buttons
    const button1 = document.createElement('button');
    button1.textContent = `glitch: ${glitchenabled}`;
    button1.style.padding = '5px 10px';
    const button2 = document.createElement('button');
    button2.textContent = `dreamspace: ${dreamspaceenabled}`;
    button2.style.padding = '5px 10px';
    const button3 = document.createElement('button');
    button3.textContent = 'clear logs';
    button3.style.padding = '5px 10px';

    box.appendChild(logContent);
    buttonsContainer.appendChild(button1);
    buttonsContainer.appendChild(button2);
    buttonsContainer.appendChild(button3);
    box.appendChild(buttonsContainer);
    document.body.appendChild(box);
    const buttonStyle = {
        background: 'rgba(80, 80, 80, 0.80)',
        color: '#FFF',
        fontFamily: 'monospace',
        fontSize: '12px',
        border: '1px solid #FFF',
        borderRadius: '8px',
        padding: '5px 10px',
        userSelect: 'none',
    };
    Object.assign(button1.style, buttonStyle);
    Object.assign(button2.style, buttonStyle);
    Object.assign(button3.style, buttonStyle);
    Object.assign(title.style, buttonStyle);




    button1.addEventListener('mouseenter', () => {
        button1.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    button1.addEventListener('mouseleave', () => {
        button1.style.background = 'rgba(80, 80, 80, 0.80)';
    });
    button2.addEventListener('mouseenter', () => {
        button2.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    button2.addEventListener('mouseleave', () => {
        button2.style.background = 'rgba(80, 80, 80, 0.80)';
    });
    button3.addEventListener('mouseenter', () => {
        button3.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    button3.addEventListener('mouseleave', () => {
        button3.style.background = 'rgba(80, 80, 80, 0.80)';
    });

    // Make it draggable
    let dragging = false, offsetX = 0, offsetY = 0;
    box.addEventListener('mousedown', (e) => {
        dragging = true;
        offsetX = e.clientX - box.getBoundingClientRect().left;
        offsetY = e.clientY - box.getBoundingClientRect().top;
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (dragging) {
            box.style.left = (e.clientX - offsetX) + 'px';
            box.style.top = (e.clientY - offsetY) + 'px';
            box.style.right = 'auto';
        }
    });
    document.addEventListener('mouseup', () => {
        dragging = false;
    });

    function logBox(message) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        const timestamp = `${time}.${milliseconds}`;
        const entry = document.createElement('div');
        entry.textContent = `[${timestamp}] ${message}`;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
    };

    button1.addEventListener('click', () => {
        if (glitchenabled) {glitchenabled = false; logBox("No longer sniping glitch")} else {glitchenabled = true; logBox("Sniping glitch");}
        button1.textContent = `glitch: ${glitchenabled}`;
    });

    button2.addEventListener('click', () => {
        if (dreamspaceenabled) {dreamspaceenabled = false; logBox("No longer sniping dreamspace");} else {dreamspaceenabled = true; logBox("Sniping dreamspace");}
        button2.textContent = `dreamspace: ${dreamspaceenabled}`;
    });

    button3.addEventListener('click', () => {
        logContent.innerHTML = '';
    });
    if (!robloxcookie && checkgameid) alert("No roblox cookie. Disabling checking gameId. Look on github for more info."); logBox("No Roblox Cookie. cannot fetch Gameid from share links.")

    function fetchJSON(url) {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          headers: {
            "Accept": "application/json"
          },
          onload: function(response) {
            if (response.status >= 200 && response.status < 300) {
              try {
                const data = JSON.parse(response.responseText);
                resolve(data);
              } catch (e) {
                reject(new Error("Failed to parse JSON"));
              }
            } else {
              reject(new Error(`HTTP error! status: ${response.status}`));
            }
          },
          onerror: function(err) {
            reject(new Error("Network error"));
          }
        });
      });
    }

    logBox('by .lunary.');
    if (!glitchenabled) {logBox("Glitch will not be sniped (glitchenabled = false)"); return} else {logBox("Glitch will be sniped");}
    if (!dreamspaceenabled) {logBox("Dreamspace will not be sniped (dreamspaceenabled = false)"); return} else {logBox("Dreamspace will be sniped");}

    let processedMessageIds = new Set();
    let deeelay = 25
    let pleasewait = true

    function convertToDeeplink(link) {
         const regex = /https:\/\/www\.roblox\.com\/share\?code=([a-zA-Z0-9]+)/;
         const regex2 = /https:\/\/www\.roblox\.com\/games\/15532962292\/[^\s?]+(?:\?privateServerLinkCode=([a-zA-Z0-9]+))?/;
         const match = link.match(regex);
         const match2 = link.match(regex2);
         if (match) {
             const accessCode = match[1];
             const deeplink = `roblox://navigation/share_links?code=${accessCode}&type=Server&pid=share&is_retargeting=true`;
             logBox(`Converted`);
             return deeplink;
         }
         if (match2) {
             const accessCode2 = match2[1];
             const deeplink2 = `roblox://placeID=15532962292&linkCode=${accessCode2}`;
             logBox(`Converted`);
             return deeplink2;
         }
         logBox(`Invalid: ${link}`);
         return null;
     }
     const formatKeywords = (keywords) => keywords.map(keyword => keyword.replace(/<space>/g, ' '));
       async function init() {
           try {
               const json = await fetchJSON('https://raw.githubusercontent.com/Lunatic-T/Websniper/main/Keywords.json');
               logBox('fetched keyword data');
               requiredD = json.requiredD
               requiredG = json.requiredG
               ignoreKeywords = json.ignoreKeywords
               formattedRequiredG = formatKeywords(requiredG);
               formattedRequiredD = formatKeywords(requiredD);
               formattedIgnoreKeywords = formatKeywords(ignoreKeywords);

               setInterval(processLatestMessage, deeelay);
           } catch(e) {
               console.error("Failed to fetch JSON:", e);
               logBox("Error fetching keywords, aborting.");
           }
       }

     let __checkpass__ = false
         // Function to process and click only the latest message
     function processLatestMessage() {
         const messageContainer = document.querySelector('[class*="scrollerInner_"]');
         if (!messageContainer) return;
         const messages = messageContainer.querySelectorAll('[class^="message_"]');
         const latestMessage = messages[messages.length - 1];
         if (!latestMessage) return;
         let messageReal = latestMessage.querySelector('[class*="messageContent"]');
         if (!messageReal) {
             const allDivs = latestMessage.querySelectorAll('div');
             for (const div of allDivs) {
                 if (div.textContent && div.textContent.includes('roblox.com')) {
                     messageReal = div;
                     break;
                 }
             }
         }
         if (!messageReal) { console.error('Message content not found'); return; }
         const messageId = latestMessage.getAttribute('data-list-item-id');
         if (processedMessageIds.has(messageId)) return;
         processedMessageIds.add(messageId);

         const textContent = messageReal.textContent.toLowerCase();
         let hasRequiredD = formattedRequiredD.some(keyword => textContent.includes(keyword.toLowerCase()));
         let hasRequiredG = formattedRequiredG.some(keyword => textContent.includes(keyword.toLowerCase()));
         let hasIgnoreKeyword = formattedIgnoreKeywords.some(keyword => textContent.includes(keyword.toLowerCase()));

         const matchedRequiredD = formattedRequiredD.filter(k => textContent.includes(k.toLowerCase()));
         const matchedRequiredG = formattedRequiredG.filter(k => textContent.includes(k.toLowerCase()));
         const matchedIgnored = formattedIgnoreKeywords.filter(k => textContent.includes(k.toLowerCase()));

         if (matchedRequiredG.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredG });
         }
         if (matchedRequiredD.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredD });
         }
         if (matchedIgnored.length > 0) {
             console.warn('Message skipped: contains ignored keywords.', { matchedIgnored });
         }

         if (!hasRequiredG && !hasRequiredD || hasIgnoreKeyword || __checkpass__ || pleasewait) {
             console.log(messageReal);
             pleasewait = false
             return;
         }

         const links = messageReal.querySelectorAll('a');
         const robloxLinkRegex = /https:\/\/www\.roblox\.com\/(?:games\/\d+\/[^\s?]+(?:\?[^ ]*)?|share\?code=[a-z0-9]+[^ ]*)/i;

         const robloxLinks = Array.from(links).filter(link => robloxLinkRegex.test(link.href));
         if (robloxLinks.length === 1) {
             if (hasRequiredG) {
                 if (!glitchenabled) {logBox("ignored glitch"); return}
                 logBox("Glitch detected");
             }
             if (hasRequiredD) {
                 if (!dreamspaceenabled) {logBox("ignored dreamspace"); return;}
                 logBox("Dreamspace detected");
             }
             __checkpass__ = true
             const originalLink = robloxLinks[0].href;
             const deeplink = convertToDeeplink(originalLink);
             if (deeplink) {
                 robloxLinks[0].href = deeplink;
                 robloxLinks[0].textContent = deeplink;
                 const tempUrl = deeplink.replace("roblox://", "http://");
                 const parsedUrl = new URL(tempUrl);
                 const code = parsedUrl.searchParams.get("code");
                 if (checkgameid && robloxcookie && code) {

                     ////////////////////// get game id from api.exe
                     (async () => {
                         try {
                             logBox(code)
                             const response = await fetch('http://localhost:3000/resolve', {
                                 method: "POST",
                                 headers: {
                                     "Content-Type": "application/json"
                                 },
                                 body: JSON.stringify({
                                     code: code,
                                     cookie: robloxcookie
                                 })
                             });
                             if (!response.ok) {
                                 const text = await response.text();
                                 console.error("Server returned error page:", text);
                                 throw new Error("Request failed with status " + response.status);
                             }
                             const data = await response.json();
                             const privateServerData = data.privateServerInviteData;
                             const placeId = privateServerData.placeId;
                             logBox(placeId)
                             console.log(placeId)
                             if (!privateServerData) {
                                 logBox("No private server data");
                                 return;
                             }

                             if (placeId === 15532962292) {
                                 window.open(deeplink, '_self');
                                 logBox("Launched in client");
                                 audio.play().catch(err => {
                                     console.warn("Sound playback failed (usually due to browser autoplay policy):", err);
                                 });
                                 setTimeout(() => { __checkpass__ = false}, 3000);
                             } else {
                                 logBox("Link does not redirect to Sol's RNG.");
                             }
                         } catch (e) {
                             console.error(e);
                             logBox("Error contacting local server");
                         }
                     })();

                     ////////////////////// get game id from api.exe

                 } else {
                     window.open(deeplink, '_self');
                     logBox(`Launched in client, skipped checking gameid`)
                     audio.play().catch(err => {
                         console.warn("Sound playback failed (usually due to browser autoplay policy):", err);
                     });
                     setTimeout(() => { __checkpass__ = false}, 3000); //3 sec cooldown before accepting another glitch
                 }
             }
         }
     }
    init();
})();
