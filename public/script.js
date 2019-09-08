function addMouseOver() {
  table.addEventListener('mouseover', colorize)
}

function removeMouseOver() {
  table.removeEventListener('mouseover', colorize)
}
