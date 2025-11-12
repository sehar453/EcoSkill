// --- EcoTrack Module ---

// List of eco-friendly habits
const habits = [
  "Used a reusable bottle",
  "Avoided plastic bag",
  "Used public transport",
  "Saved electricity",
  "Reduced water waste",
  "Planted a tree"
];

// Motivational tips
const tips = [
  "Every small action counts!",
  "Switch off unused lights to save energy.",
  "Walk or cycle for short distances.",
  "Reuse and recycle items whenever possible.",
  "Small steps lead to big changes!"
];

// Generate habit checkboxes dynamically
const habitList = document.getElementById("habit-list");
habits.forEach((habit, index) => {
  habitList.innerHTML += `<label><input type="checkbox" id="h${index}"> ${habit}</label>`;
});

// Calculate eco score and update progress
document.getElementById("calc-score").onclick = () => {
  let score = 0;
  habits.forEach((_, i) => {
    if (document.getElementById(`h${i}`).checked) score++;
  });

  // Update score text
  document.getElementById("eco-score").innerText = `Your Eco Score: ${score}/${habits.length}`;

  // Update progress bar
  const percent = (score / habits.length) * 100;
  document.getElementById("eco-progress").style.width = percent + "%";

  // Display random tip
  document.getElementById("eco-tip").innerText = tips[Math.floor(Math.random() * tips.length)];

  // Save to localStorage
  localStorage.setItem("ecoScore", score);
};

// --- SkillScope Module ---

document.getElementById("find-skill").onclick = () => {
  const interest = document.getElementById("interest").value;
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!interest) {
    result.innerText = "Please select an interest.";
    return;
  }

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      const paths = data[interest];
      paths.forEach(p => {
        const link = document.createElement("a");
        link.href = p.link;
        link.target = "_blank";
        link.innerText = "• " + p.name;
        result.appendChild(link);
      });
      // Save suggestions to localStorage
      localStorage.setItem("careerSuggestions", JSON.stringify(paths));
    })
    .catch(err => {
      result.innerText = "Error loading resources.";
      console.error(err);
    });
};
