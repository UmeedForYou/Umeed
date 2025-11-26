// ==================================================================
//                        UMEED JAVASCRIPT
// ==================================================================

// --- Global Modal Functions (Used by ALL modules) ---

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            const content = modal.querySelector('.modal-content');
            if (content) content.style.transform = 'scale(1)';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        const content = modal.querySelector('.modal-content');
        if (content) content.style.transform = 'scale(0.95)';
    }
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.add('hidden');
    }
});


// --- STRESS MANAGEMENT (stress.html) Functions ---

// Q1: Hobby/Interest Suggestions
const MOOD_SUGGESTIONS = {
    hobbyA: { 
        title: "Keep up the great work! 🎉", 
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>You’re doing well — keep prioritizing activities that bring you joy. Think of them as <b>medicine for your mind</b>.</li>
            <li>Protect your routine — even when life gets busy, block time in your week for hobbies or social connections.</li>
            <li>Stay proactive about balance — mix work, rest, and recreation to prevent burnout.</li>
            <li>Add variety where possible — explore something new, like a skill or hobby, to keep your mind stimulated.</li>
            <li>Regularly check in with yourself — ask: ‘Am I still enjoying what I do, or do I need to switch it up?’</li>
        </ul>
        `
    },
    hobbyB: { 
        title: "A Little Less Interested. 👍", 
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>This could just be stress or tiredness — try scheduling <b>one small enjoyable activity daily</b>, even if it’s just 10 minutes.</li>
            <li>Use the <b>‘activation first, mood later’ rule</b> — don’t wait to feel motivated, start the activity and see if mood follows.</li>
            <li>Reconnect with people — social contact often rekindles interest even when you don’t feel like it.</li>
            <li>Track when your energy is naturally higher during the day and place enjoyable activities at that time.</li>
            <li>Monitor changes — if lack of interest grows or lasts more than two weeks, consider reaching out for professional guidance.</li>
        </ul>
        `
    },
    hobbyC: { 
        title: "Feeling Boredom. 🌟", 
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>This is a sign your mind might be under stress or low mood — it’s <b>not laziness, it’s your brain signalling distress</b>.</li>
            <li>Start with very small steps — even 5 minutes of a hobby or a short walk can make a difference. Reward yourself afterwards.</li>
            <li>Involve someone you trust — let them join you in an activity. Accountability makes it easier to start.</li>
            <li>Think of activities as medicine — even if they don’t feel pleasurable at first, regular practice helps the brain regain interest.</li>
            <li>This is a good stage to consider talking to a mental health professional. Therapy or counselling can help reintroduce joy and identify what’s blocking it.</li>
        </ul>
        `
    },
    hobbyD: { 
        title: "🚨 Reach Out for Support. 🚨", 
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li><strong style="color: #b71c1c;">This level of loss of interest is serious</strong> — it often signals depression or another significant mental health issue.</li>
            <li>You don’t have to face this alone — please reach out to a <b>psychiatrist, psychologist, or primary care doctor</b>. Help is available.</li>
            <li style="background: #ffcdd2; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                If you ever feel hopeless or think life isn’t worth living, treat that as an **emergency** — call a helpline or tell someone you trust immediately.
            </li>
            <li>Start with the smallest possible step — even brushing your teeth, stepping outside for 5 minutes, or calling a friend counts as progress.</li>
            <li>Treatment works — with therapy, medication (if needed), and support, most people see significant improvement in interest and enjoyment over time.</li>
        </ul>
        `
    }
};

