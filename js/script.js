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
let count = 0;
let currentEdibleIndex = 0;
let remainingHearts = 3;
let currentNonEdibleIndex = 0;
let clickable = true;
function pauseClicked() {
  var button = document.querySelector(".pause_button");
  var icon = button.querySelector("i");

  if (icon.classList.contains("bi-pause-fill")) {
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-caret-right-fill");
  } else {
    icon.classList.remove("bi-caret-right-fill");
    icon.classList.add("bi-pause-fill");
  }
}
function displayImages() {
  const isEdibleFirst = Math.random() < 0.5;

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
  imageRow.innerHTML = cardHtml;

  currentEdibleIndex++;
  currentNonEdibleIndex++;
}

function checkAnswer(isCorrect) {
  if (!clickable) {
    return;
  }

  count++;
  clickable = false;
  console.log(count);
  if (isCorrect) {
    document.getElementById("correct-gif").style.display = "block";
    document.getElementById("success-sound").play();
    const correctCountElement = document.getElementById("correctCount");
    const correctCount = parseInt(correctCountElement.textContent);
    correctCountElement.textContent = correctCount + 1;
  } else {
    const inCorrectCountElement = document.getElementById("inCorrectCount");
    inCorrectCountElement.textContent =
      parseInt(inCorrectCountElement.textContent) + 1;

    if (remainingHearts > 0) {
      const hearts = document.getElementById("hearts");
      const heartIcons = hearts.querySelectorAll(".bi-heart-fill");
      heartIcons[remainingHearts - 1].style.display = "none";
      remainingHearts--;
    }

    if (remainingHearts != 0) {
      document.getElementById("incorrect-gif").style.display = "block";
      document.getElementById("incorrect-sound").play();
    } else {
      document.getElementById("game-over").play();
      const modal = document.getElementById("game-over-modal");
      modal.classList.add("show");
      modal.style.display = "block";
      clickable = false;
      return;
    }
  }

  if (count == 10) {
    document.getElementById("game-over").play();
    const modal = document.getElementById("game-over-modal");
    modal.classList.add("show");
    modal.style.display = "block";
  }
  document.getElementById("next-button").style.display = "block";
}
function nextImages() {
  document.getElementById("correct-gif").style.display = "none";
  document.getElementById("incorrect-gif").style.display = "none";
  document.getElementById("next-button").style.display = "none";
  clickable = true;
  displayImages();
}
// Function to restart the game
function restartGame() {
  // Reset all variables and elements
  remainingHearts = 3;
  currentEdibleIndex = 0;
  currentNonEdibleIndex = 0;
  const modal = document.getElementById("game-over-modal");
  modal.classList.add("show");
  modal.style.display = "none";
  document.getElementById("correctCount").textContent = "0";
  document.getElementById("inCorrectCount").textContent = "0";
  // document.getElementById("game-over-message").style.display = "none";
  const heartIcons = document.querySelectorAll("#hearts .bi-heart-fill");
  heartIcons.forEach((icon) => (icon.style.display = "inline"));

  clickable = true;
  displayImages();
}

// Display the first set of images when the page loads
displayImages();
