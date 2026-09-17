/**
 * AgriNex Buyer Module - Enterprise Intelligence & Sourcing Suite 2.0
 * Features:
 * 1. AI Sourcing Copilot Suite (Multi-Turn Chat, 10-Language STT & TTS, Dynamic Arbitrage Engine, Buy/Wait Signals, Basket Optimizer)
 * 2. Enterprise Digital Purchase Order (PO) & Tax Invoice Generator
 * 3. Side-by-Side Multi-Lot Comparative Matrix
 * 4. Live GPS Fleet & Reefer Cold-Chain Telemetry Visualizer
 * 5. Interactive 2D Warehouse Chamber & Silo Slot Visualizer
 */

(function () {
  'use strict';

  // State Management
  const selectedCompareLots = new Set();
  let copilotLang = 'en';
  let copilotHistory = [];
  let speechRecognizer = null;
  let isListening = false;
  let wasVoiceInput = false;
  let activeSpeechUtterance = null;
  window.copilotLotCache = window.copilotLotCache || {};

  // 10 Indian Languages (+ English) Configuration
  const SUPPORTED_LANGUAGES = {
    'en': { name: "English", code: "en-IN", bcp: "en-IN", voicePrefix: "en", welcome: "Hello! I am your AgriNex AI Sourcing Assistant. Ask for landed arbitrage, APMC mandi forecasts, emergency salvage lots, or enter your budget." },
    'hi': { name: "हिन्दी", code: "hi-IN", bcp: "hi-IN", voicePrefix: "hi", welcome: "नमस्ते! मैं एग्रीनेक्स प्रोक्योरमेंट एआई हूँ। महाराष्ट्र मंडी आर्बिट्राज, मूल्य पूर्वानुमान, आपातकालीन लॉट या बजट बास्केट के बारे में पूछें।" },
    'mr': { name: "मराठी", code: "mr-IN", bcp: "mr-IN", voicePrefix: "mr", welcome: "नमस्कार! मी अॅग्रीनेक्स खरेदी सल्लागार एआय आहे. लासलगाव/नारायणगाव बाजारभाव, लँडेड नफा, साल्वेज लॉट किंवा थेट शेतकरी खरेदी बाबत विचारा." },
    'bn': { name: "বাংলা", code: "bn-IN", bcp: "bn-IN", voicePrefix: "bn", welcome: "নমস্কার! আমি এগ্রিনেক্স প্রকিউরমেন্ট এআই। রিয়েল-টাইম মান্ডি সালভেজ, গুণমান এবং ল্যান্ডেড খরচ সম্পর্কে জিজ্ঞাসা করুন।" },
    'te': { name: "తెలుగు", code: "te-IN", bcp: "te-IN", voicePrefix: "te", welcome: "నమస్కారం! నేను అగ్రినెక్స్ ప్రొక్యూర్మెంట్ AI. మార్కెట్ ధరలు, ల్యాండెడ్ లాభాలు మరియు బడ్జెట్ కొనుగోళ్ల గురించి అడగండి." },
    'ta': { name: "தமிழ்", code: "ta-IN", bcp: "ta-IN", voicePrefix: "ta", welcome: "வணக்கம்! நான் அக்ரிநெக்ஸ் கொள்முதல் AI. மண்டல சந்தை விலை, மொத்த லாப வரம்பு மற்றும் நேரடி கொள்முதல் பற்றி கேட்கலாம்." },
    'gu': { name: "ગુજરાતી", code: "gu-IN", bcp: "gu-IN", voicePrefix: "gu", welcome: "નમસ્તે! હું એગ્રીનેક્સ પ્રાપ્તિ AI છું. મહારાષ્ટ્ર મંડી આર્બિટ્રેજ, જથ્થાબંધ ભાવ અને સસ્તા સોદા વિશે પૂછો." },
    'ur': { name: "اردو", code: "ur-IN", bcp: "ur-IN", voicePrefix: "ur", welcome: "السلام علیکم! میں ایگری نیکس سورسنگ AI ہوں۔ براہ راست کسانوں سے خریداری اور مارکیٹ کے بہترین نرخوں کے لیے پوچھیں۔" },
    'kn': { name: "ಕನ್ನಡ", code: "kn-IN", bcp: "kn-IN", voicePrefix: "kn", welcome: "ನಮಸ್ಕಾರ! ನಾನು ಅಗ್ರಿನೆಕ್ಸ್ ಸಂಗ್ರಹಣೆ AI. ಮಂಡಿ ದರಗಳು, ಸಾಗಣೆ ವೆಚ್ಚ ಮತ್ತು ಕಡಿಮೆ ಬೆಲೆಯ ಲಾಟ್‌ಗಳ ಬಗ್ಗೆ ಕೇಳಿ." },
    'or': { name: "ଓଡ଼ିଆ", code: "or-IN", bcp: "or-IN", voicePrefix: "or", welcome: "ନମସ୍କାର! ମୁଁ ଏଗ୍ରିନେକ୍ସ କ୍ରୟ AI। ମଣ୍ଡି ଦର, ଲାଣ୍ଡେଡ୍ ଖର୍ଚ୍ଚ ଏବଂ କୃଷକଙ୍କ ଉତ୍ପାଦ ବିଷୟରେ ପଚାରନ୍ତୁ।" },
    'ml': { name: "മലയാളം", code: "ml-IN", bcp: "ml-IN", voicePrefix: "ml", welcome: "നമസ്കാരം! ഞാൻ അഗ്രിനെക്സ് പ്രൊക്യുർമെന്റ് AI. വിപണി വിലകൾ, ലാൻഡഡ് ലാഭം, നേരിട്ടുള്ള കർഷക ഇടപാടുകൾ എന്നിവ ചോദിക്കാം." }
  };

  // =========================================================================
  // 1. AI SOURCING COPILOT & VOICE MULTILINGUAL SUITE
  // =========================================================================

  function openCopilotModal() {
    const modal = document.getElementById('modal-ai-copilot');
    if (modal) {
      modal.classList.add('active');
      if (copilotHistory.length === 0) {
        renderCopilotWelcome();
      } else {
        scrollChatToBottom();
      }
    }
  }

  function closeCopilotModal() {
    const modal = document.getElementById('modal-ai-copilot');
    if (modal) modal.classList.remove('active');
    stopCopilotTTS();
    stopListening();
  }

  function setCopilotLanguage(langCode) {
    if (!SUPPORTED_LANGUAGES[langCode]) langCode = 'en';
    copilotLang = langCode;

    // Sync dropdown select if present
    const langSel = document.getElementById('copilot-lang-select');
    if (langSel) langSel.value = langCode;

    // Update active pill UI
    document.querySelectorAll('.copilot-lang-pill').forEach(pill => {
      if (pill.getAttribute('data-lang') === langCode) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    const langInfo = SUPPORTED_LANGUAGES[langCode];
    const ind = document.getElementById('copilot-voice-lang-indicator');
    if (ind) ind.textContent = `Voice: ${langInfo.name}`;

    const statusEl = document.getElementById('copilot-status-text');
    if (statusEl) statusEl.textContent = `Switched to ${langInfo.name}. Ready for voice & text queries.`;

    // Re-init speech recognizer language
    if (speechRecognizer) {
      speechRecognizer.lang = langInfo.code;
    }

    if (copilotHistory.length === 0) {
      renderCopilotWelcome();
    }
  }

  function renderCopilotWelcome() {
    const container = document.getElementById('copilot-chat-thread');
    if (!container) return;

    const langInfo = SUPPORTED_LANGUAGES[copilotLang] || SUPPORTED_LANGUAGES['en'];

    container.innerHTML = `
      <div class="copilot-message-ai" id="welcome-msg-block">
        <div class="copilot-card-ai" style="background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%); border: 1.5px solid #86efac; padding: 12px 14px; border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 1.1rem;">🧠</span>
              <strong style="color: #064e3b; font-size: 0.88rem;">AgriNex AI Assistant</strong>
            </div>
            <button class="btn btn-outline btn-sm" onclick="playCopilotTTS('${encodeURIComponent(langInfo.welcome)}', '${copilotLang}', 'welcome-msg-block')" style="font-size: 0.68rem; padding: 2px 7px; color: #0c5a36; border-color: #86efac; background: #ffffff;">
              🔊 Listen
            </button>
          </div>
          <p style="font-size: 0.8rem; color: #166534; line-height: 1.4; margin: 0 0 8px 0;">
            ${langInfo.welcome}
          </p>
          <div style="display: flex; gap: 8px; font-size: 0.7rem; color: #475569; flex-wrap: wrap;">
            <span>⚡ Arbitrage Hunter</span>
            <span>•</span>
            <span>📈 Buy/Wait Signals</span>
            <span>•</span>
            <span>💼 Basket Allocator</span>
            <span>•</span>
            <span>🗣️ 10 Languages</span>
          </div>
        </div>
      </div>
    `;
  }

  function clearCopilotChat() {
    copilotHistory = [];
    stopCopilotTTS();
    renderCopilotWelcome();
  }

  function scrollChatToBottom() {
    const container = document.getElementById('copilot-chat-thread');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  // =========================================================================
  // VOICE & SPEECH RECOGNITION (STT)
  // =========================================================================

  function toggleCopilotSpeechRecognition() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome, Edge, or Chromium.");
      return;
    }

    try {
      speechRecognizer = new SpeechRecognition();
      const langInfo = SUPPORTED_LANGUAGES[copilotLang] || SUPPORTED_LANGUAGES['en'];
      speechRecognizer.lang = langInfo.code;
      speechRecognizer.continuous = false;
      speechRecognizer.interimResults = true;

      const micBtn = document.getElementById('btn-copilot-mic');
      const statusEl = document.getElementById('copilot-status-text');
      const input = document.getElementById('copilot-query-input');

      speechRecognizer.onstart = function () {
        isListening = true;
        if (micBtn) micBtn.classList.add('recording');
        if (statusEl) statusEl.innerHTML = `<span style="color: #dc2626; font-weight: 700;">🔴 Listening in ${langInfo.name}... Speak now...</span>`;
      };

      speechRecognizer.onresult = function (event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (input) input.value = transcript;
      };

      speechRecognizer.onerror = function (event) {
        console.warn('Speech recognition error:', event.error);
        stopListening();
        if (statusEl) statusEl.textContent = `Mic error: ${event.error}. Please retry.`;
      };

      speechRecognizer.onend = function () {
        const queryText = input ? input.value.trim() : '';
        if (queryText) {
          wasVoiceInput = true;
        }
        stopListening();
        if (queryText) {
          executeCopilotQuery(queryText);
        }
      };

      speechRecognizer.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      stopListening();
    }
  }

  function stopListening() {
    isListening = false;
    const micBtn = document.getElementById('btn-copilot-mic');
    if (micBtn) micBtn.classList.remove('recording');
    const statusEl = document.getElementById('copilot-status-text');
    if (statusEl) statusEl.textContent = "💡 Tip: Speak in your chosen regional language or type procurement queries.";
    if (speechRecognizer) {
      try { speechRecognizer.stop(); } catch (e) {}
    }
  }

  // =========================================================================
  // TEXT-TO-SPEECH (TTS) AUDIO ENGINE (Sarvam AI Native Indian TTS + Browser Fallback)
  // =========================================================================

  let activeAudioObj = null;
  let currentTTSRequestId = 0;
  let currentPlayingElementId = null;
  let ttsAbortController = null;

  async function playCopilotTTS(encodedText, langCode, elementId) {
    // If the user clicks the same button that is currently playing or loading, toggle it OFF (stop)
    if (elementId && elementId === currentPlayingElementId) {
      stopCopilotTTS();
      return;
    }

    const text = decodeURIComponent(encodedText);
    stopCopilotTTS();

    const requestId = ++currentTTSRequestId;
    currentPlayingElementId = elementId || null;

    if (ttsAbortController) {
      try { ttsAbortController.abort(); } catch (e) {}
    }
    ttsAbortController = new AbortController();

    const stopBtn = document.getElementById('btn-copilot-tts-stop');
    if (stopBtn) stopBtn.style.display = 'inline-flex';

    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) el.classList.add('playing-tts');
    }

    // Try Sarvam AI Indian Neural Voice endpoint first
    try {
      const resp = await fetch('/api/tts/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ttsAbortController.signal,
        body: JSON.stringify({
          text: text,
          language_code: langCode,
          speaker: 'meera'
        })
      });

      // If another TTS request started while fetch was in-flight, discard this one
      if (requestId !== currentTTSRequestId) {
        return;
      }

      if (resp.ok) {
        const data = await resp.json();
        if (requestId !== currentTTSRequestId) {
          return;
        }

        if (data && data.success && data.audio_base64) {
          // Double safety: stop any other audio before starting
          if (activeAudioObj) {
            try {
              activeAudioObj.pause();
              activeAudioObj.currentTime = 0;
            } catch (e) {}
            activeAudioObj = null;
          }
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }

          const audio = new Audio('data:audio/wav;base64,' + data.audio_base64);
          activeAudioObj = audio;

          audio.onended = function () {
            if (requestId === currentTTSRequestId) {
              stopCopilotTTS();
            }
          };
          audio.onerror = function () {
            if (requestId === currentTTSRequestId) {
              fallbackBrowserTTS(text, langCode, elementId, requestId);
            }
          };
          await audio.play();
          return;
        }
      }
    } catch (err) {
      if (err && err.name === 'AbortError') {
        return; // Request was aborted by subsequent click
      }
      console.warn('Sarvam TTS API request failed, falling back to browser speech synthesis:', err);
    }

    if (requestId !== currentTTSRequestId) {
      return;
    }

    // Fallback: Browser Web Speech API
    fallbackBrowserTTS(text, langCode, elementId, requestId);
  }

  function fallbackBrowserTTS(text, langCode, elementId, requestId) {
    if (!window.speechSynthesis) {
      stopCopilotTTS();
      return;
    }

    if (requestId && requestId !== currentTTSRequestId) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langInfo = SUPPORTED_LANGUAGES[langCode] || SUPPORTED_LANGUAGES['en'];
    utterance.lang = langInfo.code;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Find best voice match
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const match = voices.find(v => v.lang === langInfo.code || v.lang.startsWith(langInfo.voicePrefix) || (langCode === 'en' && (v.lang === 'en-IN' || v.name.includes('India'))));
      if (match) utterance.voice = match;
    }

    utterance.onstart = function () {
      if (requestId && requestId !== currentTTSRequestId) {
        window.speechSynthesis.cancel();
        return;
      }
      activeSpeechUtterance = utterance;
      if (elementId) {
        const el = document.getElementById(elementId);
        if (el) el.classList.add('playing-tts');
      }
    };

    utterance.onend = function () {
      if (!requestId || requestId === currentTTSRequestId) {
        stopCopilotTTS();
      }
    };

    utterance.onerror = function () {
      if (!requestId || requestId === currentTTSRequestId) {
        stopCopilotTTS();
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function stopCopilotTTS() {
    currentTTSRequestId++;
    currentPlayingElementId = null;
    if (ttsAbortController) {
      try { ttsAbortController.abort(); } catch (e) {}
      ttsAbortController = null;
    }
    if (activeAudioObj) {
      try {
        activeAudioObj.pause();
        activeAudioObj.currentTime = 0;
      } catch (e) {}
      activeAudioObj = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    activeSpeechUtterance = null;
    const stopBtn = document.getElementById('btn-copilot-tts-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    document.querySelectorAll('.playing-tts').forEach(el => el.classList.remove('playing-tts'));
  }

  // =========================================================================
  // QUERY EXECUTION & MULTI-TURN THREAD ENGINE
  // =========================================================================

  function askCopilot(queryText) {
    const input = document.getElementById('copilot-query-input');
    if (input) input.value = queryText;
    executeCopilotQuery(queryText);
  }

  function handleCopilotSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('copilot-query-input');
    if (!input || !input.value.trim()) return;
    const query = input.value.trim();
    input.value = '';
    executeCopilotQuery(query);
  }

  async function executeCopilotQuery(query) {
    const thread = document.getElementById('copilot-chat-thread');
    if (!thread) return;

    // 1. Append User Message Bubble
    const userMsgId = `user-msg-${Date.now()}`;
    const userMsgHtml = `
      <div class="copilot-message-user" id="${userMsgId}">
        <div class="copilot-bubble-user">
          ${escapeHtml(query)}
        </div>
      </div>
    `;
    thread.insertAdjacentHTML('beforeend', userMsgHtml);

    // 2. Append Typing Indicator
    const typingId = `typing-${Date.now()}`;
    const typingHtml = `
      <div class="copilot-message-ai" id="${typingId}">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 18px; display: inline-flex; align-items: center; gap: 8px; color: #0c5a36; font-size: 0.85rem; font-weight: 600;">
          <span style="font-size: 1.2rem; animation: pulse 1s infinite;">⚡</span>
          <span>Analyzing Mandi APMC Arbitrage, Logistics Freight & 7-Day Forecasts...</span>
        </div>
      </div>
    `;
    thread.insertAdjacentHTML('beforeend', typingHtml);
    scrollChatToBottom();

    try {
      // 3. Request Live Backend AI Copilot Chat Endpoint
      const response = await fetch('/api/buyer/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          language: copilotLang,
          history: copilotHistory,
          buyerLocation: "Vashi APMC Central Terminal, Navi Mumbai"
        })
      });

      let data;
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error("Backend response error");
      }

      // Remove typing indicator
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();

      // Render AI Answer Card
      renderAIResponseCard(data, query);

      // Record to history
      copilotHistory.push({ role: 'user', content: query });
      copilotHistory.push({ role: 'assistant', content: data.advisory.recommendation });

      // Auto-TTS if user asked via voice mic
      if (wasVoiceInput) {
        wasVoiceInput = false;
        playCopilotTTS(encodeURIComponent(data.advisory.recommendation), copilotLang);
      }

    } catch (err) {
      console.warn("Using local dynamic fallback for Copilot query:", err);
      // Fallback
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      renderLocalFallbackResponse(query);
    }
  }

  function triggerCopilotPO(lotId) {
    const lot = window.copilotLotCache && window.copilotLotCache[lotId];
    if (lot) {
      const kgPrice = Number(lot.pricePerKg || 20);
      const totalEst = Math.round((lot.quantityKg || (lot.quantityQt ? lot.quantityQt * 100 : 5000)) * kgPrice);
      closeCopilotModal();
      generateAndOpenPO(lot.id, lot.crop, lot.quantity, lot.farmerName, totalEst);
    } else {
      closeCopilotModal();
      generateAndOpenPO(lotId);
    }
  }

  function renderAIResponseCard(data, originalQuery) {
    const thread = document.getElementById('copilot-chat-thread');
    if (!thread) return;

    const adv = data.advisory;
    const lots = data.matchedLots || [];
    const basket = data.basket;
    const msgId = `ai-msg-${Date.now()}`;

    // Cache lots for safe PO and modal invocation
    lots.forEach(lot => {
      window.copilotLotCache[lot.id] = lot;
    });

    let signalBadgeClass = 'badge-signal-buy';
    if (adv.buySignal === 'HOLD_WAIT') signalBadgeClass = 'badge-signal-wait';
    else if (adv.buySignal === 'SALVAGE') signalBadgeClass = 'badge-signal-salvage';

    const ttsText = `${adv.title}. ${adv.recommendation}. ${adv.signalBadge}.`;

    let cardHtml = `
      <div class="copilot-message-ai" id="${msgId}">
        <div class="copilot-card-ai" style="padding: 12px; border-radius: 12px;">
          
          <!-- Advisory Header -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1.5px solid #86efac; border-radius: 10px; padding: 10px 12px; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 6px; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 1.1rem;">🧠</span>
                <strong style="color: #064e3b; font-size: 0.88rem;">${adv.title}</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span class="badge ${signalBadgeClass}" style="font-size: 0.65rem; padding: 2px 6px;">${adv.signalBadge}</span>
                <button class="btn btn-outline btn-sm" onclick="playCopilotTTS('${encodeURIComponent(ttsText)}', '${copilotLang}', '${msgId}')" style="font-size: 0.65rem; padding: 2px 6px; background: #ffffff; color: #0c5a36; border-color: #86efac;">
                  🔊 Listen
                </button>
              </div>
            </div>

            <p style="font-size: 0.78rem; color: #14532d; line-height: 1.4; margin: 0 0 6px 0;">
              ${adv.recommendation}
            </p>

            <div style="display: flex; gap: 8px; font-size: 0.68rem; color: #166534; font-weight: 700; flex-wrap: wrap; border-top: 1px dashed #86efac; padding-top: 6px;">
              <span>⏱️ Timing: <strong>${adv.optimalWindow}</strong></span>
              <span>•</span>
              <span>💰 Spread: <strong style="color: #047857;">${adv.arbitrageSpread}</strong></span>
              <span>•</span>
              <span>🛡️ <strong>35% Escrow</strong></span>
            </div>
          </div>

          <!-- Dynamic Landed-Cost Breakdown Table -->
          ${adv.landedCostBreakdown ? `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; font-size: 0.72rem;">
              <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px; display: flex; justify-content: space-between;">
                <span>📊 Landed Cost vs Vashi Benchmark</span>
                <span style="color: #0c5a36;">Save ${adv.savingsPerKg}</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(85px, 1fr)); gap: 4px; text-align: center;">
                <div style="background: #ffffff; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
                  <span style="color: #64748b; display: block; font-size: 0.65rem;">Farm-Gate</span>
                  <strong>₹ ${adv.landedCostBreakdown.farmgatePriceKg.toFixed(2)}</strong>
                </div>
                <div style="background: #ffffff; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
                  <span style="color: #64748b; display: block; font-size: 0.65rem;">Freight</span>
                  <strong>+ ₹ ${adv.landedCostBreakdown.freightKg.toFixed(2)}</strong>
                </div>
                <div style="background: #ffffff; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
                  <span style="color: #64748b; display: block; font-size: 0.65rem;">Landed</span>
                  <strong style="color: #0c5a36;">₹ ${adv.landedCostBreakdown.totalLandedCostKg.toFixed(2)}</strong>
                </div>
                <div style="background: #ffffff; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
                  <span style="color: #64748b; display: block; font-size: 0.65rem;">Terminal</span>
                  <strong style="color: #dc2626;">₹ ${adv.landedCostBreakdown.terminalBenchmarkKg.toFixed(2)}</strong>
                </div>
                <div style="background: #ecfdf5; padding: 4px; border-radius: 4px; border: 1px solid #a7f3d0;">
                  <span style="color: #047857; display: block; font-size: 0.65rem;">Target Bid</span>
                  <strong style="color: #065f46;">₹ ${adv.landedCostBreakdown.recommendedTargetBidKg.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Budget Basket Mix Allocation (if requested) -->
          ${basket && basket.length > 0 ? `
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 8px 10px; margin-bottom: 10px;">
              <strong style="font-size: 0.76rem; color: #92400e; display: block; margin-bottom: 4px;">💼 Basket Allocation:</strong>
              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.72rem;">
                ${basket.map(item => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 4px 8px; border-radius: 4px; border: 1px solid #fef3c7;">
                    <div>
                      <strong>${item.crop}</strong>
                      <span style="color: #64748b; font-size: 0.68rem; margin-left: 4px;">📍 ${item.location}</span>
                    </div>
                    <div style="text-align: right;">
                      <strong style="color: #0c5a36;">₹ ${item.allocatedAmount.toLocaleString('en-IN')}</strong>
                      <span style="color: #475569; font-size: 0.68rem;"> (${item.estimatedQuantityQt} Qt)</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Matched Verified Farm Lots -->
          ${lots.length > 0 ? `
            <div style="margin-bottom: 4px;">
              <strong style="font-size: 0.78rem; color: #0f172a; display: block; margin-bottom: 6px;">Verified Farm Lots:</strong>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${lots.map(lot => {
                  const kgPrice = Number(lot.pricePerKg || 20).toFixed(2);
                  return `
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${lot.image || 'assets/images/tomato.jpg'}" alt="${lot.crop}" style="width: 32px; height: 32px; border-radius: 6px; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
                        <div>
                          <div style="display: flex; align-items: center; gap: 4px;">
                            <strong style="font-size: 0.82rem; color: #0f172a;">${lot.crop}</strong>
                            <span class="badge badge-grade-a" style="font-size: 0.6rem; padding: 1px 4px;">${lot.grade}</span>
                          </div>
                          <span style="font-size: 0.68rem; color: #64748b;">${lot.farmerName} • 📍 ${lot.farmerLocation}</span>
                        </div>
                      </div>

                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="text-align: right;">
                          <strong style="font-size: 0.88rem; color: #0c5a36;">₹ ${kgPrice}/kg</strong>
                          <div style="font-size: 0.65rem; color: #64748b;">Qty: <strong>${lot.quantity}</strong></div>
                        </div>

                        <!-- 1-Click Action Buttons -->
                        <div style="display: flex; gap: 3px; flex-wrap: wrap;">
                          <button class="btn btn-outline btn-sm" onclick="closeCopilotModal(); openFarmerChat('${lot.id}')" style="font-size: 0.66rem; padding: 3px 5px;" title="Chat">💬</button>
                          <button class="btn btn-outline btn-sm" onclick="toggleLotComparison('${lot.id}')" style="font-size: 0.66rem; padding: 3px 5px;" title="Compare">⚖️</button>
                          <button class="btn btn-outline btn-sm" onclick="triggerCopilotPO('${lot.id}')" style="font-size: 0.66rem; padding: 3px 6px; color: #0c5a36; border-color: #86efac;" title="Generate PO">📄 PO</button>
                          <button class="btn btn-primary btn-sm" onclick="closeCopilotModal(); openDirectBuyModal('${lot.id}')" style="font-size: 0.66rem; padding: 3px 8px; background: #0c5a36; border-color: #0c5a36; font-weight: 700;">⚡ Buy</button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

        </div>
      </div>
    `;

    thread.insertAdjacentHTML('beforeend', cardHtml);
    scrollChatToBottom();
  }

  function renderLocalFallbackResponse(query) {
    const thread = document.getElementById('copilot-chat-thread');
    if (!thread) return;

    const lower = query.toLowerCase();
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const matchedLots = lots.filter(l => lower.includes(l.crop.toLowerCase().split(' ')[0]) || lower.includes('onion') || lower.includes('tomato'));
    const finalLots = matchedLots.length > 0 ? matchedLots : lots.slice(0, 2);

    const fallbackData = {
      advisory: {
        title: "AgriNex Local Intelligence Advisory",
        recommendation: `Verified farm-gate lots matched in Maharashtra APMC zones. Direct procurement provides approx ₹ 3.20/kg savings over terminal middleman rates with 35% escrow guarantee.`,
        buySignal: "BUY_NOW",
        signalBadge: "🟢 BUY NOW (Optimal Margin)",
        arbitrageSpread: "+16.8% Margin Advantage",
        savingsPerKg: "₹ 3.40 /kg",
        optimalWindow: "Next 24–48 Hours",
        landedCostBreakdown: {
          farmgatePriceKg: 18.00,
          freightKg: 1.60,
          mandiCessKg: 0.27,
          handlingColdChainKg: 0.40,
          totalLandedCostKg: 20.27,
          terminalBenchmarkKg: 24.50,
          recommendedTargetBidKg: 19.50
        }
      },
      matchedLots: finalLots.map(l => ({
        id: l.id,
        crop: l.crop,
        quantity: l.quantity,
        pricePerKg: l.pricePerKg || 18,
        grade: l.grade || "Grade A",
        farmerName: l.farmerName,
        farmerLocation: l.farmerLocation,
        image: l.image,
        trustScore: "4.9 ⭐"
      }))
    };

    renderAIResponseCard(fallbackData, query);
  }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }

  // =========================================================================
  // 2. ENTERPRISE DIGITAL PURCHASE ORDER (PO) & TAX INVOICE GENERATOR
  // =========================================================================

  function generateAndOpenPO(refId, customCrop, customQty, customFarmer, customTotal) {
    const modal = document.getElementById('modal-digital-po');
    if (!modal) return;

    const poNumber = `PO-AGRI-${refId ? refId.replace(/[^0-9A-Z]/gi, '') : Math.floor(10000 + Math.random() * 90000)}-MH`;
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    
    // Find consignment or verified lot
    const lot = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots[0] : null;
    const cropName = customCrop || (lot ? lot.crop : 'Red Onion (Lasalgaon Garwa Export)');
    const qtyText = customQty || (lot ? lot.quantity : '50 Qt (5,000 kg)');
    const farmerName = customFarmer || (lot ? lot.farmerName : 'Rameshwar Patil');
    const totalVal = customTotal || 90000;
    const escrow35 = Math.round(totalVal * 0.35);
    const balance65 = totalVal - escrow35;

    // Fill DOM elements in PO modal
    const elPoNum = document.getElementById('po-doc-number');
    const elDate = document.getElementById('po-doc-date');
    const elFarmer = document.getElementById('po-farmer-name');
    const elCrop = document.getElementById('po-item-crop');
    const elQty = document.getElementById('po-item-qty');
    const elTotal = document.getElementById('po-total-amount');
    const elEscrowAdv = document.getElementById('po-escrow-adv');
    const elEscrowBal = document.getElementById('po-escrow-bal');

    if (elPoNum) elPoNum.textContent = poNumber;
    if (elDate) elDate.textContent = todayStr;
    if (elFarmer) elFarmer.textContent = farmerName;
    if (elCrop) elCrop.textContent = cropName;
    if (elQty) elQty.textContent = qtyText;
    if (elTotal) elTotal.textContent = `₹ ${totalVal.toLocaleString('en-IN')}`;
    if (elEscrowAdv) elEscrowAdv.textContent = `₹ ${escrow35.toLocaleString('en-IN')} (35% Locked)`;
    if (elEscrowBal) elEscrowBal.textContent = `₹ ${balance65.toLocaleString('en-IN')} (65% on Delivery)`;

    modal.classList.add('active');
  }

  function closeDigitalPOModal() {
    const modal = document.getElementById('modal-digital-po');
    if (modal) modal.classList.remove('active');
  }

  function printDigitalPO() {
    window.print();
  }

  function downloadDigitalPOPdf() {
    const elPoNum = document.getElementById('po-doc-number');
    const poNumber = elPoNum ? elPoNum.textContent.trim() : 'PO-AGRI-88219-MH';
    const elFarmer = document.getElementById('po-farmer-name');
    const elCrop = document.getElementById('po-item-crop');
    const elTotal = document.getElementById('po-total-amount');
    const elDate = document.getElementById('po-doc-date');
    const elQty = document.getElementById('po-item-qty');
    const elEscrowAdv = document.getElementById('po-escrow-adv');
    const elEscrowBal = document.getElementById('po-escrow-bal');

    const farmer = elFarmer ? elFarmer.textContent.trim() : 'Patil Rameshwar';
    const crop = elCrop ? elCrop.textContent.trim() : 'Red Onion (Lasalgaon Garwa Export Grade A)';
    const total = elTotal ? elTotal.textContent.trim() : '₹ 90,000';
    const dateStr = elDate ? elDate.textContent.trim() : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const qty = elQty ? elQty.textContent.trim() : '50 Qt (5,000 kg)';
    const escrowAdv = elEscrowAdv ? elEscrowAdv.textContent.trim() : '₹ 31,500 (35% Locked)';
    const escrowBal = elEscrowBal ? elEscrowBal.textContent.trim() : '₹ 58,500 (65% on Delivery)';

    const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
    const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';

    const poHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${poNumber} - AgriNex Enterprise Digital Purchase Order & Tax Invoice</title>
  <style>
    body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; background: #ffffff; margin: 0; }
    .invoice-box { max-width: 820px; margin: auto; border: 2.5px solid #0c5a36; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0c5a36; padding-bottom: 16px; margin-bottom: 20px; }
    .company-title { font-size: 24px; font-weight: 800; color: #0c5a36; letter-spacing: -0.5px; }
    .sub-text { font-size: 12px; color: #64748b; margin-top: 2px; }
    .po-badge { background: #e8f5ed; color: #0c5a36; padding: 4px 10px; border-radius: 999px; font-weight: 800; font-size: 11px; border: 1px solid #bbf7d0; display: inline-block; margin-top: 6px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; font-size: 13px; }
    .info-title { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
    .info-name { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    th { background: #0c5a36; color: #ffffff; padding: 10px 12px; text-align: left; font-weight: 700; }
    td { padding: 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    .escrow-box { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px; margin-bottom: 20px; font-size: 12px; }
    .escrow-title { font-weight: 800; color: #166534; font-size: 13px; margin-bottom: 4px; }
    .footer { border-top: 1px solid #e2e8f0; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
    @media print { body { padding: 0; } .invoice-box { border: none; box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="invoice-box">
    <div class="header">
      <div>
        <div class="company-title">AGRINEX ENTERPRISE</div>
        <div class="sub-text">Direct Farm-to-Enterprise Agricultural Trading Exchange</div>
        <div class="sub-text">GSTIN: 27AABCA1234F1Z5 • FSSAI Lic: 10022022001920</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">${poNumber}</div>
        <div class="sub-text">Date: <strong style="color: #0f172a;">${dateStr}</strong></div>
        <span class="po-badge">✓ Escrow Secured PO & Tax Invoice</span>
      </div>
    </div>

    <div class="info-grid">
      <div>
        <div class="info-title">BUYER (ISSUED BY):</div>
        <div class="info-name">BigBasket Wholesale Ltd.</div>
        <div style="color: #475569;">Procurement Lead: Karthik Sundaram</div>
        <div style="color: #475569;">GSTIN: 33AAACI1234F1Z8</div>
        <div style="color: #475569;">Delivery Hub: Vashi APMC Central Terminal, Navi Mumbai</div>
      </div>
      <div>
        <div class="info-title">SELLER (FARMER / FPO):</div>
        <div class="info-name">${farmer}</div>
        <div style="color: #475569;">Origin: Maharashtra Regulated APMC Belts</div>
        <div style="color: #475569;">AgriNex Farmer ID: MH-AGRI-99214</div>
        <div style="color: #475569;">Settlement Bank: SBI Escrow Direct Pay</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 30px;">#</th>
          <th>Commodity Description & Quality Assay</th>
          <th style="text-align: right; width: 140px;">Quantity</th>
          <th style="text-align: right; width: 150px;">Total Valuation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <strong>${crop}</strong>
            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Assayed 96% Export / Grade A Quality • Max 12% Moisture Tolerance</div>
          </td>
          <td style="text-align: right; font-weight: 700;">${qty}</td>
          <td style="text-align: right; font-weight: 800; color: #0c5a36; font-size: 15px;">${total}</td>
        </tr>
      </tbody>
    </table>

    <div class="escrow-box">
      <div class="escrow-title">🔒 RBI-COMPLIANT DUAL-KEY NODAL ESCROW AUDIT TRAIL</div>
      <div style="color: #15803d; line-height: 1.6;">
        • <strong>Advance Nodal Deposit:</strong> ${escrowAdv} locked at transaction ratification.<br>
        • <strong>Delivery Settlement:</strong> ${escrowBal} automated release upon weighbridge assay certification.
      </div>
    </div>

    <div class="footer">
      <div>Generated via AgriNex Enterprise Digital Sourcing System • Authenticated PO Deed</div>
      <div>Statutory MSAMB & e-NAM Harmonized</div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([poHtml], { type: 'application/pdf;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${poNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);

    const toastMsg = isMr
      ? `✓ अधिकृत खरेदी आदेश आणि कर इनव्हॉइस (${poNumber}.pdf) डाऊनलोड झाले!`
      : isHi
      ? `✓ आधिकारिक खरीद आदेश और टैक्स इनवॉइस (${poNumber}.pdf) डाउनलोड हो गया!`
      : `✓ Official Purchase Order & Tax Invoice (${poNumber}.pdf) downloaded successfully!`;

    if (typeof showToast === 'function') {
      showToast(toastMsg, 'success');
    }
  }

  // =========================================================================
  // 3. SIDE-BY-SIDE MULTI-LOT COMPARISON MATRIX
  // =========================================================================

  function toggleLotComparison(lotId, event) {
    if (event) event.stopPropagation();

    if (selectedCompareLots.has(lotId)) {
      selectedCompareLots.delete(lotId);
    } else {
      if (selectedCompareLots.size >= 3) {
        showToast('You can compare up to 3 lots simultaneously.', 'info');
        return;
      }
      selectedCompareLots.add(lotId);
    }

    updateCompareFloatingBar();
    updateCompareCheckboxes();
  }

  function updateCompareCheckboxes() {
    document.querySelectorAll('.lot-compare-checkbox').forEach(cb => {
      const id = cb.getAttribute('data-lot-id');
      cb.checked = selectedCompareLots.has(id);
    });
  }

  function updateCompareFloatingBar() {
    let bar = document.getElementById('compare-floating-bar');
    if (selectedCompareLots.size === 0) {
      if (bar) bar.style.display = 'none';
      return;
    }

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'compare-floating-bar';
      bar.className = 'compare-bar-float';
      document.body.appendChild(bar);
    }

    bar.style.display = 'flex';
    bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="background: #4ade80; color: #064e3b; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">
          ${selectedCompareLots.size}
        </span>
        <span style="color: #ffffff; font-weight: 700; font-size: 0.88rem;">
          ${selectedCompareLots.size} Lot${selectedCompareLots.size > 1 ? 's' : ''} Selected for Side-by-Side Comparison
        </span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-outline btn-sm" onclick="clearLotComparison()" style="color: #fff; border-color: rgba(255,255,255,0.4); font-size: 0.78rem;">Clear</button>
        <button class="btn btn-primary btn-sm" onclick="openLotComparisonModal()" style="background: #4ade80; color: #064e3b; border-color: #4ade80; font-weight: 800; font-size: 0.82rem;">
          ⚖️ Compare Lots Side-by-Side
        </button>
      </div>
    `;
  }

  function clearLotComparison() {
    selectedCompareLots.clear();
    updateCompareFloatingBar();
    updateCompareCheckboxes();
  }

  function openLotComparisonModal() {
    const modal = document.getElementById('modal-lot-comparison');
    if (!modal) return;

    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const selected = lots.filter(l => selectedCompareLots.has(l.id));

    if (selected.length === 0) {
      showToast('Select at least 2 lots to compare.', 'info');
      return;
    }

    const tbody = document.getElementById('comparison-matrix-tbody');
    if (tbody) {
      tbody.innerHTML = `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc; width: 180px;">Crop & Quality Grade</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center;">
              <img src="${l.image}" alt="${l.crop}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover; margin-bottom: 4px;" onerror="this.src='assets/images/tomato.jpg'" />
              <strong style="display: block; font-size: 0.95rem; color: #0f172a;">${l.crop}</strong>
              <span class="badge ${l.gradeBadgeClass || 'badge-grade-a'}" style="font-size: 0.7rem;">${l.grade}</span>
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Farmer & Location</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center; font-size: 0.84rem;">
              <strong>${l.farmerName}</strong>
              <div style="font-size: 0.75rem; color: #64748b;">📍 ${l.farmerLocation}</div>
              <div style="color: #ea580c; font-weight: 700; font-size: 0.75rem; margin-top: 2px;">${l.trustScore || '4.9 ⭐ (98% Reliability)'}</div>
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Quantity Available</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center; font-size: 0.95rem; font-weight: 800; color: #0f172a;">
              ${l.quantity}
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Ask Rate (Farm-Gate)</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center;">
              <strong style="font-size: 1.1rem; color: #0c5a36;">₹ ${l.pricePerKg || (l.priceNum / 100).toFixed(2)} /kg</strong>
              <div style="font-size: 0.74rem; color: #64748b;">(${l.askPrice})</div>
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Estimated Landed Cost @ Vashi Hub</td>
          ${selected.map(l => {
            const kg = parseFloat(l.pricePerKg || (l.priceNum / 100));
            const landedKg = (kg + 1.20).toFixed(2);
            return `
              <td style="padding: 12px; text-align: center; background: #f0fdf4;">
                <strong style="font-size: 1.05rem; color: #166534;">₹ ${landedKg} /kg</strong>
                <div style="font-size: 0.7rem; color: #15803d;">Incl. ₹ 1.20/kg Freight & Tolls</div>
              </td>
            `;
          }).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Transit Lead Time</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center; font-size: 0.82rem; color: #0369a1; font-weight: 700;">
              ⏱️ 4–6 Hours (Samruddhi Expressway)
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">35% Advance Escrow</td>
          ${selected.map(l => {
            const total = Math.round(l.priceNum * l.qtyNum);
            const adv = Math.round(total * 0.35);
            return `
              <td style="padding: 12px; text-align: center; font-size: 0.85rem; font-weight: 700; color: #0c5a36;">
                ₹ ${adv.toLocaleString('en-IN')}
              </td>
            `;
          }).join('')}
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Procurement Action</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center;">
              <button class="btn btn-primary btn-sm" onclick="closeLotComparisonModal(); openDirectBuyModal('${l.id}')" style="width: 100%; background: #0c5a36; border-color: #0c5a36; font-weight: 700; font-size: 0.8rem;">
                ✓ Select & Buy
              </button>
            </td>
          `).join('')}
        </tr>
      `;
    }

    modal.classList.add('active');
  }

  function closeLotComparisonModal() {
    const modal = document.getElementById('modal-lot-comparison');
    if (modal) modal.classList.remove('active');
  }

  // =========================================================================
  // 4. LIVE GPS FLEET & REEFER TELEMETRY ROUTE VISUALIZER
  // =========================================================================

  function renderGpsRouteVisualizer(trackingId) {
    const container = document.getElementById('gps-route-checkpoints-container');
    if (!container) return;

    const checkpoints = [
      { name: "Farm Gate Loading Point", loc: "Lasalgaon Mandi Yard, Nashik", time: "06:30 AM", status: "completed", tag: "QC Passed & Weighed" },
      { name: "Samruddhi Expressway Toll #04", loc: "Igatpuri Corridor Checkpoint", time: "09:45 AM", status: "completed", tag: "Fastag Automated Weigh-In-Motion" },
      { name: "Bhiwandi Agro Logistics Hub", loc: "Mumbai Inward Entry Corridor", time: "01:15 PM", status: "active", tag: "Live GPS Speed: 54 km/h • Temp: 3.2°C" },
      { name: "Destination Delivery Hub", loc: "Vashi APMC Central Terminal, Navi Mumbai", time: "03:30 PM (ETA)", status: "pending", tag: "Dock #4 Bay Assigned" }
    ];

    container.innerHTML = checkpoints.map((cp, idx) => {
      const isDone = cp.status === 'completed';
      const isActive = cp.status === 'active';
      const dotColor = isDone ? '#15803d' : (isActive ? '#2563eb' : '#94a3b8');
      const dotIcon = isDone ? '✓' : (isActive ? '🚚' : (idx + 1));
      const bgCard = isActive ? '#eff6ff' : (isDone ? '#f8fafc' : '#ffffff');
      const borderCard = isActive ? '#bfdbfe' : '#e2e8f0';

      const localizedName = typeof window.tText === 'function' ? window.tText(cp.name) : cp.name;
      const localizedLoc = typeof window.tLocation === 'function' ? window.tLocation(cp.loc) : (typeof window.tText === 'function' ? window.tText(cp.loc) : cp.loc);
      const localizedTime = typeof window.tText === 'function' ? window.tText(cp.time) : cp.time;
      const localizedTag = typeof window.tText === 'function' ? window.tText(cp.tag) : cp.tag;

      return `
        <div style="display: flex; gap: 14px; margin-bottom: 12px; position: relative;">
          <!-- Left Timeline Line & Dot -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${dotColor}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; box-shadow: 0 2px 6px rgba(0,0,0,0.15); z-index: 2;">
              ${dotIcon}
            </div>
            ${idx < checkpoints.length - 1 ? `<div style="width: 2px; flex: 1; background: ${isDone ? '#86efac' : '#e2e8f0'}; min-height: 36px;"></div>` : ''}
          </div>

          <!-- Right Checkpoint Details -->
          <div style="flex: 1; background: ${bgCard}; border: 1px solid ${borderCard}; border-radius: 10px; padding: 10px 14px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-size: 0.88rem; color: #0f172a;">${localizedName}</strong>
              <span style="font-size: 0.74rem; font-weight: 700; color: ${isActive ? '#1d4ed8' : '#64748b'};">${localizedTime}</span>
            </div>
            <div style="font-size: 0.75rem; color: #64748b;">${localizedLoc}</div>
            <div style="margin-top: 4px; font-size: 0.72rem; color: ${isActive ? '#1e40af' : '#166534'}; font-weight: 600;">
              ${localizedTag}
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (typeof window.walkAndTranslateDOM === 'function') {
      window.walkAndTranslateDOM(container);
    }
  }

  // =========================================================================
  // 5. INTERACTIVE 2D WAREHOUSE CHAMBER & SILO SLOT VISUALIZER
  // =========================================================================

  const WAREHOUSE_CHAMBERS_MAP = {
    "WH-NSK-01": [
      { chamber: "Chamber 1-A", type: "Solar Forced Air", temp: "24°C", humidity: "65%", capacity: "5,000 Qt", available: "1,800 Qt", occPct: 64, suitability: "Garwa Red Onion", status: "available" },
      { chamber: "Chamber 1-B", type: "Solar Forced Air", temp: "24°C", humidity: "65%", capacity: "5,000 Qt", available: "2,200 Qt", occPct: 56, suitability: "Export Red Onion", status: "available" },
      { chamber: "Chamber 2-A", type: "Cold Chamber", temp: "3.5°C", humidity: "88%", capacity: "5,000 Qt", available: "1,200 Qt", occPct: 76, suitability: "Thompson Grapes", status: "available" },
      { chamber: "Chamber 2-B", type: "Cold Chamber", temp: "3.0°C", humidity: "90%", capacity: "5,000 Qt", available: "1,000 Qt", occPct: 80, suitability: "Pomegranate / Veg", status: "available" }
    ],
    "WH-PUN-02": [
      { chamber: "CA Chamber A1", type: "Controlled Atmosphere", temp: "1.5°C", humidity: "92%", capacity: "4,000 Qt", available: "1,600 Qt", occPct: 60, suitability: "Hybrid Tomato", status: "available" },
      { chamber: "CA Chamber A2", type: "Controlled Atmosphere", temp: "2.0°C", humidity: "92%", capacity: "4,000 Qt", available: "1,400 Qt", occPct: 65, suitability: "Capsicum / Exotic", status: "available" },
      { chamber: "Reefer Bay B1", type: "Refrigerated Bay", temp: "4.0°C", humidity: "88%", capacity: "3,500 Qt", available: "1,100 Qt", occPct: 68, suitability: "Green Chillies", status: "available" },
      { chamber: "Reefer Bay B2", type: "Pre-Cooling Tunnel", temp: "0.5°C", humidity: "94%", capacity: "3,500 Qt", available: "1,300 Qt", occPct: 62, suitability: "Export Grapes", status: "available" }
    ],
    "WH-LAT-03": [
      { chamber: "Hermetic Silo #1", type: "Aerated Dry Silo", temp: "20°C", humidity: "< 10%", capacity: "10,000 Qt", available: "3,500 Qt", occPct: 65, suitability: "Yellow Soybean", status: "available" },
      { chamber: "Hermetic Silo #2", type: "Aerated Dry Silo", temp: "20°C", humidity: "< 10%", capacity: "10,000 Qt", available: "4,200 Qt", occPct: 58, suitability: "Tur Dal / Pulses", status: "available" },
      { chamber: "Hermetic Silo #3", type: "Aerated Dry Silo", temp: "21°C", humidity: "< 10%", capacity: "8,000 Qt", available: "2,100 Qt", occPct: 74, suitability: "Wheat / Grain", status: "available" },
      { chamber: "Hermetic Silo #4", type: "Aerated Dry Silo", temp: "21°C", humidity: "< 10%", capacity: "7,000 Qt", available: "2,000 Qt", occPct: 71, suitability: "Chana / Chickpea", status: "available" }
    ],
    "WH-NGP-04": [
      { chamber: "Citrus Packhouse 1", type: "Multi-Chamber Cold", temp: "4.5°C", humidity: "90%", capacity: "5,000 Qt", available: "2,100 Qt", occPct: 58, suitability: "Nagpur Mandarin", status: "available" },
      { chamber: "Citrus Packhouse 2", type: "Multi-Chamber Cold", temp: "4.0°C", humidity: "90%", capacity: "5,000 Qt", available: "2,400 Qt", occPct: 52, suitability: "Table Orange", status: "available" },
      { chamber: "Cold Chamber C3", type: "Cold Chamber", temp: "2.5°C", humidity: "88%", capacity: "4,000 Qt", available: "1,300 Qt", occPct: 67, suitability: "Turmeric / Ginger", status: "available" },
      { chamber: "Cold Chamber C4", type: "Cold Chamber", temp: "3.0°C", humidity: "89%", capacity: "4,000 Qt", available: "1,300 Qt", occPct: 67, suitability: "Banana / Papaya", status: "available" }
    ]
  };

  function renderChamberVisualizerForFacility(facilityId) {
    const container = document.getElementById('facility-chambers-visualizer');
    if (!container) return;

    const facId = facilityId || 'WH-NSK-01';
    const chambers = WAREHOUSE_CHAMBERS_MAP[facId] || WAREHOUSE_CHAMBERS_MAP["WH-NSK-01"];

    const curLang = (typeof currentLang !== 'undefined' ? currentLang : (typeof AgriNexI18n !== 'undefined' && AgriNexI18n.getBuyerLanguage ? AgriNexI18n.getBuyerLanguage() : 'en'));

    const lblLiveSlot = curLang === 'mr' ? '● थेट स्लॉट' : (curLang === 'hi' ? '● लाइव स्लॉट' : '● Live Slot');
    const lblCap = curLang === 'mr' ? 'क्षमता:' : (curLang === 'hi' ? 'क्षमता:' : 'Capacity:');
    const lblFilled = curLang === 'mr' ? 'भरलेले' : (curLang === 'hi' ? 'भरा हुआ' : 'Filled');
    const lblAvail = curLang === 'mr' ? 'उपलब्ध:' : (curLang === 'hi' ? 'उपलब्ध:' : 'Avail:');
    const lblSelect = curLang === 'mr' ? 'निवडा &rarr;' : (curLang === 'hi' ? 'चुनें &rarr;' : 'Select &rarr;');

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
        ${chambers.map(ch => {
          const occColor = ch.occPct > 75 ? '#dc2626' : (ch.occPct > 60 ? '#d97706' : '#166534');
          const typeTrans = window.tWarehouse ? window.tWarehouse(ch.type) : (window.tText ? window.tText(ch.type) : ch.type);
          const capTrans = window.tText ? window.tText(ch.capacity) : ch.capacity;
          const availTrans = window.tText ? window.tText(ch.available) : ch.available;

          return `
            <div class="chamber-slot-card" onclick="selectChamberSlot('${ch.chamber}', '${ch.type}', '${ch.available}')" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px; cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 0.88rem; color: #0f172a;">${ch.chamber}</strong>
                <span style="font-size: 0.68rem; font-weight: 800; background: #e8f5ed; color: #0c5a36; padding: 1px 6px; border-radius: 4px;">${lblLiveSlot}</span>
              </div>
              
              <div style="font-size: 0.74rem; color: #64748b; margin-bottom: 8px;">
                ${typeTrans} • <strong>${ch.temp}</strong> (${ch.humidity} RH)
              </div>

              <!-- Occupancy Progress Bar -->
              <div style="margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #64748b; margin-bottom: 2px;">
                  <span>${lblCap} ${capTrans}</span>
                  <span style="font-weight: 700; color: ${occColor};">${ch.occPct}% ${lblFilled}</span>
                </div>
                <div style="background: #f1f5f9; height: 6px; border-radius: 999px; overflow: hidden;">
                  <div style="width: ${ch.occPct}%; height: 100%; background: ${occColor}; border-radius: 999px;"></div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #166534; font-weight: 700; background: #f0fdf4; padding: 4px 8px; border-radius: 6px;">
                <span>${lblAvail} ${availTrans}</span>
                <span>${lblSelect}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function selectChamberSlot(chamberName, chamberType, availableQty) {
    showToast(`✓ Selected ${chamberName} (${chamberType}) with ${availableQty} space!`);
    openBookStorageModal('WH-NSK-01');
  }

  // Bind to Window Global Object
  window.openCopilotModal = openCopilotModal;
  window.closeCopilotModal = closeCopilotModal;
  window.askCopilot = askCopilot;
  window.handleCopilotSubmit = handleCopilotSubmit;
  window.setCopilotLanguage = setCopilotLanguage;
  window.toggleCopilotSpeechRecognition = toggleCopilotSpeechRecognition;
  window.playCopilotTTS = playCopilotTTS;
  window.stopCopilotTTS = stopCopilotTTS;
  window.clearCopilotChat = clearCopilotChat;
  window.triggerCopilotPO = triggerCopilotPO;
  window.generateAndOpenPO = generateAndOpenPO;
  window.closeDigitalPOModal = closeDigitalPOModal;
  window.printDigitalPO = printDigitalPO;
  window.downloadDigitalPOPdf = downloadDigitalPOPdf;
  window.toggleLotComparison = toggleLotComparison;
  window.clearLotComparison = clearLotComparison;
  window.openLotComparisonModal = openLotComparisonModal;
  window.closeLotComparisonModal = closeLotComparisonModal;
  window.renderGpsRouteVisualizer = renderGpsRouteVisualizer;
  window.renderChamberVisualizerForFacility = renderChamberVisualizerForFacility;
  window.selectChamberSlot = selectChamberSlot;

})();