// Q2: Coping Mechanism Suggestions
const COPE_SUGGESTIONS = {
    cope1: { 
        title: "Anxiety & Overthinking Insights 🌪️", 
        reveals: "You may have <b>anxiety tendencies</b> and feel unsafe or unsure, causing your mind to jump to extremes.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Practice <b>Grounding (5-4-3-2-1 technique)</b> to bring your focus back to the present moment.</li>
            <li>Train your mind to replace "What if something goes wrong?" with <b>"What if it works out?"</b></li>
            <li><b>Journaling</b> for 10 minutes daily can reduce mental clutter by offloading racing thoughts.</li>
        </ul>
        `
    },
    cope2: { 
        title: "Emotional Withdrawal Insights 😔", 
        reveals: "You tend to <b>bottle up emotions</b> instead of expressing them, possibly fearing burden or judgment.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Start by sharing your feelings with <b>one trusted person</b>.</li>
            <li>Try small steps of expressing feelings (e.g., voice notes, writing a letter you don't send).</li>
            <li>Remember: <b>asking for help is a sign of strength, not weakness.</b></li>
        </ul>
        `
    },
    cope3: { 
        title: "Distraction Coping Insights 🤳", 
        reveals: "You use distraction as <b>emotional protection</b> and may struggle with emotional regulation.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Replace unhealthy distractions with healthy coping: <b>walking, breathing exercises, or music.</b></li>
            <li>Schedule <b>"digital detox time"</b> daily to reduce reliance on screens.</li>
            <li>Understand the emotion instead of escaping it: Ask yourself, <b>"What am I really feeling right now?"</b></li>
        </ul>
        `
    },
    cope4: { 
        title: "Action-Oriented Insights 🚀", 
        reveals: "You are <b>solution-oriented but sometimes rush</b>, potentially avoiding feeling emotions by jumping into action.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li><b>Pause before reacting:</b> Use the <b>10-second rule</b> before starting to fix a problem.</li>
            <li>Practice mindful decision-making by considering your stress level first.</li>
            <li>Remember: not all problems need instant fixing — <b>sometimes the mind needs rest first.</b></li>
        </ul>
        `
    }
};

// Q3: Places to Visit Suggestions
const PLACE_SUGGESTIONS = {
    place1: {
        title: "Nature Lover Insights 🌳",
        reveals: "You value peace, emotional balance, and mental clarity, and may be sensitive to noise/overstimulation. Nature helps you rest your mind.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Continue taking nature breaks—they reduce stress and improve mood.</li>
            <li>Practice <b>mindful walking</b>: pay attention to sounds, scents, and surroundings.</li>
            <li>Use quiet involvement (like drawing or writing) to process emotions instead of suppressing them.</li>
        </ul>
        `
    },
    place2: {
        title: "Social Connector Insights ☕",
        reveals: "You enjoy connections, interaction, and shared energy, and may use social spaces to uplift your mood. Sometimes you might depend on crowds to distract yourself.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Choose social settings that make you genuinely happy, not overwhelmed.</li>
            <li>Balance social time with moments of <b>quiet reflection</b>.</li>
            <li>Practice expressing your needs clearly so relationships stay healthy and fulfilling.</li>
        </ul>
        `
    },
    place3: {
        title: "Adventure Seeker Insights 🗺️",
        reveals: "You are curious, brave, and open to new experiences. You might get bored easily or crave stimulation, and enjoy growth through exploration.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Keep exploring—it builds confidence and resilience.</li>
            <li>Plan your adventures <b>mindfully</b> to avoid burnout.</li>
            <li>Try turning challenges into learning: ask yourself "what did this experience teach me?"</li>
        </ul>
        `
    },
    place4: {
        title: "Comfort Zone Insights 🏡",
        reveals: "You appreciate stability and emotional security. You may avoid risk or uncertain situations. Comfort brings you peace, but too much comfort may limit growth.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Enjoy your comfort zones, but gently push yourself to explore something new once in a while.</li>
            <li>Start small: visit a new café, attend a small event, or try a new hobby.</li>
            <li>Tell yourself: "I can feel safe even in new situations". This builds inner confidence.</li>
        </ul>
        `
    }
};

