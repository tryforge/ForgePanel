<!--
  Reminder for Berk of the future:
  - Add cool tooltips for each input question, with gifs
  - Change the header illustration
  - Maybe fix the underline thingy
  - Maybe add a redirection thing
  - Add <head> metadata (Except indexing ones, add anti crawling/bots meta tags on all the panel sites so people's panels don't get indexed)
  -->
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Setup</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet">
    <!-- CSS Libraries -->
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.7.0/fonts/remixicon.css" rel="stylesheet">
    <style>
      :root {
      --primary-background: #0a0a0c; /* Dark color */
      --secondary-background: #0f0e12; /* Lighter */
      --shade-background: #05040d; /* Darker */
      --primary-text: #ffffff; /* White */
      --secondary-text: #b3b3b3; /* Gray */
      --alt-text: #858585;
      --light-gray: #696a6c;
      --primary-border: #18191e;
      --secondary-border: #2a2b31;
      --dark-gray: #b3b3b3;
      }
      body {
      background-color: var(--secondary-background);
      color: var(--primary-text);
      font-family: 'Inter', sans-serif;
      }
      ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      }
      ::-webkit-scrollbar-thumb {
      background-color: #272727;
      border-radius: 50px;
      }
      ::-webkit-scrollbar-track {
      background-color: #161616;
      }
      .bg-primary {
      background-color: var(--primary-background);
      }
      .bg-secondary {
      background-color: var(--secondary-background);
      }
      .border-primary {
      border: 1px solid var(--primary-border);
      }
      .border-secondary {
      border: 1px solid var(--secondary-border);
      }
      .bg-lighter {
      background-color: rgb(255 255 255 / 4%);
      }
      .bg-alt-primary {
      background-color: #1c1b22;
      }
      .bg-alt-secondary {
      background-color: #121117;
      }
      .bg-alt-light {
      background-color: #302f37;
      }
      .animate-dots::after {
      content: "";
      display: inline-block;
      width: 1.2em;
      text-align: left;
      animation: 2s steps(4) infinite dot-animation;
      }
      @keyframes dot-animation{
      0%,20%{
      content:"."
      }
      40%{
      content:".."
      }
      60%{
      content:"..."
      }
      100%,80%{
      content:""
      }
      }
      .border-r-primary {
      border-right: 1px solid var(--primary-border);   
      }
      .border-b-primary {
      border-bottom: 1px solid var(--primary-border);
      }
      .border-t-primary {
      border-top: 1px solid var(--primary-border);
      }
      .border-gray {
      border: 1px solid var(--primary-border);
      }
      .text-primary {
      color: var(--primary-text);
      }
      .text-secondary {
      color: var(--secondary-text);
      }
      .text-category {
      color: var(--alt-text);
      }
      .text-light {
      color: var(--light-gray);
      }
      /*tab icons*/
      .nav-link span i {
      color: var(--dark-gray);
      }
      .logo {
      width: 7rem;
      }
      .user-icon {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      }
      .menu-text {
      font-size: 10.1px;
      text-transform: uppercase;
      }
      .category-label:hover {
      color: var(--secondary-text);
      }
      .nav-link {
      text-decoration: none;
      color: var(--secondary-text);
      }
      .nav-link:hover {
      color: white;
      }
      .text-xxs {
      font-size: 11px;
      }
      .text-2xxs {
      font-size: 9px;
      }
      .tab-active {
      background-color: rgb(255 255 255 / 4%);
      color: var(--primary-text);
      }
      .nav-link .nav-icon {
      margin-left: 1.25rem;
      }
      .h-almost {
      height: 97vh;
      }
      input[type="checkbox"]:checked + .block {
      background: #7d44e9;
      }
      input[type="checkbox"]:checked + .block .dot {
      transform: translateX(95%);
      background-color: #ffffff;
      left: auto;
      right: 19px;
      }
      .disabled-check {
      opacity: 60%;
      cursor: not-allowed !important;
      pointer-events: none;
      }
    </style>
  </head>
  <body class="flex md:items-center justify-center h-screen">
    <!-- Error Modal -->
    <div class="fixed inset-0 flex items-center justify-center z-50 hidden" id="error-modal">
      <div class="absolute inset-0 bg-black opacity-90"></div>
      <!-- Modal Content -->
      <div class="m-2 md:m-0 md:w-1/2 fixed z-50">
        <!-- Modal Tab -->
        <div class="rounded-lg h-5/6 pb-5 bg-alt-secondary border-primary overflow-auto relative">
          <div class="bg-alt-primary px-4 py-3 rounded-t-lg">
            <h2 class="text-xs text-primary"><i class="ri-error-warning-line"></i> Oops!</h2>
          </div>
          <!-- Close Button -->
          <button onclick="closeModal()" class="absolute top-2 right-2 text-white focus:outline-none">
          <i class="ri-close-line"></i>
          </button>
          <!-- Error Icon SVG -->
          <div class="flex items-center justify-center text-purple-400 my-3">
            <i class="ri-error-warning-line text-9xl"></i>
          </div>
          <!-- Error Text Labels -->
          <div class="text-purple-400 text-center mx-6">
            <h1 class="font-bold text-xl">Error!</h1>
            <p class="text-xs text-primary w-3/4 text-center m-auto">There's been an error while finishing the setup for your panel, you can close this modal and try again, if the error continues please <a href="https://botforge.org/discord" class="text-purple-400" target="_blank">contact us</a>.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Success Modal -->
    <!-- Modal with Overlay -->
    <div class="fixed inset-0 flex items-center justify-center z-50 hidden" id="success-modal">
      <div class="absolute inset-0 bg-black opacity-90"></div>
      <!-- Modal Content -->
      <div class="m-2 md:m-0 md:w-1/2 fixed z-50">
        <!-- Modal tab -->
        <div class="rounded-lg pb-5 bg-alt-secondary border-primary overflow-auto relative h-5/6">
          <div class="bg-alt-primary px-4 py-3 rounded-t-lg">
            <h2 class="text-xs text-primary"><i class="ri-emotion-laugh-line"></i> We are done!</h2>
          </div>
          <div class="flex items-center justify-center text-green-400 my-3">
            <i class="ri-check-line text-9xl"></i>
          </div>
          <!-- Success Text Labels -->
          <div class="text-green-400 text-center mx-6">
            <h1 class="font-bold text-xl">Setup Complete!</h1>
            <p class="text-xs text-primary w-3/4 text-center m-auto border-b-primary pb-5">Congratulations! Your panel setup has been successfully completed.</p>
            <section class="overflow-auto h-80">
              <p class="text-secondary text-2xxs uppercase mb-1 font-semibold flex items-center justify-between pt-5">
                Bot ID
              </p>
              <span class="pr-3 py-2 w-full text-xs flex text-primary">
              <i class="ri-check-line text-green-400 mr-2"></i>
              <span id="summary-botid">BOT ID HERE</span>
              </span>
              <p class="text-secondary text-2xxs uppercase mb-1 font-semibold flex items-center justify-between pt-3">
                Prefixes
              </p>
              <span class="pr-3 py-2 w-full text-xs flex text-primary">
              <i class="ri-check-line text-green-400 mr-2"></i>
              <span id="summary-prefixes" class="w-full flex flex-wrap">PREFIXES</span>
              </span>
              <p class="text-secondary text-2xxs uppercase mb-1 font-semibold flex items-center justify-between pt-3">
                Extensions
              </p>
              <span class="pr-3 py-2 w-full text-xs flex text-primary">
              <i class="ri-check-line text-green-400 mr-2"></i>
              <span id="summary-extensions" class="w-full flex flex-wrap">EXTENSIONS</span>
              </span>
              <p class="text-secondary text-2xxs uppercase mb-1 font-semibold flex items-center justify-between pt-3">
                Intents
              </p>
              <span class="pr-3 py-2 w-full text-xs flex text-primary">
              <i class="ri-check-line text-green-400 mr-2"></i>
              <span id="summary-intents" class="w-full flex flex-wrap">INTENTS</span>
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
    <!-- Main content -->
    <div class="m-2 md:m-0 md:w-1/2">
      <!-- Manage Tab -->
      <div class="rounded-lg h-5/6 pb-5 bg-alt-secondary border-primary overflow-auto">
        <div class="bg-alt-primary px-4 py-3 rounded-t-lg">
          <h2 class="text-xs text-primary"><i class="ri-settings-3-line"></i> Panel Setup</h2>
        </div>
        <div class="mx-5 pt-5">
          <div class="w-full h-24 bg-gradient-to-r from-purple-400 to-purple-800 flex items-center justify-between px-4 rounded-lg">
            <div>
              <h1 class="text-lg text-primary font-semibold" id="header-title">Almost done!</h1>
              <p class="text-xs text-primary" id="header-description">We have to setup some things before going to your panel.</p>
            </div>
            <img src="https://cdn.discordapp.com/attachments/897503042734288966/1201287543392587959/9TWCVcY.png" alt="Header Image" class="h-28 w-28 object-contain">
          </div>
        </div>
        <!-- info -->
        <div class="border-b-primary my-5">
          <div class="text-2xxs mx-5 mb-3"><i class="ri-asterisk text-secondary"></i> The asterik (*) symbol indicates that the associated input fields are required.</div>
        </div>
        <!-- end info -->
        <!-- Manage Tab Content -->
        <div class="text-xs text-primary w-fit mx-5">
          <section class="inputs space-y-2" id="page-1">
            <!-- Token Input -->
            <div class="input-container">
              <label for="token" class="text-secondary text-2xxs uppercase mb-1 font-semibold flex items-center justify-between">Bot Token *
              <a href="#" class="uppercase ml-auto text-2xxs text-purple-400"><i class="ri-pushpin-2-fill"></i> <span id='tokenTip'>Where do I get it?</span></a>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="ri-key-line text-secondary"></i>
                </span>
                <input type="text" data-step="1" id="token" name="token" class="pl-8 pr-3 py-2 w-full bg-alt-primary border-secondary rounded focus:outline-none focus:border-primary" spellcheck="false" placeholder="Bot Token">
              </div>
            </div>
            <!-- Prefix Input -->
            <div class="input-container" onclick="this.classList.add('text-green-500'); document.getElementById('prefix-icon').classList.add('text-green-500'); document.getElementById('prefix-icon').classList.remove('text-secondary');">
              <label for="prefix" class="text-secondary text-2xxs uppercase mb-1 mt-4 font-semibold flex items-center justify-between">Prefix – For multiple use commas.
              <a href="#" class="uppercase ml-auto text-2xxs text-purple-400"><i class="ri-pushpin-2-fill"></i> What's this?</a>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="ri-slash-commands-2 text-secondary" id='prefix-icon'></i>
                </span>
                <input type="text" data-step="1" id="prefix" name="prefix" class="pl-8 pr-3 py-2 w-full bg-alt-primary border-secondary rounded focus:outline-none focus:border-primary" spellcheck="false" placeholder="Prefix(es)">
              </div>
            </div>
            <!-- Client Secret Input -->
            <div class="input-container">
              <label for="client-secret" class="text-secondary text-2xxs uppercase mb-1 mt-4 font-semibold flex items-center justify-between">
              Client Secret *
              <a href="#" class="uppercase ml-auto text-2xxs text-purple-400"><i class="ri-pushpin-2-fill"></i> <span id="secretTip">Where do I get it?</span></a>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="ri-shield-keyhole-line text-secondary" id='client-secret-icon'></i>
                </span>
                <input type="text" data-step="1" id="client-secret" name="client-secret" class="pl-8 pr-3 py-2 w-full bg-alt-primary border-secondary rounded focus:outline-none focus:border-primary" spellcheck="false" placeholder="Client Secret">
              </div>
            </div>
          </section>
          <section class="extensions space-y-2 hidden" id="page-2">
            <p class="text-secondary text-2xxs uppercase mt-2 font-semibold">Intents</p>
            <div id="intents-list" class="border-primary bg-secondary px-5 rounded-lg space-y-4">
              <div class="flex items-center justify-between individual-setting pb-4 border-b-primary pt-4">
                <div>
                  <label for="toggle-all-intents" class="text-gray-300 font-semibold text-xs cursor-pointer select-none">
                  All Intents
                  </label>
                  <div>
                    <a class="text-xs text-purple-400 mt-2" href="#" onclick="toggleEvents(this)">
                    Show Warning <i class="ri-arrow-drop-right-line" data-icon="arrow"></i>
                    </a>
                    <div class="events-list mt-2 mr-5 border-primary py-3 px-4 rounded-lg text-purple-200 hidden">
                      <ul class="text-xxs">
                        <p><i class="ri-alert-line"></i> All events will be unlocked if you enable this option.</p>
                        <br>
                        <p>
                          It's generally recommended to selectively enable only the intents that are essential for your bot's functionality. This approach not only safeguards user privacy but also enhances the overall performance of your bot by minimizing the retrieval of unnecessary event data.
                        </p>
                        <br>
                        <p>
                          If your bot genuinely requires access to all intents, is still in development, or is not intended for public use, you may proceed with caution.
                        </p>
                      </ul>
                    </div>
                  </div>
                </div>
                <label for="toggle-all-intents">
                  <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable/Disable">
                    <input type="checkbox" id="toggle-all-intents" class="sr-only">
                    <div class="block bg-gray-600 w-10 h-6 rounded-full transition duration-300">
                      <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                    </div>
                  </div>
                </label>
              </div>
              <!-- predefined GUILDS intent -->
              <div class="flex items-center justify-between individual-setting pb-4 border-b-primary">
                <div>
                  <label for="intents-guilds" class="text-gray-300 font-semibold text-xs cursor-pointer select-none disabled-check">
                  Guilds *
                  </label>
                  <div>
                    <a class="text-xs text-purple-400 mt-2" href="#" onclick="toggleEvents(this)">
                    Show Events <i class="ri-arrow-drop-right-line" data-icon="arrow"></i>
                    </a>
                    <div class="events-list mt-2 border-primary py-3 px-4 rounded-lg text-purple-200 hidden">
                      <ul>
                        <li>guildCreate</li>
                        <li>guildUpdate</li>
                        <li>guildDelete</li>
                        <li>guildRoleCreate</li>
                        <li>guildRoleUpdate</li>
                        <li>guildRoleDelete</li>
                        <li>channelCreate</li>
                        <li>channelUpdate</li>
                        <li>channelDelete</li>
                        <li>channelPinsUpdate</li>
                        <li>threadCreate</li>
                        <li>threadUpdate</li>
                        <li>threadDelete</li>
                        <li>threadListSync</li>
                        <li>threadMemberUpdate</li>
                        <li>threadMembersUpdate</li>
                        <li>stageInstanceCreate</li>
                        <li>stageInstanceUpdate</li>
                        <li>stageInstanceDelete</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <label for="intents-guilds" class="disabled-check">
                  <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable/Disable">
                    <input type="checkbox" id="intents-guilds" class="sr-only" checked>
                    <div class="block bg-gray-600 w-10 h-6 rounded-full transition duration-300">
                      <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                    </div>
                  </div>
                </label>
              </div>
              <!-- dynamic... -->
            </div>
          </section>
          <section class="extensions space-y-2 hidden" id="page-3">
            <p class="text-secondary text-2xxs uppercase mt-2 font-semibold">Extensions</p>
            <div id="extensions-list" class="border-primary bg-secondary px-5 py-5 rounded-lg space-y-4">
              <!-- dynamic... -->
            </div>
          </section>
        </div>
        <!-- End Manage Tab Content -->
      </div>
      <!-- End Manage Tab -->
      <!-- buttons -->
      <!-- Pagination Buttons -->
      <section class="buttons bg-alt-secondary px-4 py-3 rounded-lg border-primary mt-3">
        <div class="flex justify-between items-center text-xs">
          <button id="backBtn" class="hidden select-none bg-alt-light hover:opacity-80 text-white py-2 px-4 rounded focus:outline-none"><i class="ri-arrow-left-s-line"></i> Back</button>
          <button id="nextBtn" class="select-none bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none ml-auto disabled-check">Next <i class="ri-arrow-right-s-line"></i></button>
          <button id="finishBtn" onclick="finishSetup()" class="hidden select-none bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none ml-auto hidden">Finish <i class="ri-arrow-right-s-line"></i></button>
        </div>
      </section>
    </div>
    <script>
      // Modal Close Function
      function closeModal() {
        const modalContainer = document.querySelector('.fixed.inset-0');
        modalContainer.classList.add('hidden');
      }
      
      
      // Bot Token Validation
      
        let givenToken;
        let givenID;
      
        function validateBotToken() {
          const tokenInput = document.getElementById('token');
          const tokenValue = tokenInput.value.trim();
          const tokenTip = document.getElementById('tokenTip');
          const iconElement = document.querySelector('.input-container i.ri-key-line');
      
          tokenInput.classList.remove('text-green-400', 'text-red-400');
          iconElement.classList.remove('text-green-400', 'text-red-400', 'text-secondary');
          tokenTip.classList.remove('underline');
      
          const tokenParts = tokenValue.split('.');
      
          if (tokenParts.length === 3) {
            try {
              const decodedBotID = atob(tokenParts[0]);
      
              if (/^\d{16,21}$/.test(decodedBotID)) {
                console.log("[BotForge] All checks passed! Possible valid Bot Token given, input allowed.");
                givenToken = true;
                givenID = decodedBotID;
              } else {
                console.log("[BotForge] User Input Problem › Invalid Token, invalid Bot ID as first component, given:", tokenParts[0]);
              givenToken = false;
              }
            } catch (error) {
              console.log("[BotForge] Invalid decoding.");
              givenToken = false;
            }
          } else {
            console.log("[BotForge] User Input Problem › Invalid Token, missing components.");
            givenToken = false;
            tokenTip.classList.add('underline');
          }
      
          const colorClass = givenToken ? 'text-green-400' : 'text-red-400';
          iconElement.classList.add(colorClass);
          tokenInput.classList.add(colorClass);
        }
      
        document.getElementById('token').addEventListener('input', validateBotToken);
      
        // Prefix "Validation"
        let prefixArray = [];
      
        function debounce(func, delay) {
          let timeoutId;
          return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, arguments), delay);
          };
        }
      
        function updatePrefixArray() {
          const prefixInput = document.getElementById('prefix');
          const prefixValue = prefixInput.value.trim();
      
          prefixArray = prefixValue.split(',').map(prefix => prefix.trim()).filter(prefix => prefix !== '');
      
          console.log("[BotForge] Prefix Array:", prefixArray);
        }
        document.getElementById('prefix').addEventListener('input', debounce(updatePrefixArray, 300));
      
        // Client Secret Validation
        let givenSecret;
        function checkClientSecret() {
          const clientSecretInput = document.getElementById('client-secret');
          const clientSecretValue = clientSecretInput.value.trim();
          const secretTip = document.getElementById('secretTip');
      
          const isValid = clientSecretValue.length >= 15 && /\d/.test(clientSecretValue);
      
          const colorClass = isValid ? 'text-green-400' : 'text-red-400';
      
          clientSecretInput.classList.remove('text-green-400', 'text-red-400');
          clientSecretInput.classList.add(colorClass);
          if(isValid) { givenSecret = true; secretTip.classList.remove('underline'); } else { givenSecret = false; secretTip.classList.add('underline'); }
      
          const iconElement = document.querySelector('.input-container i.ri-shield-keyhole-line');
          iconElement.classList.remove('text-green-400', 'text-red-400', 'text-secondary');
          iconElement.classList.add(colorClass);
        }
      
        document.getElementById('client-secret').addEventListener('input', checkClientSecret);
      
      
        // Pagination (Next/Back/Finish) for the form thing
        const firstPage = document.querySelectorAll('input[type="text"][data-step="1"]');
      
        function firstContinue(event) {
          const nextButton = document.getElementById('nextBtn');
          if(givenToken && givenSecret) {
          nextButton.classList.remove('disabled-check');
          } else { nextButton.classList.add('disabled-check'); }
        }
      
        firstPage.forEach(input => {
          input.addEventListener('input', firstContinue);
        });
      
      // Toggle All Intents Toggle
      document.addEventListener("DOMContentLoaded", function() {
          const masterToggle = document.getElementById("toggle-all-intents");
      
          const intentToggles = document.querySelectorAll('[data-group="intents"] input[type="checkbox"]');
      
          masterToggle.addEventListener("click", function() {
              const isChecked = masterToggle.checked;
      
              intentToggles.forEach(function(toggle) {
                  toggle.checked = isChecked;
                  toggle.closest('.individual-setting').classList.toggle('disabled-check', isChecked);
              });
          });
      
          intentToggles.forEach(function(toggle) {
              toggle.addEventListener("click", function() {
                  toggle.closest('.individual-setting').classList.remove('disabled-check');
              });
          });
      });
          
          // Add intent Toggles
              function addIntentToggle(intentTitle, intentName, events, latest) {
                  const intentsList = document.getElementById('intents-list');
      
                  // Create intent toggle element
                  const intentToggle = document.createElement('div');
                  intentToggle.classList.add('flex', 'items-center', 'justify-between', 'individual-setting', 'pb-4');
                  intentToggle.setAttribute('data-group', 'intents');
                  
                  if(!latest) {
                  intentToggle.classList.add('border-b-primary')
                  }
                  
                  let noEvents = '';
                  if(events.length === 0) {
                  noEvents = "<i class='ri-information-line'></i> This intent does not represent individual events.";
                  }
      
                  intentToggle.innerHTML = `
                      <div>
                          <label for="intents-${intentName}" class="text-gray-300 font-semibold text-xs cursor-pointer select-none">
                              ${intentTitle}
                          </label>
      
                          <div>
                              <a class="text-xs text-purple-400 mt-2" href="#" onclick="toggleEvents(this)">
                                  Show Events <i class="ri-arrow-drop-right-line" data-icon="arrow"></i>
                              </a>
                              <div class="events-list mt-2 border-primary py-3 px-4 rounded-lg text-purple-200 hidden">
                                  <ul>
                                      ${events.map(event => `<li>${event}</li>`).join('')}
                                      ${noEvents}
                                  </ul>
                              </div>
                          </div>
                      </div>
      
                      <label for="intents-${intentName}">
                          <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable/Disable">
                              <input type="checkbox" id="intents-${intentName}" class="sr-only">
                              <div class="block bg-gray-600 w-10 h-6 rounded-full transition duration-300">
                                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                              </div>
                          </div>
                      </label>
                  `;
      
                  // Append the intent toggle to the container
                  intentsList.appendChild(intentToggle);
              }
      
      
      //addIntentToggle(intentTitle, intentName, events, latest)
      
      // GUILD_MEMBERS (1 << 1) **
      addIntentToggle(
        "Guild Members",
        "GuildMembers",
        ["guildMemberAdd", "guildMemberUpdate", "guildMemberRemove", "threadMembersUpdate"]
      );
      
      // GUILD_MODERATION (1 << 2)
      addIntentToggle(
        "Guild Moderation",
        "GuildModeration",
        ["guildAuditLogEntryCreate", "guildBanAdd", "guildBanRemove"]
      );
      
      // GUILD_EMOJIS_AND_STICKERS (1 << 3)
      addIntentToggle(
        "Guild Emojis and Stickers",
        "GuildEmojisAndStickers",
        ["guildEmojisUpdate", "guildStickersUpdate"]
      );
      
      // GUILD_INTEGRATIONS (1 << 4)
      addIntentToggle(
        "Guild Integrations",
        "GuildIntegrations",
        ["guildIntegrationsUpdate", "integrationCreate", "integrationUpdate", "integrationDelete"]
      );
      
      // GUILD_WEBHOOKS (1 << 5)
      addIntentToggle(
        "Guild Webhooks",
        "GuildWebhooks",
        ["webhooksUpdate"]
      );
      
      // GUILD_INVITES (1 << 6)
      addIntentToggle(
        "Guild Invites",
        "GuildInvites",
        ["inviteCreate", "inviteDelete"]
      );
      
      // GUILD_VOICE_STATES (1 << 7)
      addIntentToggle(
        "Guild Voice States",
        "GuildVoiceStates",
        ["voiceStateUpdate"]
      );
      
      // GUILD_PRESENCES (1 << 8)
      addIntentToggle(
        "Guild Presences",
        "GuildPresences",
        ["presenceUpdate"]
      );
      
      // GUILD_MESSAGES (1 << 9)
      addIntentToggle(
        "Guild Messages",
        "GuildMessages",
        ["messageCreate", "messageUpdate", "messageDelete", "messageDeleteBulk"]
      );
      
      // GUILD_MESSAGE_REACTIONS (1 << 10)
      addIntentToggle(
        "Guild Message Reactions",
        "GuildMessageReactions",
        ["messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageReactionRemoveEmoji"]
      );
      
      // GUILD_MESSAGE_TYPING (1 << 11)
      addIntentToggle(
        "Guild Message Typing",
        "GuildMessageTyping",
        ["typingStart"]
      );
      
      // DIRECT_MESSAGES (1 << 12)
      addIntentToggle(
        "Direct Messages",
        "DirectMessages",
        ["messageCreate", "messageUpdate", "messageDelete", "channelPinsUpdate"]
      );
      
      // DIRECT_MESSAGE_REACTIONS (1 << 13)
      addIntentToggle(
        "Direct Message Reactions",
        "DirectMessageReactions",
        ["messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageReactionRemoveEmoji"]
      );
      
      // DIRECT_MESSAGE_TYPING (1 << 14)
      addIntentToggle(
        "Direct Message Typing",
        "DirectMessageTyping",
        ["typingStart"]
      );
      
      // MESSAGE_CONTENT (1 << 15)
      addIntentToggle(
        "Message Content",
        "MessageContent",
        []
      );
      
      // GUILD_SCHEDULED_EVENTS (1 << 16)
      addIntentToggle(
        "Guild Scheduled Events",
        "GuildScheduledEvents",
        ["guildScheduledEventCreate", "guildScheduledEventUpdate", "guildScheduledEventDelete", "guildScheduledEventUserAdd", "guildScheduledEventUserRemove"]
      );
      
      // AUTO_MODERATION_CONFIGURATION (1 << 20)
      addIntentToggle(
        "Auto Moderation Configuration",
        "AutoModerationConfiguration",
        ["autoModerationRuleCreate", "autoModerationRuleUpdate", "autoModerationRuleDelete"]
      );
      
      // AUTO_MODERATION_EXECUTION (1 << 21)
      addIntentToggle(
        "Auto Moderation Execution",
        "AutoModerationExecution",
        ["autoModerationActionExecution"]
      );
          function toggleEvents(element) {
              const eventsList = element.nextElementSibling;
              const icon = element.querySelector('i[data-icon="arrow"]');
      
              eventsList.classList.toggle('hidden');
              icon.classList.toggle('ri-arrow-drop-right-line');
              icon.classList.toggle('ri-arrow-drop-down-line');
          }
      
      // Get Checked Extensions
      function retrieveCheckedExtensions() {
          const checkboxes = document.querySelectorAll('#extensions-list [data-group="extensions"] input[type="checkbox"]:checked');
          const extensionsArray = Array.from(checkboxes).map(checkbox => checkbox.id.replace('extensions-', ''));
          
          console.log("[BotForge] Proceeding with enabled extensions:", extensionsArray);
          return extensionsArray;
      }
      
      // Get Checked Intents
      function retrieveCheckedIntents() {
          const checkboxes = document.querySelectorAll('#intents-list [data-group="intents"] input[type="checkbox"]:checked');
          const intentArray = ['Guilds', ...Array.from(checkboxes).map(checkbox => checkbox.id.replace('intents-', ''))];
          
          console.log("[BotForge] Proceeding with enabled intents:", intentArray);
          return intentArray;
      }
      
      // The OG Finish Button
      function finishSetup() {
        const extensions = retrieveCheckedExtensions();
        const intents = retrieveCheckedIntents();
        console.log('[BotForge] Prefixes:', prefixArray);
        console.log('[BotForge] Token Given:', givenToken ?? false);
        console.log('[BotForge] Bot ID:', givenID ?? false);
        console.log('[BotForge] Client Secret Given:', givenSecret ?? false);
      
        if (!givenToken || !givenSecret) {
          console.error('[BotForge] Error: Token or Client Secret not provided.');
          return;
        }
      
        const postData = {
          token: givenToken,
          prefix: prefixArray,
          intents: intents,
          clientSecret: givenSecret,
          extensions: extensions
        };
      
        fetch('/prev.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then(response => {
            if (response.ok) {
                
      const sumBotID = document.getElementById("summary-botid");
      const sumPrefixes = document.getElementById("summary-prefixes");
      const sumExtensions = document.getElementById("summary-extensions");
      const sumIntents = document.getElementById("summary-intents");
      
      sumBotID.textContent = givenID;
      sumPrefixes.innerHTML = formatArray(prefixArray, "prefixes");
      sumExtensions.innerHTML = formatArray(extensions, "extensions");
      sumIntents.innerHTML = formatArray(intents, "intents");
      
      function formatArray(array, type) {
        if (array.length === 0) {
          return `<i class="ri-error-warning-line mr-1"></i> No ${type} selected.`;
        }
      
        const formattedArray = array.map(item => {
          if (type !== 'extensions') {
            return `<div class="border border-purple-400 px-4 py-1 rounded-xl mr-1 mb-2">${item}</div>`;
          } else {
            return `<div class="border border-purple-400 px-4 py-1 rounded-xl mr-1 mb-2"><a href="https://docs.botforge.org/p/${item}/" target="_blank"><i class="ri-external-link-line"></i> ${item}</a></div>`;
          }
        });
      
        return formattedArray.join('');
      }
      
      
                
              document.getElementById('success-modal').classList.remove('hidden');
            } else {
              document.getElementById('error-modal').classList.remove('hidden');
              console.error('[BotForge] Error:', response.statusText);
            }
          })
          .catch(error => {
            document.getElementById('error-modal').classList.remove('hidden');
            console.error('[BotForge] Error:', error);
          });
      }
      
          // More pagination
          const page1 = document.getElementById('page-1');
          const page2 = document.getElementById('page-2');
          const page3 = document.getElementById('page-3');
          const backBtn = document.getElementById('backBtn');
          const nextBtn = document.getElementById('nextBtn');
          const finishBtn = document.getElementById('finishBtn');
          const headerTitle = document.getElementById('header-title');
          const headerDescription = document.getElementById('header-description');
      
          let currentPage = 1;
      
          const pageContent = {
              1: {
                  title: 'Almost done!',
                  description: 'We have to setup some things before going to your panel.'
              },
              2: {
                  title: 'Intents',
                  description: 'Choose your intents wisely, especially if your bot isn\'t private; opt for only the ones your bot will use.'
              },
              3: {
                  title: 'Extensions',
                  description: 'Enhance ForgeScript capabilities by using extensions; this list exclusively displays official ones.'
              }
          };
      
          function showPage(pageNumber) {
              page1.classList.toggle('hidden', pageNumber !== 1);
              page2.classList.toggle('hidden', pageNumber !== 2);
              page3.classList.toggle('hidden', pageNumber !== 3); 
      
              backBtn.classList.toggle('hidden', pageNumber === 1);
              nextBtn.classList.toggle('hidden', pageNumber === 3); 
              finishBtn.classList.toggle('hidden', pageNumber !== 3);
      
              headerTitle.textContent = pageContent[pageNumber].title;
              headerDescription.textContent = pageContent[pageNumber].description;
          }
      
          // Event listeners for pagination
          backBtn.addEventListener('click', () => {
              const newPage = currentPage - 1;
              if (newPage >= 1) {
                  currentPage = newPage;
                  showPage(currentPage);
              }
          });
      
          nextBtn.addEventListener('click', () => {
              const newPage = currentPage + 1;
              if (newPage <= 3) {
                  currentPage = newPage;
                  showPage(currentPage);
              }
          });
      
          // Show the first page
          showPage(currentPage);
      
      // Add Extension Toggles Function
              function addExtensionToggle(extensionName, latest, defaultEnabled) {
                  const toggleContainer = document.getElementById('extensions-list');
      
                  const toggleElement = document.createElement('div');
                  toggleElement.classList.add('flex', 'items-center', 'justify-between', 'individual-setting');
                  toggleElement.setAttribute('data-group', 'extensions')
                  if(!latest) {
                  toggleElement.classList.add('border-b-primary', 'pb-4');
                  }
                  
                  let checkedToggle;
                  if(defaultEnabled) {
                  checkedToggle = 'checked';
                  }
      
                  toggleElement.innerHTML = `
                      <div>
                          <label for="extensions-${extensionName}" class="text-gray-300 font-semibold text-xs cursor-pointer select-none">
                              ${extensionName}
                          </label>
                          
                          <div>
                              <a class="text-xs text-purple-400 mt-1 leading-none" href="https://docs.botforge.org/p/${extensionName}/" target="_blank">
                                  Documentation <i class="ri-arrow-drop-right-line"></i>
                              </a>
                          </div>
                      </div>
      
                      <label for="extensions-${extensionName}">
                          <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable/Disable">
                              <input type="checkbox" id="extensions-${extensionName}" class="sr-only" ${checkedToggle}>
                              <div class="block bg-gray-600 w-10 h-6 rounded-full transition duration-300">
                                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                              </div>
                          </div>
                      </label>
                  `;
      
                  toggleContainer.appendChild(toggleElement);
              }
      
      // Add Extension Toggles Based on the fetched /extension array thingy
      // const extensionList = ["ForgeDB", "ForgeCanvas", "ForgeTopGG"]; (for testing, ignore)
      
      // Fetch
      fetch('/extensions')
      .then(response => {
      if (!response.ok) {
      throw new Error('Problem while fetching, alert!!');
      }
      return response.json();
      })
      .then(data => {
      const extensionList = data.available;
      console.log("Available extensions: ",extensionList);
      })
      .catch(error => {
      console.error('Skill issue while fetching:', error);
      });
      
      
      // Loop
      
      for (let i = 0; i < extensionList.length; i++) {
      const extensionName = extensionList[i];
      const latest = i === extensionList.length - 1;
      addExtensionToggle(extensionName, latest);
      }
      
      
      
      // Toggle checkboxes
      
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      
      checkboxes.forEach((checkbox) => {
          checkbox.addEventListener('change', () => {
              const action = checkbox.checked ? 'enabled' : 'disabled';
              console.log(`[settings] Checkbox ${checkbox.id} ${action}`);
          });
      });
    </script>
  </body>
</html>