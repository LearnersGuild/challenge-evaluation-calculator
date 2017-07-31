const select = {
  taskListItems: () => document.querySelectorAll('li.task-list-item'),
  reqPoints: () => document.querySelectorAll('.req-points'),

  footer: () => document.querySelector('footer.evaluation-calculator'),
  denominator: () => document.querySelector('.points-denominator'),
  earned: () => document.querySelector('.points-earned'),
  percent: () => document.querySelector('.points-percent'),
}

function insertFooter() {
  const footer = document.createElement('footer')

  footer.classList.add('evaluation-calculator')
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
    (<span class="points-percent">0</span>%)
  `

  document.body.appendChild(footer)
}

function replaceCheckboxesWithInputs() {
  const matchReq = /^ (\d+): (.+)$/

  select.taskListItems().forEach((elem) => {
    const itemText = elem.innerText

    if (matchReq.test(itemText)) {
      const checkbox = elem.querySelector('input')
      const value = itemText.match(matchReq)[1]
      const input = makeInput(value)

      elem.prepend(input)
      checkbox.remove()

      input.addEventListener('change', calculatePointsEarned)
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

  return ipt
}

function incrementDenominator(points) {
  const denom = select.denominator()
  denom.innerText = parseInt(denom.innerText) + points
}

function calculatePointsEarned(event) {
  event && event.stopPropagation()

  let points = 0
  select.reqPoints().forEach((elem) => {
    points += parseInt(elem.value)
  })

  const denom = parseInt(select.denominator().innerText)
  const percent = toPercent(points / denom)

  select.earned().innerText = points
  select.percent().innerText = percent
}

function toPercent(decimal) {
  return Math.round(decimal * 100 * 100) / 100
}

// Load and execute
console.log("Initializing challenge evaluator extension...");
insertFooter()
replaceCheckboxesWithInputs()
calculatePointsEarned()