// Q4: Media Preferences Suggestions
const MEDIA_SUGGESTIONS = {
    media1: {
        title: "Growth & Learning Insights 🧠",
        reveals: "You seek growth, self-improvement, and deeper understanding. You are goal-oriented and enjoy learning, but may put high expectations on yourself at times.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Continue choosing content that inspires you, but also allow yourself time to relax.</li>
            <li>Avoid comparing your progress with others—everyone learns at their own pace.</li>
            <li>Practice <b>gratitude</b> to appreciate how far you’ve come.</li>
        </ul>
        `
    },
    media2: {
        title: "Emotional & Empathy Insights ❤️",
        reveals: "You are sensitive, empathetic, and emotionally connected. You value relationships and understand feelings deeply, but sometimes may get emotionally overwhelmed or idealize relationships.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Use emotional stories to understand your own feelings better.</li>
            <li>Practice <b>emotional boundaries</b>—feel emotions but don't let them control you.</li>
            <li>Remind yourself: real life is different from stories, and that's perfectly okay.</li>
        </ul>
        `
    },
    media3: {
        title: "Thrill & Stimulation Insights 🕵️",
        reveals: "You enjoy excitement, challenges, and mental stimulation. You may have a sharp mind that likes solving problems, but sometimes thrill-seeking can reflect hidden stress or restlessness.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Enjoy thrillers, but balance them with <b>calming activities</b> (music, nature, deep breathing).</li>
            <li>Use your analytical strength to solve real-life issues calmly.</li>
            <li>Practice <b>grounding techniques</b> to manage restlessness or overthinking.</li>
        </ul>
        `
    },
    media4: {
        title: "Comfort & Joy Insights 😂",
        reveals: "You value joy, simplicity, and emotional comfort. You prefer positive vibes that make you feel relaxed, but sometimes you might avoid deeper feelings or tough topics.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Continue choosing content that lifts your mood—laughter is healing.</li>
            <li>Once in a while, try content that challenges your thinking; it supports mental growth.</li>
            <li>Do one joyful activity daily—singing, talking to someone, or walking—to maintain positivity.</li>
        </ul>
        `
    }
};

// Q5: Sleep Pattern Suggestions
const SLEEP_SUGGESTIONS = {
    sleep1: {
        title: "Balanced Sleep Insights 🌙",
        reveals: "You have a balanced mind and relatively low stress levels. Your emotional system is stable, and your routine supports your mental health.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Maintain your healthy routine—consistent sleep times keep emotional stability strong.</li>
            <li>Continue limiting screens before bed; <b>protect your sleep quality</b>.</li>
            <li>Add a 5-minute gratitude or relaxation ritual to deepen calmness and long-term emotional health.</li>
        </ul>
        `
    },
    sleep2: {
        title: "Overthinking & Sleep Insights 🦉",
        reveals: "Your mind stays active even when your body wants rest. You may be holding on to worries, past events, or future fears. High mental load or unresolved emotions are affecting sleep.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Practice <b>"Mental Unloading"</b> before bed: write down worries or next-day tasks so your mind can rest.</li>
            <li>Try a slow-breathing routine (inhale 4 sec, exhale 6 sec) to calm the nervous system.</li>
            <li>Create a bedtime boundary: stop heavy conversation or decision-making at least one hour before sleep.</li>
        </ul>
        `
    },
    sleep3: {
        title: "Restless Sleep Insights 🚧",
        reveals: "Your sleep is disturbed due to stress, emotional tension, or an irregular routine. Your body is resting, but your mind feels unsafe or alert. You may be carrying emotional overload from the day.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Build a calming night ritual: warm bath, stretching, light music.</li>
            <li>Reduce stimulants (tea/coffee) after evening time.</li>
            <li>Spend 10 minutes reflecting on your feelings daily—processing emotions in the day prevents mental restlessness at night.</li>
        </ul>
        `
    },
    sleep4: {
        title: "Inconsistent Sleep Insights ⚖️",
        reveals: "Your mind and lifestyle lack consistency, often shifting with mood, stress, or daily events. You may adapt to situations quickly but struggle with emotional grounding. Mood swings or changing routines affect your sleep rhythm.",
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>Set a <b>fixed bedtime and wake-up window</b>—this creates emotional stability.</li>
            <li>Reduce night-time screen use to stabilize your internal rhythm.</li>
            <li>Practice a <b>grounding technique</b> before bed, like focusing on your breath or gently observing your thoughts.</li>
        </ul>
        `
    }
};

