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

// UPDATED: New Hobby-Related Suggestions with <ul> list format (pointers)
const MOOD_SUGGESTIONS = {
    hobbyA: { 
        title: "Keep up the great work! 🎉", 
        text: `
        <ul style="text-align: left; list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
            <li>You’re doing well — keep prioritizing activities that bring you joy. Think of them as **medicine for your mind**.</li>
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
            <li>This could just be stress or tiredness — try scheduling **one small enjoyable activity daily**, even if it’s just 10 minutes.</li>
            <li>Use the **‘activation first, mood later’ rule** — don’t wait to feel motivated, start the activity and see if mood follows.</li>
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
            <li>This is a sign your mind might be under stress or low mood — it’s **not laziness, it’s your brain signalling distress**.</li>
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
            <li>You don’t have to face this alone — please reach out to a **psychiatrist, psychologist, or primary care doctor**. Help is available.</li>
            <li style="background: #ffcdd2; padding: 0.5rem; border-radius: 5px; margin: 0.5rem 0;">
                If you ever feel hopeless or think life isn’t worth living, treat that as an **emergency** — call a helpline or tell someone you trust immediately.
            </li>
            <li>Start with the smallest possible step — even brushing your teeth, stepping outside for 5 minutes, or calling a friend counts as progress.</li>
            <li>Treatment works — with therapy, medication (if needed), and support, most people see significant improvement in interest and enjoyment over time.</li>
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
    const suggestion = MOOD_SUGGESTIONS[moodKey];

    if (!questionId || !suggestion) return;

    // 1. Enforce Single Selection (Radio Button behavior)
    // Remove 'selected' class from all options in this question group
    questionBox.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected-option');
    });
    // Add 'selected' class to the currently clicked button
    selectedButton.classList.add('selected-option');
    
    // --- Update Local Storage for Single Selection ---
    
    // Retrieve current stored suggestions (should be an object mapping questionId to selection)
    const storedSuggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_STORAGE_KEY)) || {};

    // Store the NEW selection, overwriting any previous one for this questionId
    storedSuggestions[questionId] = { 
        questionId: questionId,
        question: questionText,
        selection: selectedButton.textContent.trim(), // The text of the option chosen
        suggestionTitle: suggestion.title, 
        suggestionText: suggestion.text, 
        timestamp: new Date().toLocaleString() 
    };
    
    localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(storedSuggestions));
    
    // --- Show Immediate Feedback (Popup) ---
    showSuggestion(moodKey);
}

function showSuggestion(moodKey) {
    const suggestion = MOOD_SUGGESTIONS[moodKey];
    if (suggestion) {
        
        // This still tracks simple mood history, although the new 'latestSuggestions' is the main source
        const moods = JSON.parse(localStorage.getItem('moodHistory')) || [];
        moods.push({ mood: moodKey, timestamp: new Date().toLocaleString() });
        localStorage.setItem('moodHistory', JSON.stringify(moods));

        document.getElementById('modalTitle').textContent = suggestion.title;
        document.getElementById('modalText').innerHTML = suggestion.text; 
        openModal('suggestionModal');
    }
}
function closeSuggestionModal() { closeModal('suggestionModal'); }


// --- NEW FUNCTION: View All Suggestions ---
function openAllSuggestions() {
    const storedSuggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_STORAGE_KEY)) || {};
    const suggestionsListDiv = document.getElementById('allSuggestionsList');
    suggestionsListDiv.innerHTML = ''; // Clear previous content

    const entries = Object.values(storedSuggestions);
    
    if (entries.length === 0) {
        suggestionsListDiv.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-size: 1.1rem; padding: 2rem;">No selections saved yet. Click an option in the quiz to save a suggestion!</p>';
    } else {
        // Sort entries by timestamp (if you ever add multiple questions, the order matters)
        entries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        entries.forEach((entry, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.style.cssText = 'border-bottom: 2px solid #eee; padding: 1rem 0; margin-bottom: 1rem;';
            if (index === 0) suggestionItem.style.borderTop = '2px solid #eee';
            
            suggestionItem.innerHTML = `
                <h4 style="font-weight: 700; color: #667eea; margin-bottom: 0.5rem; border-left: 4px solid #b393d3; padding-left: 10px;">
                    ${entry.question} 
                </h4>
                <p style="font-size: 0.95rem; color: #7f8c8d; margin-top: 0;">
                    **Your Choice:** ${entry.selection} (${entry.timestamp})
                </p>
                <h5 style="font-weight: 600; color: #2c3e50; margin-top: 1rem;">${entry.suggestionTitle}</h5>
                ${entry.suggestionText}
            `;
            suggestionsListDiv.appendChild(suggestionItem);
        });
    }

    openModal('allSuggestionsModal');
}
// --- END NEW FUNCTION ---


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


// ==================================================================
// [NUTRITION MODULE] - Core Logic (Recipes & Science)
// ==================================================================

let foodType = "veg"; // default

function setType(type) {
    foodType = type;
    const vegBtn = document.getElementById("vegBtn");
    const nonvegBtn = document.getElementById("nonvegBtn");

    if (vegBtn) vegBtn.classList[type === "veg" ? 'add' : 'remove']("active");
    if (nonvegBtn) nonvegBtn.classList[type === "nonveg" ? 'add' : 'remove']("active");
}

const dishes = {
    energy: {
        veg: [{ name: "Oats Banana Smoothie 🥤", tip: "Rich in fiber and potassium — boosts energy naturally.", ingredients: ["1 cup Rolled Oats", "1 Frozen Banana", "1 cup Milk (Dairy/Almond)", "1 tsp Honey (Optional)"], recipe: ["1. Combine oats, banana, milk, and honey (if using) in a blender.", "2. Blend until smooth and creamy. Add more milk if consistency is too thick.", "3. Pour into a glass and enjoy immediately for a quick energy boost!"] }, { name: "Peanut Butter Toast 🍞", tip: "A quick bite loaded with protein and healthy fats for sustained energy.", ingredients: ["2 slices Whole Wheat Bread", "2 tbsp Peanut Butter", "Slice of Banana/Berries"], recipe: ["1. Toast the bread to your desired crispness.", "2. Spread peanut butter evenly on both slices.", "3. Top with banana slices or berries for extra nutrients."] }, { name: "Chia Seed Yogurt Bowl 🥣", tip: "A slow-release energy combo — ideal for morning freshness and gut health.", ingredients: ["1/2 cup Yogurt (Greek preferred)", "2 tbsp Chia Seeds", "1/2 cup Mixed Berries", "1 tsp Maple Syrup"], recipe: ["1. In a bowl, mix yogurt and chia seeds, letting it sit for 5 minutes to thicken.", "2. Layer with mixed berries.", "3. Drizzle with maple syrup for a touch of sweetness."] }],
        nonveg: [{ name: "Grilled Chicken & Brown Rice 🍛", tip: "Lean protein meal for lasting power and recovery without the heavy feeling.", ingredients: ["150g Chicken Breast", "1/2 cup Cooked Brown Rice", "1 cup Steamed Broccoli", "1 tsp Olive Oil & Seasoning"], recipe: ["1. Season chicken breast with salt, pepper, and herbs.", "2. Grill or pan-fry until cooked through (about 6-8 minutes per side).", "3. Serve immediately with brown rice and steamed broccoli."] }, { name: "Egg & Avocado Toast 🍳🥑", tip: "Balanced breakfast with healthy fats and protein for a steady energy curve.", ingredients: ["1 slice Whole Grain Toast", "1 Egg", "1/4 Avocado", "Pinch of Chili Flakes"], recipe: ["1. Toast the bread.", "2. Mash avocado and spread on toast.", "3. Fry or poach the egg. Place on top of the avocado toast.", "4. Season with salt, pepper, and chili flakes."] }, { name: "Tuna Salad Wrap 🌯", tip: "Light, protein-packed, perfect for on-the-go strength and brain fuel.", ingredients: ["1 Tortilla/Lettuce Wrap", "1/2 can Tuna (in water)", "1 tbsp Mayo/Yogurt", "Chopped Celery"], recipe: ["1. Drain tuna and mix with mayo/yogurt and celery.", "2. Spread the mixture onto the tortilla or lettuce wrap.", "3. Roll up tightly and enjoy immediately."] }]
    },
    focus: {
        veg: [{ name: "Spinach & Paneer Wrap 🌯", tip: "Iron and calcium combo to sharpen concentration and prevent fatigue.", ingredients: ["1 Tortilla", "50g Paneer (cubed)", "1 cup Fresh Spinach", "1 tsp Ghee/Oil", "Spices"], recipe: ["1. Sauté paneer and spinach with light spices.", "2. Warm the tortilla.", "3. Place the mixture in the center and roll tightly."] }, { name: "Almond & Berry Smoothie 🫐", tip: "Antioxidants enhance brain clarity and alertness throughout the day.", ingredients: ["1 cup Almond Milk", "1/2 cup Mixed Berries (Frozen)", "1 tbsp Almond Butter", "1/2 tsp Cinnamon"], recipe: ["1. Combine all ingredients in a blender.", "2. Blend until completely smooth.", "3. Serve immediately. Add ice if using fresh berries."] }, { name: "Broccoli Quinoa Bowl 🥦", tip: "Rich in folate and magnesium — a powerhouse for fuelling the mind.", ingredients: ["1/2 cup Cooked Quinoa", "1 cup Cooked Broccoli Florets", "1 tbsp Lemon Juice", "1 tbsp Feta Cheese"], recipe: ["1. Combine warm quinoa and broccoli.", "2. Drizzle with lemon juice and olive oil.", "3. Top with feta cheese and enjoy warm or cold."] }],
        nonveg: [{ name: "Boiled Eggs & Tuna Sandwich 🥪", tip: "Omega-3s support better focus and memory retention.", ingredients: ["2 Boiled Eggs", "1/4 can Tuna", "2 slices Whole Grain Bread", "Lettuce & Tomato"], recipe: ["1. Mash the boiled eggs with tuna and light mayo/mustard.", "2. Spread onto one slice of bread.", "3. Layer with lettuce and tomato and top with the second slice."] }, { name: "Chicken & Veg Stir Fry 🍗🥕", tip: "Protein and fiber together boost mental alertness and sustained energy.", ingredients: ["100g Chicken Strips", "1 cup Mixed Veggies (Carrots, Bell Peppers)", "1 tbsp Soy Sauce", "1 tsp Sesame Oil"], "recipe": ["1. Heat sesame oil in a pan, add chicken strips and cook.", "2. Add mixed veggies and stir-fry for 3-5 minutes.", "3. Toss with soy sauce and serve hot with a small amount of rice."] }, { name: "Fish Tacos 🐟", tip: "Light and energizing for brain balance and sharpness (best with fatty fish like salmon).", ingredients: ["100g Cooked Fish Fillet", "2 Small Tortillas", "Cabbage Slaw", "Lime Juice"], recipe: ["1. Flake the cooked fish into the center of the tortillas.", "2. Top with a cabbage slaw mixed with lime juice.", "3. Serve immediately with a side of salsa."] }]
    },
    sleep: {
        veg: [{ name: "Warm Milk with Nuts 🌙", tip: "Tryptophan and magnesium help your body relax and rest deeply.", ingredients: ["1 cup Warm Milk (Dairy or Almond)", "Pinch of Nutmeg", "5 Almonds (crushed)"], recipe: ["1. Gently warm the milk (do not boil).", "2. Stir in nutmeg and crushed almonds.", "3. Sip slowly 30 minutes before bedtime."] }, { name: "Banana Almond Smoothie 🍌", tip: "Natural serotonin booster — relaxes muscles gently for better sleep quality.", ingredients: ["1 Banana", "1/2 cup Milk", "1 tbsp Almond Butter", "2 Dates"], recipe: ["1. Blend all ingredients until smooth.", "2. Serve chilled or room temperature.", "3. Consume as a light evening snack."] }, { name: "Cinnamon Herbal Tea 🍵", tip: "A soothing drink that slows heart rate and calms nerves before bed.", ingredients: ["1 Herbal Tea Bag (Chamomile/Mint)", "1/2 tsp Cinnamon Powder", "Hot Water"], recipe: ["1. Steep the tea bag and mint leaves in hot water for 3-5 minutes.", "2. Remove the bag and stir in the cinnamon.", "3. Drink warm."] }],
        nonveg: [{ name: "Steamed Fish & Rice 🐟", tip: "A soft, easy-to-digest meal that helps your body unwind before sleep.", ingredients: ["100g Steamed White Fish", "1/2 cup White Rice", "Light Salt/Pepper"], recipe: ["1. Steam the fish until it flakes easily.", "2. Serve with plain white rice and a very light seasoning.", "3. Avoid heavy sauces or oils."] }, { name: "Boiled Egg & Oat Combo 🍳", tip: "Protein balance that doesn’t feel heavy before bed, stabilizing blood sugar overnight.", ingredients: ["1 Boiled Egg", "1/4 cup Cooked Plain Oats"], recipe: ["1. Prepare plain oats (water or milk, no sugar).", "2. Serve with one boiled egg on the side."] }, { name: "Chicken Broth Soup 🍲", tip: "Warm and comforting — melts daily stress away and promotes satiety.", ingredients: ["1 cup Chicken Broth", "Diced Cooked Chicken", "Small amount of Noodles/Rice"], recipe: ["1. Heat the chicken broth.", "2. Add cooked chicken and noodles/rice.", "3. Simmer briefly and serve warm."] }]
    },
    mood: {
        veg: [{ name: "Colorful Veg Stir Fry 🥕", tip: "Vibrant veggies provide vitamins that lift mood and energy naturally.", ingredients: ["1 cup Mixed Veggies (Carrots, Peppers, Corn)", "1 tbsp Olive Oil", "Light Seasoning"], recipe: ["1. Heat olive oil in a pan.", "2. Add veggies and stir-fry until tender-crisp.", "3. Season lightly and serve hot."] }, { name: "Sweet Potato Chaat 🍠", tip: "Sweetness meets fiber — comfort food with happiness (use jaggery instead of refined sugar).", ingredients: ["1 Boiled Sweet Potato (cubed)", "1 tsp Lemon Juice", "Chaat Masala", "Coriander"], recipe: ["1. Toss warm sweet potato cubes with lemon juice and chaat masala.", "2. Garnish with fresh coriander."] }, { name: "Fruit & Honey Parfait 🍓🍯", tip: "Natural sugar release boosts joy hormones gently and satisfies cravings.", ingredients: ["1/2 cup Yogurt", "1/2 cup Granola/Oats", "1 cup Mixed Fruits", "1 tbsp Honey"], recipe: ["1. Layer yogurt, granola, and fruits in a glass.", "2. Repeat layers.", "3. Drizzle with honey on top."] }],
        nonveg: [{ name: "Chicken Soup 🍲", tip: "Comfort in a bowl — calms nerves and warms the heart (ensure it's not too spicy).", ingredients: ["1 cup Chicken Broth", "Shredded Chicken", "Diced Carrots/Celery"], recipe: ["1. Simmer all ingredients in a pot until vegetables are tender.", "2. Season lightly and serve warm."] }, { name: "Honey Garlic Prawns 🍤", tip: "Sweet, savory, and serotonin-rich for emotional balance and taste satisfaction.", ingredients: ["100g Prawns", "1 tbsp Honey", "1 clove Garlic (minced)", "Soy Sauce"], recipe: ["1. Mix honey, minced garlic, and a splash of soy sauce for a glaze.", "2. Pan-fry prawns until pink, then toss in the glaze.", "3. Serve immediately."] }, { name: "Turkey Sandwich 🥪", tip: "Contains tryptophan — the natural feel-good amino acid, which helps serotonin production.", ingredients: ["2 slices Whole Wheat Bread", "50g Sliced Turkey Breast", "Lettuce, Tomato", "Mustard/Hummus"], recipe: ["1. Layer turkey, lettuce, and tomato on one slice of bread.", "2. Spread mustard or hummus on the other slice.", "3. Combine and enjoy."] }]
    },
    detox: {
        veg: [{ name: "Lemon Cucumber Detox Water 🍋", tip: "Flushes toxins and hydrates your body gently, promoting inner cleansing.", ingredients: ["1 Litre Water", "1/2 Cucumber (sliced)", "1/2 Lemon (sliced)", "Mint Leaves"], recipe: ["1. Combine all ingredients in a pitcher.", "2. Let it infuse in the refrigerator for at least 1 hour.", "3. Sip throughout the day."] }, { name: "Mint Green Tea 🍃", tip: "Cleanses your system and refreshes your mind with antioxidants.", ingredients: ["1 Green Tea Bag", "Hot Water", "Fresh Mint Leaves"], recipe: ["1. Steep the tea bag and mint leaves in hot water for 3 minutes.", "2. Remove the bag and enjoy."] }, { name: "Beetroot Juice 🥤", tip: "Purifies blood and promotes glowing skin (mix with carrots for better taste).", ingredients: ["1 Beetroot (diced)", "1 Carrot (diced)", "1 inch Ginger", "Water (to blend)"], recipe: ["1. Blend all ingredients until smooth.", "2. Strain the juice or drink as is for extra fiber."] }],
        nonveg: [{ name: "Grilled Fish with Lemon 🐠", tip: "Light, clean meal for natural detox and clarity, avoiding heavy oils.", ingredients: ["100g White Fish Fillet", "1/2 Lemon (sliced)", "Light Salt & Pepper"], recipe: ["1. Place fish on a grill or non-stick pan.", "2. Top with lemon slices and seasoning.", "3. Cook until flaky and serve with green salad."] }, { name: "Chicken Veg Soup 🍜", tip: "Warm broth helps digestion and inner cleansing (ensure it's low sodium).", ingredients: ["1 cup Low-Sodium Chicken Broth", "Diced Chicken Breast", "Celery & Carrots"], recipe: ["1. Simmer all ingredients until tender.", "2. Avoid adding cream or heavy seasonings."] }, { name: "Egg White Wrap 🍳", tip: "High-protein, low-fat, perfect for post-detox nourishment and rebuilding.", ingredients: ["3 Egg Whites", "1 Whole Grain Wrap", "Spinach", "Salsa"], recipe: ["1. Cook egg whites like a thin omelet.", "2. Place on the wrap with spinach and salsa.", "3. Roll up and serve."] }]
    },
    weight: {
        veg: [{ name: "Sprout & Veg Salad 🥗", tip: "Fiber-rich and refreshing — keeps you full longer and aids digestion.", ingredients: ["1 cup Mixed Sprouts", "1/2 cup Chopped Cucumber/Tomato", "Lemon Juice", "Chaat Masala"], recipe: ["1. Mix sprouts and chopped vegetables.", "2. Dress with lemon juice and chaat masala.", "3. Serve immediately."] }, { name: "Steamed Veggies with Olive Oil 🥦", tip: "Simple, light, and perfect for mindful eating and calorie control.", ingredients: ["2 cups Mixed Steamed Veggies", "1 tsp Olive Oil", "Salt & Pepper"], recipe: ["1. Steam vegetables until tender-crisp.", "2. Drizzle with a tiny amount of olive oil and seasoning."] }, { name: "Brown Rice & Lentil Bowl 🍚", tip: "Balanced carbs and protein to stay energetic while managing weight.", ingredients: ["1/2 cup Cooked Brown Rice", "1/2 cup Cooked Lentils (Dal)", "1 cup Steamed Green Beans"], recipe: ["1. Combine rice, lentils, and green beans.", "2. Add light seasoning (cumin, turmeric, salt).", "3. Serve warm."] }],
        nonveg: [{ name: "Egg White Omelet 🍳", tip: "Lean and filling — supports muscle tone and fat loss with minimal fat.", ingredients: ["3 Egg Whites", "1 Whole Egg", "Diced Onion/Bell Pepper"], recipe: ["1. Whisk egg whites and whole egg together.", "2. Pour into a non-stick pan with diced veggies.", "3. Cook until set and fold in half."] }, { name: "Grilled Chicken Salad 🥬", tip: "A fresh mix of greens and protein for clean meals and high satiety.", ingredients: ["100g Grilled Chicken Slices", "2 cups Mixed Greens", "1 tbsp Vinegar-based Dressing"], recipe: ["1. Toss greens with the dressing.", "2. Top with warm grilled chicken slices."] }, { name: "Fish Fillet with Veggies 🐟🥕", tip: "Low-calorie, high-nutrient — perfect for fitness goals and omega intake.", ingredients: ["100g Fish Fillet", "1 cup Grilled Asparagus/Zucchini", "Lemon Slice"], recipe: ["1. Season and grill the fish fillet.", "2. Grill vegetables until tender.", "3. Serve with a squeeze of fresh lemon."] }]
    },
    // --- NEW GOALS ADDED HERE ---
    hydration: {
        veg: [{ name: "Watermelon Feta Salad 🍉", tip: "High water content and essential electrolytes for rapid rehydration.", ingredients: ["1 cup Watermelon (cubed)", "1/4 cup Feta Cheese (crumbled)", "Mint Leaves", "1 tsp Lime Juice"], recipe: ["1. Gently toss watermelon cubes with feta cheese and mint leaves.", "2. Drizzle with lime juice for a zing.", "3. Serve chilled."] }, { name: "Coconut Water & Chia Seeds 🥥", tip: "A natural source of electrolytes and potassium, enhanced by hydrating chia seeds.", ingredients: ["1 cup Fresh Coconut Water", "1 tbsp Chia Seeds", "Pinch of Sea Salt"], recipe: ["1. Stir chia seeds and sea salt into coconut water.", "2. Let it sit for 10 minutes until chia seeds gel slightly.", "3. Sip slowly."] }],
        nonveg: [{ name: "Chicken and Vegetable Skewers 🍢", tip: "Lean protein with hydrating vegetables that encourage water absorption.", ingredients: ["100g Chicken Breast (cubed)", "Cherry Tomatoes", "Bell Pepper Chunks", "Zucchini Slices"], recipe: ["1. Skewer chicken and vegetables.", "2. Grill or bake until cooked.", "3. Serve immediately with a plain yogurt dip."] }, { name: "Cucumber Yogurt Raita 🥒", tip: "Cooling and hydrating base (yogurt) combined with water-rich cucumber.", ingredients: ["1 cup Plain Yogurt", "1/2 cup Grated Cucumber", "Pinch of Cumin Powder", "Salt to taste"], recipe: ["1. Whisk the yogurt until smooth.", "2. Mix in grated cucumber, cumin powder, and salt.", "3. Chill and serve as a side dish."] }]
    },
    immunity: {
        veg: [{ name: "Turmeric Ginger Shot 🧡", tip: "Anti-inflammatory and antioxidant power to boost the body's natural defenses.", ingredients: ["1 inch Turmeric Root", "1 inch Ginger Root", "1/2 Lemon (juiced)", "Pinch of Black Pepper"], recipe: ["1. Blend turmeric, ginger, and lemon juice with a splash of water.", "2. Strain the mixture into a shot glass.", "3. Drink immediately (black pepper aids absorption)."] }, { name: "Citrus Fruit Bowl 🍊", tip: "Loaded with Vitamin C and other antioxidants vital for immune cell function.", ingredients: ["1 Orange (peeled and segmented)", "1/2 cup Pineapple (cubed)", "1/2 cup Grapefruit (segmented)", "1 tbsp Pumpkin Seeds"], recipe: ["1. Combine all fruit segments in a bowl.", "2. Sprinkle with pumpkin seeds for extra zinc.", "3. Eat fresh!"] }],
        nonveg: [{ name: "Garlic Salmon & Greens 🐟", tip: "Omega-3s, Vitamin D (in fatty fish), and allicin (in garlic) for robust immunity.", ingredients: ["100g Salmon Fillet", "2 cloves Garlic (minced)", "1 cup Kale/Spinach", "1 tsp Olive Oil"], recipe: ["1. Rub salmon with garlic, salt, and pepper.", "2. Pan-fry or bake salmon and sauté the greens lightly in olive oil.", "3. Serve hot."] }, { name: "Oyster Stew (or Chicken Liver) 🦪", tip: "Oysters are one of the richest sources of Zinc, a key mineral for the immune system.", ingredients: ["1/2 cup Oysters (or 50g Chicken Liver)", "1 cup Milk/Broth", "Seasoning"], recipe: ["1. Gently simmer the oysters/liver in milk/broth until cooked.", "2. Season lightly and serve warm (consume with caution if allergic)."] }]
    },
    digestive: {
        veg: [{ name: "Lentil Soup (Dal) 🥣", tip: "High soluble fiber content promotes regular bowel movements and gut health.", ingredients: ["1 cup Cooked Yellow/Red Lentils", "1/2 cup Mixed Vegetables", "Water", "Light Cumin/Asafoetida seasoning"], recipe: ["1. Cook lentils until soft.", "2. Temper with cumin/asafoetida and add vegetables.", "3. Serve warm with minimal spice."] }, { name: "Papaya & Kefir Bowl 🥭", tip: "Contains natural enzymes (papain) to break down food, combined with probiotic cultures.", ingredients: ["1 cup Kefir/Probiotic Yogurt", "1/2 cup Ripe Papaya (cubed)", "1 tbsp Ground Flaxseed"], recipe: ["1. Combine kefir/yogurt and papaya in a bowl.", "2. Sprinkle with ground flaxseed for fiber and omega-3s.", "3. Eat slowly as a snack."] }],
        nonveg: [{ name: "Plain Grilled White Fish 🐠", tip: "Very easy to digest, providing protein without stressing the digestive system.", ingredients: ["100g Steamed or Grilled White Fish (Cod/Tilapia)", "Pinch of Salt", "Steamed Green Beans"], recipe: ["1. Season the fish very lightly and grill or steam.", "2. Serve with plain steamed green beans.", "3. Avoid all heavy sauces or excessive oil."] }, { name: "Light Chicken Broth with Rice 🍲", tip: "Hydrating, soothing, and gentle on an upset stomach, providing necessary nutrients.", ingredients: ["1 cup Low-Sodium Chicken Broth", "1/4 cup Cooked Plain White Rice", "Shredded Chicken (optional)"], recipe: ["1. Heat the broth and add the cooked rice.", "2. Simmer for 2 minutes to blend flavors.", "3. Serve warm. Skip the chicken if stomach is sensitive."] }]
    }
};

// --- NEW NEURO FACTS DATA STRUCTURE ---
const neuroFacts = {
    serotonin: {
        title: "😊 Serotonin: The Happiness Chemical",
        description: "Serotonin regulates mood, sleep, appetite, and digestion. It is primarily made from the amino acid Tryptophan. To boost it, focus on Tryptophan-rich foods combined with healthy carbohydrates for better absorption.",
        veg: "Foods: **Spinach**, **Tofu**, **Pumpkin/Sunflower Seeds**, Bananas, Oats.",
        nonveg: "Foods: **Eggs**, **Salmon**, **Cheese** (especially cottage cheese), Turkey, Chicken."
    },
    dopamine: {
        title: "🚀 Dopamine: The Motivation & Reward Chemical",
        description: "Dopamine drives motivation, focus, and pleasure. It is built from the amino acid Tyrosine. Eating protein-rich foods helps supply the building blocks needed to keep your motivation high.",
        veg: "Foods: **Almonds**, **Avocados**, **Beans/Legumes**, Sesame Seeds, Turmeric.",
        nonveg: "Foods: **Lean Chicken**, **Fish (Tuna/Mackerel)**, Beef, Eggs, Cottage Cheese."
    },
    gaba: {
        title: "🧘‍♀️ GABA: The Calmness & Anti-Anxiety Chemical",
        description: "GABA (Gamma-Aminobutyric Acid) is the primary inhibitory neurotransmitter, reducing nerve excitability. Low GABA is linked to anxiety. Certain foods contain compounds that support GABA production.",
        veg: "Foods: **Oats**, **Walnuts**, **Broccoli**, Fermented Foods (Kimchi/Sauerkraut), Brown Rice.",
        nonveg: "Foods: **Prawns**, **Eggs**, Coldwater Fish (rich in zinc), Organ meats (rich in B6, a cofactor)."
    }
};

// --- NEW NEURO FACTS FUNCTIONALITY ---
function openNeuroFact(chemicalKey) {
    const fact = neuroFacts[chemicalKey];
    if (!fact) return;

    const content = document.getElementById('neuroText');
    const title = document.getElementById('neuroTitle');

    title.innerHTML = fact.title;
    
    // Combine description and food examples based on the current food type toggle
    let foodSources = fact.veg;
    if (foodType === 'nonveg') {
        foodSources = fact.nonveg;
    }

    content.innerHTML = `
        <p style="color: #444; margin-bottom: 1.5rem;">${fact.description}</p>
        <div style="border-left: 4px solid #b393d3; padding-left: 15px;">
            <h4 style="color: #667eea; margin-top: 0;">Your ${foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Sources:</h4>
            <p>${foodSources}</p>
        </div>
        <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 1.5rem; border-top: 1px dashed #eee; padding-top: 10px;">
            *Tip: These are building blocks. Lifestyle factors (sleep, exercise) are also crucial for balancing these chemicals.
        </p>
    `;

    openModal('neuroFactModal');
}
// --- END NEW NEURO FACTS FUNCTIONALITY ---


const gentleReminders = [
    ["Eat slowly and savor every bite.", "Hydration is quiet self-care — keep sipping water.", "Nourish your body with kindness, not rules.", "The more colorful your plate, the happier your cells."],
    ["Listen to your hunger, not the clock.", "Wholesome food brings peaceful energy.", "A calm meal helps a calm mind.", "Balance begins with one mindful bite."],
    ["Food tastes better when shared or smiled upon.", "Eat in peace — let gratitude flavor your meal.", "What you eat becomes energy, not guilt.", "You’re feeding both your body and spirit."]
];

function displayGentleReminders() {
    const reminderDiv = document.getElementById('reminderContent');
    if (!reminderDiv) return;
    const reminderBlock = gentleReminders[Math.floor(Math.random() * gentleReminders.length)];
    const randomTip = reminderBlock[Math.floor(Math.random() * reminderBlock.length)];
    reminderDiv.innerHTML = `<p style="font-size: 1.1rem; color: #5c007a; font-weight: 600;">"${randomTip}"</p>`;
}

function showDish(goal) {
    const modal = document.getElementById('suggestionModal');
    const selectedDish = dishes[goal][foodType][Math.floor(Math.random() * dishes[goal][foodType].length)];
    
    const ingredientsList = selectedDish.ingredients.map(ing => `<li>${ing}</li>`).join('');
    const recipeSteps = selectedDish.recipe.map(step => `<li>${step}</li>`).join('');

    document.getElementById('modalTitle').textContent = selectedDish.name;
    document.getElementById('modalText').innerHTML = `
        <p style="font-style: italic; margin-bottom: 1.5rem;">${selectedDish.tip}</p>
        
        <details style="text-align: left; margin-top: 1rem; border: 1px solid #7b1fa233; border-radius: 12px; padding: 0.5rem 1rem;">
            <summary style="font-weight: 700; color: #7b1fa2; cursor: pointer; padding: 0.5rem 0;">🔪 View Full Recipe & Ingredients</summary>
            
            <div style="padding-top: 1rem; border-top: 1px dashed #eee;">
                <h4 style="font-weight: 700; margin-bottom: 0.5rem; color: #7b1fa2;">🛒 Ingredients:</h4>
                <ul style="text-align:left; list-style: disc; margin-left: 1rem; line-height:1.5; padding-left: 0;">${ingredientsList}</ul>

                <h4 style="font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #7b1fa2;">👨‍🍳 Recipe Steps:</h4>
                <ol style="text-align:left; list-style-position: inside; margin-left: 1rem; line-height:1.6; padding-left: 1.2rem;">${recipeSteps}</ol>
            </div>
        </details>
    `;
    openModal('suggestionModal');
}

function openNutritionFacts() {
    const content = document.getElementById('nutritionText');
    content.innerHTML = `
        <h4 style="color: #2c3e50; font-weight: 700; margin-top: 1rem;">1. Omega-3 Fatty Acids (The Mood Stabilizers)</h4>
        <p>Essential fats found in fatty fish (salmon, tuna) and walnuts/flaxseeds. They are vital for brain structure and can help manage symptoms of depression and anxiety.</p>
        <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.5;"><li>**Source Examples:** Walnuts, Flaxseeds, Fatty Fish (Non-Veg), Chia Seeds (Veg).</li></ul>

        <h4 style="color: #2c3e50; font-weight: 700; margin-top: 1.5rem;">2. The Gut-Brain Axis (Happy Gut, Happy Mind)</h4>
        <p>Your gut is lined with neurons and produces most of the body's serotonin (the 'happy' chemical). Foods rich in fiber and probiotics support a healthy gut flora, which directly influences your mood and stress response.</p>
        <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.5;"><li>**Gut-Friendly Foods:** Yogurt, Fermented foods (Idli, Dosa batter), Bananas, Oats.</li></ul>

        <h4 style="color: #2c3e50; font-weight: 700; margin-top: 1.5rem;">3. B Vitamins and Folate (Energy and Focus)</h4>
        <p>B vitamins (especially B6, B12, and Folate) are crucial for nerve health and energy production. Deficiencies can lead to fatigue and poor focus.</p>
        <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.5;"><li>**Source Examples:** Spinach, Lentils, Eggs (Non-Veg), Whole Grains.</li></ul>
    `;
    openModal('nutritionFactsModal');
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