const buildings = document.querySelectorAll('.building');

function showTooltip() {
  const tooltipText = this.getAttribute('data-tooltip');
  <p>Home</p>
}

function showPopUp() {
  const popUpText = this.getAttribute('data-pop-up');
  <p>Home</p>
}

buildings.forEach(building => {
  building.addEventListener('mouseenter', showTooltip);
  building.addEventListener('click', showPopUp);
});