// --- CORE FUNCTIONALITY FOR QUIZ SELECTION ---

// Global storage key for persistent suggestions
const SUGGESTIONS_STORAGE_KEY = 'latestSuggestions';

function handleQuestionSelection(selectedButton, moodKey) {
    const questionBox = selectedButton.closest('.question-box');
    const questionId = questionBox.getAttribute('data-question-id');
    const questionText = questionBox.querySelector('h3').textContent;

    // Determine which suggestion object to use based on the question ID
    let suggestionMap;
    if (questionId === 'q1') {
        suggestionMap = MOOD_SUGGESTIONS;
    } else if (questionId === 'q2') {
        suggestionMap = COPE_SUGGESTIONS;
    } else if (questionId === 'q3') {
        suggestionMap = PLACE_SUGGESTIONS;
    } else if (questionId === 'q4') {
        suggestionMap = MEDIA_SUGGESTIONS;
    } else if (questionId === 'q5') {
        suggestionMap = SLEEP_SUGGESTIONS;
    } else {
        return; // Exit if questionId is unknown
    }
    
    const suggestion = suggestionMap[moodKey];
    if (!questionId || !suggestion) return;

    // 1. Enforce Single Selection (Radio Button behavior)
    questionBox.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected-option');
    });
    selectedButton.classList.add('selected-option');
    
    // --- Update Local Storage for Single Selection ---
    
    const storedSuggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_STORAGE_KEY)) || {};

    // Store the NEW selection, overwriting any previous one for this questionId
    storedSuggestions[questionId] = { 
        questionId: questionId,
        question: questionText,
        selection: selectedButton.textContent.trim(), // The text of the option chosen
        suggestionTitle: suggestion.title,
        suggestionText: suggestion.text,
        reveals: suggestion.reveals || null,
        timestamp: new Date().toLocaleString()
    };
    
    localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(storedSuggestions));
    
    // --- Show Immediate Feedback (Popup) ---
    showSuggestion(suggestion);
}

// showSuggestion now takes the full suggestion object
function showSuggestion(suggestion) {
    if (suggestion) {
        
        // This still tracks simple mood history for Q1 only (kept for legacy support for that specific history list)
        if (Object.values(MOOD_SUGGESTIONS).includes(suggestion)) {
            const moods = JSON.parse(localStorage.getItem('moodHistory')) || [];
            const moodKey = Object.keys(MOOD_SUGGESTIONS).find(key => MOOD_SUGGESTIONS[key] === suggestion);
            if (moodKey) {
                 moods.push({ mood: moodKey, timestamp: new Date().toLocaleString() });
                 localStorage.setItem('moodHistory', JSON.stringify(moods));
            }
        }

        document.getElementById('modalTitle').textContent = suggestion.title;
        
        // Build the modal content with "What this reveals" section first
        let modalContent = '';
        if (suggestion.reveals) {
            modalContent += `<p style="font-weight: 600; color: #667eea; margin-bottom: 1.5rem; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                <span style="font-size: 1.2rem; color: #ff6b6b; margin-right: 5px;">!</span> 
                What this reveals: ${suggestion.reveals}
            </p>`;
        }
        modalContent += suggestion.text;
        
        document.getElementById('modalText').innerHTML = modalContent;
        openModal('suggestionModal');
    }
}
function closeSuggestionModal() { closeModal('suggestionModal'); }


