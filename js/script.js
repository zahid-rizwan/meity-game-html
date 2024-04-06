// Define arrays for edible and non-edible image URLs
const edibleImageUrls = [
  "./edible/apple.svg",
  "./edible/grapes.svg",
  "./edible/orange.svg",
  "./edible/bananas.svg",
  "./edible/mango.svg",
  "./edible/strawberry.svg",
  "./edible/pineapple.svg",
];
const nonEdibleImageUrls = [
  "./notEdible/Train.svg",
  "./notEdible/Car.svg",
  "./notEdible/Bike.svg",
  "./notEdible/Bicycle.svg",
  "./notEdible/Bus.svg",
  "./notEdible/Truck.svg",
];
let currentEdibleIndex = 0;
let remainingHearts = 3;
let currentNonEdibleIndex = 0;
let clickable = true; // Flag to track if cards are clickable
function pauseClicked() {
  var button = document.querySelector(".pause_button");
  var icon = button.querySelector("i");

  // Toggle between pause and play icon
  if (icon.classList.contains("bi-pause-fill")) {
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-caret-right-fill");
  } else {
    icon.classList.remove("bi-caret-right-fill");
    icon.classList.add("bi-pause-fill");
  }
}
// Function to display the next set of images
function displayImages() {
  // Randomly decide which card should display the edible image
  const isEdibleFirst = Math.random() < 0.5; // Randomly choose between true (first card) or false (second card)

  // Get the index for selecting images
  const edibleIndex = currentEdibleIndex % edibleImageUrls.length;
  const nonEdibleIndex = currentNonEdibleIndex % nonEdibleImageUrls.length;

  // Get the container for displaying images
  const imageRow = document.getElementById("image-row");

  // Create Bootstrap cards for displaying images
  const cardHtml = `
    <div class="col-6 col-md-3">
      <div class="card h-100">
        <img src="${
          isEdibleFirst
            ? edibleImageUrls[edibleIndex]
            : nonEdibleImageUrls[nonEdibleIndex]
        }" class="card-img-top" alt="${
    isEdibleFirst ? "Edible" : "Non-Edible"
  }" onclick="checkAnswer(${isEdibleFirst})">
      </div>
    </div>
    <div class="col-6 col-md-3 ">
      <div class="card h-100">
        <img src="${
          isEdibleFirst
            ? nonEdibleImageUrls[nonEdibleIndex]
            : edibleImageUrls[edibleIndex]
        }" class="card-img-top" alt="${
    isEdibleFirst ? "Non-Edible" : "Edible"
  }" onclick="checkAnswer(!${isEdibleFirst})">
      </div>
    </div>
  `;

  // Replace the content of the image row with the new cards
  imageRow.innerHTML = cardHtml;

  // Increment the index for the next time
  currentEdibleIndex++;
  currentNonEdibleIndex++;
}

// Function to check the correctness of the player's answer
// Initialize with the total number of hearts

// Function to check the correctness of the player's answer
function checkAnswer(isCorrect) {
  // If cards are not clickable, return without doing anything
  if (!clickable) {
    return;
  }

  // Disable clicking on cards
  clickable = false;

  // If correct, show the GIF and play the success sound
  if (isCorrect) {
    document.getElementById("correct-gif").style.display = "block";
    document.getElementById("success-sound").play();

    // Increase the correct count and display it
    const correctCountElement = document.getElementById("correctCount");
    const correctCount = parseInt(correctCountElement.textContent);
    correctCountElement.textContent = correctCount + 1;
  } else {
    if (remainingHearts > 0) {
      const hearts = document.getElementById("hearts");
      const heartIcons = hearts.querySelectorAll(".bi-heart-fill");
      heartIcons[remainingHearts - 1].style.display = "none";
      remainingHearts--;
    }
    if (remainingHearts != 0) {
      document.getElementById("incorrect-gif").style.display = "block";
      document.getElementById("incorrect-sound").play();
    }

    // Hide one heart if there are remaining hearts

    // If no hearts are left, show "Game Over" message
    else {
      document.getElementById("game-over").play();
      document.getElementById("game-over-message").style.display = "block";
      document.getElementById("incorrect-gif").style.display = "none";
      clickable = false;
      return;
    }
  }

  // Show the "Next" button
  document.getElementById("next-button").style.display = "block";
}

// Function to proceed to the next set of images
function nextImages() {
  // Hide the "Next" button and GIFs
  document.getElementById("correct-gif").style.display = "none";
  document.getElementById("incorrect-gif").style.display = "none";
  document.getElementById("next-button").style.display = "none";

  // Enable clicking on cards
  clickable = true;

  // Display the next set of images
  displayImages();
}
// Function to restart the game
function restartGame() {
  // Reset all variables and elements
  remainingHearts = 3;
  currentEdibleIndex = 0;
  currentNonEdibleIndex = 0;
  document.getElementById("correctCount").textContent = "0";
  document.getElementById("wrongCount").textContent = "0";
  document.getElementById("game-over-message").style.display = "none";
  const heartIcons = document.querySelectorAll("#hearts .bi-heart-fill");
  heartIcons.forEach((icon) => (icon.style.display = "inline"));

  clickable = true;
  displayImages();
}

// Display the first set of images when the page loads
displayImages();
