const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const playSelect = document.getElementById('play');

let ticketPrice = +playSelect.value;

//Save Selected movie index and price
function setPlayData(playIndex, playPrice) {
  localStorage.setItem('selectedPlayIndex', playIndex);
  localStorage.setItem('selectedPlayPrice', playPrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;
  
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

//Play select Event
playSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setPlayData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

//Seat click event
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && 
  !e.target.classList.contains('occupied')
) {
    e.target.classList.toggle('selected');

    updateSelectedCount()
  }
})