// --- FUNCTION: View All Suggestions ---
function openAllSuggestions() {
    const storedSuggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_STORAGE_KEY)) || {};
    const suggestionsListDiv = document.getElementById('allSuggestionsList');
    suggestionsListDiv.innerHTML = ''; // Clear previous content

    const entries = Object.values(storedSuggestions);
    
    if (entries.length === 0) {
        suggestionsListDiv.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-size: 1.1rem; padding: 2rem;">No selections saved yet. Click an option in the quiz to save a suggestion!</p>';
    } else {
        // Sort entries by timestamp
        entries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        entries.forEach((entry, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.style.cssText = 'border-bottom: 2px solid #eee; padding: 1rem 0; margin-bottom: 1rem;';
            if (index === 0) suggestionItem.style.borderTop = '2px solid #eee';
            
            // Add 'reveals' content if available
            let revealsHtml = '';
            if (entry.reveals) {
                 revealsHtml = `<p style="font-weight: 600; color: #ff6b6b; margin-top: 1rem;">
                    What this reveals: ${entry.reveals}
                </p>`;
            }

            suggestionItem.innerHTML = `
                <h4 style="font-weight: 700; color: #667eea; margin-bottom: 0.5rem; border-left: 4px solid #b393d3; padding-left: 10px;">
                    ${entry.question} 
                </h4>
                <p style="font-size: 0.95rem; color: #7f8c8d; margin-top: 0;">
                    Your Choice: ${entry.selection} (${entry.timestamp})
                </p>
                ${revealsHtml}
                <h5 style="font-weight: 600; color: #2c3e50; margin-top: 1rem;">${entry.suggestionTitle}</h5>
                ${entry.suggestionText}
            `;
            suggestionsListDiv.appendChild(suggestionItem);
        });
    }

    openModal('allSuggestionsModal');
}
// --- END FUNCTION ---


function openMoodHistory() {
    const moods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const moodList = document.getElementById('moodList');
    moodList.innerHTML = moods.length === 0 ? '<li style="text-align: center; color: #7f8c8d;">No mood entries yet.</li>' : '';
    
    if (moods.length > 0) {
        moods.reverse().forEach(entry => {
            const listItem = document.createElement('li');
            // Get the title based on the new keys (e.g., hobbyA)
            const title = MOOD_SUGGESTIONS[entry.mood]?.title || entry.mood;
            listItem.innerHTML = `<strong>${entry.timestamp}</strong>: ${title}`;
            moodList.appendChild(listItem);
        });
    }
    openModal('moodHistoryModal');
}
function closeMoodHistory() { closeModal('moodHistoryModal'); }

