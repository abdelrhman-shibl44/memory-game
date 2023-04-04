// start memory game
let if_equal = 0;
let if_Notequal = 0;
gameBlocks = document.querySelectorAll(".blocks-container .game-block");
mainSection = document.querySelector(".memory-game");
overlayGame = document.querySelector(".memory-game .overlay");
HelloName = document.querySelector(".memory-holder .name span");
// control the volume of sound 
const audio = document.querySelector("#calm");
const success =  document.querySelector("#success")
const fail =  document.querySelector("#fail")
let volumeSlider = document.getElementById("volumeSlider");
// handle the volume 
const setVolume = (value) => {
  audio.volume = volumeSlider.value;
  success.volume = volumeSlider.value
  fail.volume = volumeSlider.value
}
volumeSlider.value = 0.2; // set the initial volume to 0.1
setVolume(volumeSlider.value)

volumeSlider.addEventListener("input",function() {
  setVolume(volumeSlider.value)
})
// end contorl the voulmn of sound 
document.querySelector(".memory-game .overlay span").onclick = function () {
  let YourName = window.prompt("What Is Your Name ?");
  if (YourName === null || YourName === "") {
    HelloName.innerText = "Unknown";
  } else {
    HelloName.innerText = YourName;
  }
  overlayGame.remove();
  ArrayBlock_container.forEach((block) => {
    block.classList.add("isflipped");
    setTimeout((ele) => {
      block.classList.remove("isflipped");
    }, 2000);
  });
  audio.play();
};
mainContainer = document.querySelector(".blocks-container");
block_container = document.querySelector(".blocks-container").children;
ArrayBlock_container = Array.from(block_container);
orderArray = [...Array(ArrayBlock_container.length).keys()];
console.log(orderArray);
shuffle(orderArray);
console.log(orderArray);

ArrayBlock_container.forEach((block, index) => {
  block.addEventListener("click", (e) => {
    block.classList.add("isflipped");
    checkflip(block);
  });
  block.style.order = orderArray[index];
});

function shuffle(array) {
  let current = array.length,
    random;
  for (let i = array.length; i > 0; i--) {
    random = Math.floor(Math.random() * current);
    [array[current], array[random]] = [array[random], array[current]];
  }
  console.log(random);
  return array;
}
function checkflip(flip) {
  let filterFlippedCards = ArrayBlock_container.filter((flippedBlock) =>
    flippedBlock.classList.contains("isflipped")
  );

  // console.log(filterFlippedCards);

  if (filterFlippedCards.length === 2) {
    console.log("there is two flipped");
    mainContainer.classList.add("noclick");
    setTimeout(() => {
      mainContainer.classList.remove("noclick");
    }, 1000);
    checkIfMatched(filterFlippedCards[0], filterFlippedCards[1]);
  }
}

function checkIfMatched(firstBlock, secondBlock) {
  let wrongTries = document.querySelector(".info .mistakes span");
  console.log(wrongTries);
  if (firstBlock.dataset.control === secondBlock.dataset.control) {
    if_equal++;
    firstBlock.classList.remove("isflipped");
    secondBlock.classList.remove("isflipped");
    firstBlock.classList.add("hasMatched");
    secondBlock.classList.add("hasMatched");
    success.play();
    if (if_equal === 8 && if_Notequal > 0 && if_Notequal < 7) {
      console.log(console.log(if_Notequal));
      createEndSuccessPopUp();
      document.querySelector(
        ".Message"
      ).innerHTML = `congratulations you made just ${if_Notequal} mistakes`;
      StylingMessage();
      audio.pause();
    }
  } else {
    if_Notequal++;
    if (if_Notequal === 7) {
      createEndSuccessPopUp();
      document.querySelector(
        ".Message"
      ).innerHTML = `Failed you made ${if_Notequal} mistakes`;
      StylingMessage();
      audio.pause();
    }
    wrongTries.innerHTML = +wrongTries.innerHTML + 1;
    setTimeout((e) => {
      firstBlock.classList.remove("isflipped");
      secondBlock.classList.remove("isflipped");
    }, 1000);
    fail.play();
  }
}

function createEndSuccessPopUp() {
  overlaySuccess = document.createElement("div");
  overlaySuccess.className = "overlay";
  spanM = document.createElement("span");
  spanM.className = "Message";
  overlaySuccess.prepend(spanM);
  spanB = document.createElement("span");
  spanB.className = "btn";
  spanB.innerText = "Play Again";
  overlaySuccess.appendChild(spanB);
  mainSection.prepend(overlaySuccess);
  document.querySelector(".overlay .btn").onclick = function () {
    overlaySuccess.remove();
    document.querySelector(".info .mistakes span").innerHTML = "";
    window.location.reload();
  };
}
function StylingMessage() {
  setTimeout(function () {
    if (document.querySelector(".Message").style.opacity < 1) {
      document.querySelector(".Message").style.opacity = "1";
    }
    document.querySelector(".Message").style.width = "100%";
    document.querySelector(".Message").style.top = "42%";
  }, 1000);
}
// end memoty game