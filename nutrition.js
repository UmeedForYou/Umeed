let mealType = "veg";

function setType(type){
  mealType = type;
  document.getElementById("vegBtn").classList.toggle("active", type === 'veg');
  document.getElementById("nonvegBtn").classList.toggle("active", type === 'nonveg');
}

function showDish(goal){
  const age = prompt("Enter your age for Age-Aura Nutrition:");
  if(!age || isNaN(age)) return alert("Please enter valid age");

  const aura = getAura(Number(age));
  const dna = predictDNA();

  const suggestion = buildSuggestion(goal, aura, dna, mealType);

  document.getElementById("modalText").innerHTML = suggestion;
  document.getElementById("suggestionModal").classList.remove("hidden");
}

function getAura(age){
  if(age <= 19) return {color:"#b8ff6b", label:"Energy Surge (Teens)"};
  if(age <= 29) return {color:"#7b61ff", label:"Creative Focus (20s)"};
  if(age <= 39) return {color:"#a99bff", label:"Calm & Stability (30s)"};
  return {color:"#ffce85", label:"Healing & Longevity (40+)"};
}

function predictDNA(){
  const traits = ["Fast Metabolism","Slow Metabolism","Inflammation Risk","Salt Sensitivity","Sugar Sensitivity","Strong Digestion"];
  return traits[Math.floor(Math.random()*traits.length)];
}

function buildSuggestion(goal, aura, dna, type){
  const dishBank = {
    energy:{ veg:["Spinach Chia Smoothie","Veggie Oats Bowl"], nonveg:["Egg Power Wrap","Chicken Quinoa Bowl"] },
    focus:{ veg:["Omega Walnut Bowl","Blueberry Oats"], nonveg:["Salmon Rice Bowl","Egg Avocado Toast"] },
    sleep:{ veg:["Chamomile Tea + Nuts","Banana Calm Bowl"], nonveg:["Warm Chicken Soup","Egg White Calm Scramble"] },
    mood:{ veg:["Dark Cocoa Shake","Antioxidant Fruit Mix"], nonveg:["Honey Garlic Chicken","Omega Tuna Mix"] },
    detox:{ veg:["Mint Lemon Detox","Green Cleanse Salad"], nonveg:["Ginger Chicken Soup","Lemon Fish Detox"] },
    weight:{ veg:["High-Fiber Veg Plate","Green Protein Smoothie"], nonveg:["Grilled Chicken Salad","Egg Protein Plate"] }
  };

  const chosenDish = dishBank[goal][type][Math.floor(Math.random()*2)];

  return `
    <div style="padding:10px; border-left:6px solid ${aura.color}">
      <h3 style="color:${aura.color}">✨ Your Personalized Meal</h3>
      <p><b>Meal Type:</b> ${type.toUpperCase()}</p>
      <p><b>Goal:</b> ${goal.toUpperCase()}</p>
      <p><b>Recommended Dish:</b> ${chosenDish}</p>
      <hr/>
      <p><b>Age Aura:</b> ${aura.label}</p>
      <p><b>DNA Prediction:</b> ${dna}</p>
      <p style="font-size:0.9rem; opacity:0.8">Your dish is selected based on your age palette, emotional nutrition and predicted DNA traits.</p>
    </div>
  `;
}

function closeSuggestionModal(){
  document.getElementById("suggestionModal").classList.add("hidden");
}

function openNutritionFacts(){
  document.getElementById("nutritionFactsModal").classList.remove("hidden");
  document.getElementById("nutritionText").innerHTML = `
    <p>🧠 <b>Brain foods</b> boost neurotransmitters like serotonin, dopamine, and GABA.</p>
    <p>💜 Foods like blueberries, nuts, seeds support memory + focus.</p>
    <p>💤 Warm soups & bananas help activate sleep hormones.</p>
    <p>🔥 Spices like turmeric reduce inflammation improving mood.</p>`;
}

function closeModal(id){
  document.getElementById(id).classList.add("hidden");
}