function openJournal() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const journalHistoryDiv = document.getElementById('journalHistory');
    journalHistoryDiv.innerHTML = '<h4>Journal History (Latest 3)</h4>';
    
    if (entries.length === 0) {
        journalHistoryDiv.innerHTML += '<p style="color: #7f8c8d;">No journal entries yet.</p>';
    } else {
        const list = document.createElement('ul');
        list.style.cssText = 'list-style:none; padding:0;';
        entries.slice(-3).reverse().forEach(entry => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${entry.timestamp}</strong>: <em>"${entry.text.substring(0, 50)}..."</em>`;
            list.appendChild(listItem);
        });
        journalHistoryDiv.appendChild(list);
    }
    document.getElementById('journalText').value = ''; 
    openModal('journalModal');
}
function closeJournal() { closeModal('journalModal'); }

function saveJournal() {
    const journalTextarea = document.getElementById('journalText');
    const journalHistoryDiv = document.getElementById('journalHistory');
    const text = journalTextarea.value.trim();

    if (text) {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push({ text: text, timestamp: new Date().toLocaleString() });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        
        journalHistoryDiv.innerHTML = `<p style="color: #4CAF50; font-weight: 600;">✅ Entry saved successfully at ${new Date().toLocaleTimeString()}!</p>`;
        journalTextarea.value = ''; 
        
        setTimeout(() => { openJournal(); document.getElementById('journalModal').classList.remove('hidden'); }, 1500); 
    } else {
        journalHistoryDiv.innerHTML = '<p style="color: #ff6b6b; font-weight: 600;">⚠️ Please write something before saving!</p>';
        setTimeout(() => { openJournal(); document.getElementById('journalModal').classList.remove('hidden'); }, 1500); 
    }
}

function openFullJournalHistory() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const journalList = document.getElementById('fullJournalList');
    journalList.innerHTML = '';
    
    if (entries.length === 0) {
        journalList.innerHTML = '<li style="text-align: center; color: #7f8c8d;">No journal entries yet. Start writing in the "Write to Yourself" section!</li>';
    } else {
        entries.reverse().forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.style.cssText = 'border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 10px;';
            if (index === entries.length - 1) listItem.style.borderBottom = 'none';

            listItem.innerHTML = `<p style="font-size: 1.1rem; font-weight: 600; color: #667eea;">${entry.timestamp}</p><p>${entry.text}</p>`;
            journalList.appendChild(listItem);
        });
    }
    openModal('fullJournalHistoryModal');
}


// --- ADDICTION HELP (addiction.html) Functions ---

const RECOVERY_START_DATE_KEY = 'recoveryStartDate';

function updateProgressDisplay() {
    const startDateStr = localStorage.getItem(RECOVERY_START_DATE_KEY);
    const progressDisplay = document.getElementById('progressDisplay');
    const startBtn = document.getElementById('startRecoveryBtn');
    const relapseBtn = document.getElementById('relapseBtn');
    const title = document.getElementById('sobrietyTitle');

    if (startDateStr) {
        const startDate = new Date(startDateStr);
        const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));
        
        progressDisplay.innerHTML = `<span style="font-size: 3rem; color: #4CAF50;">${diffDays}</span> <br> Days Clean & Counting! 🎉`;
        title.textContent = "🗓️ Days in Recovery";
        if (startBtn) startBtn.style.display = 'none';
        if (relapseBtn) relapseBtn.style.display = 'block';
    } else {
        progressDisplay.innerHTML = `Click below to start tracking your journey to wellness.`;
        title.textContent = "🗓️ Sobriety Tracker";
        if (startBtn) startBtn.style.display = 'block';
        if (relapseBtn) relapseBtn.style.display = 'none';
    }
}

function startRecovery() {
    if (confirm("Are you ready to officially start your recovery journey today?")) {
        localStorage.setItem(RECOVERY_START_DATE_KEY, new Date().toDateString());
        updateProgressDisplay();
        alert("Recovery journey started! You got this!");
    }
}

function relapseStartFresh() {
    if (confirm("Are you sure you want to reset your sobriety counter? This marks a 'Relapse' and starts your counter fresh.")) {
        localStorage.removeItem(RECOVERY_START_DATE_KEY);
        updateProgressDisplay();
        alert("Counter reset. Every new beginning holds a new UMEED (Hope). Keep going!");
    }
}




// --- Event Listeners and Initializers (Combined from all sections) ---

document.addEventListener('DOMContentLoaded', () => {
    // HOMEPAGE SETUP
    const exploreBtn = document.getElementById("exploreModulesBtn");
    const modulesSection = document.getElementById("modulesSection");
    if (exploreBtn && modulesSection) exploreBtn.addEventListener("click", () => modulesSection.scrollIntoView({ behavior: "smooth" }));



    // MODULE-SPECIFIC INITIALIZERS
    if (document.getElementById('addictionSection')) {
        updateProgressDisplay();
        const startBtn = document.getElementById('startRecoveryBtn');
        const relapseBtn = document.getElementById('relapseBtn');
        if(startBtn) startBtn.addEventListener('click', startRecovery);
        if(relapseBtn) relapseBtn.addEventListener('click', relapseStartFresh);
    }
    
    if (document.getElementById('nutritionFactsModal')) { 
        displayGentleReminders(); 
    }
    
    

});
