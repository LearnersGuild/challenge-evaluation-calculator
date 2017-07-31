function insertFooter() {
  const footer = document.createElement('footer')

  footer.style['position'] = 'fixed'
  footer.style['width'] = '100%'
  footer.style['min-height'] = '52px'
  footer.style['background-color'] = 'black'
  footer.style['color'] = 'white'
  footer.style['bottom'] = 0
  footer.style['padding'] = '12px'
  footer.innerHTML = `
    <strong>Challenge Evaluation Calculator</strong> &nbsp; | &nbsp;
    Points total:
    <span class="points-earned">0</span> / <span class="points-denominator">0</span>
  `

  document.body.appendChild(footer)
}

function replaceCheckboxesWithInputs() {
  const matchReq = /^ (\d+): (.+)$/

  document.querySelectorAll('li.task-list-item').forEach((elem) => {
    const itemText = elem.innerText

    if (matchReq.test(itemText)) {
      const checkbox = elem.querySelector('input')
      const value = itemText.match(matchReq)[1]
      const input = makeInput(value)

      // checkbox.replaceWith(input)
      elem.prepend(input)
      checkbox.remove()
      incrementDenominator(parseInt(value))
    }
  })
}

function makeInput(maxVal) {
  const ipt = document.createElement('input')

  ipt.type = 'number'
  ipt.value = maxVal
  ipt.classList.add('req-points', 'form-control')
  ipt.min = 0
  ipt.max = maxVal
  ipt.addEventListener('change', calculatePointsEarned)
  return ipt
}

function incrementDenominator(points) {
  const elem = document.querySelector('.points-denominator')
  elem.innerText = parseInt(elem.innerText) + points
}

function calculatePointsEarned(event) {
  event && event.stopPropagation()

  let points = 0
  document.querySelectorAll('.req-points').forEach((elem) => {
    points += parseInt(elem.value)
  })
  document.querySelector('.points-earned').innerText = points
}

// Load and execute
console.log("Initializing challenge evaluator extension...");
insertFooter()
replaceCheckboxesWithInputs()
calculatePointsEarned()
