// Pattern to match for requirement checkboxes
const MATCH_REQ = /^\s*(\d+): (.+)$/

// Element selectors
const select = {
  taskListItems: () => document.querySelectorAll('li.task-list-item'),
  reqPoints: () => document.querySelectorAll('.req-points'),

  footer: () => document.querySelector('footer.evaluation-calculator'),
  denominator: () => document.querySelector('.points-denominator'),
  earned: () => document.querySelector('.points-earned'),
  percent: () => document.querySelector('.points-percent'),
  learnerUsername: () => document.querySelector('input[name="learnerUsername"]'),
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
    Points:
    <span class="points-earned">0</span> / <span class="points-denominator">0</span>
    (<span class="points-percent">0</span>%) &nbsp; | &nbsp;
    <input type="text" name="learnerUsername" placeholder="Learner username">
  `

  const reportGeneratorButton = document.createElement('button')
  reportGeneratorButton.innerText = 'Make Report'
  reportGeneratorButton.addEventListener('click', generateReport)

  footer.appendChild(reportGeneratorButton)

  document.body.appendChild(footer)
}

function replaceCheckboxesWithInputs() {
  select.taskListItems().forEach((elem) => {
    const itemText = elem.innerText

    if (MATCH_REQ.test(itemText)) {
      const checkbox = elem.querySelector('input')
      const value = itemText.match(MATCH_REQ)[1]
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

function generateReport() {
  const report = {
    username: select.learnerUsername().value,
    pointsEarned: select.earned().innerText,
    totalPoints: select.denominator().innerText,
  }

  const rawSections = []
  let currentSection

  document.querySelectorAll('h2, li.task-list-item').forEach((elem) => {
    const text = elem.innerText

    switch (elem.tagName) {
      case 'H2':
        currentSection = { section: text, reqs: [] }
        rawSections.push(currentSection)
        break;
      case 'LI':
        if (MATCH_REQ.test(text)) {
          const [maxValue, reqText] = text.match(MATCH_REQ).slice(1)
          const givenValue = elem.querySelector('input.req-points').value
          currentSection.reqs.push(`[${givenValue} / ${maxValue}] : ${reqText}`)
        }
        break;
    }
  })

  report.sections = rawSections.filter((section) => section.reqs.length > 0)

  // Generate a file for the report and download it using a temporary, invisible link
  const tempLink = document.createElement('a')
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report));
  tempLink.href = dataStr
  tempLink.download = report.username.length > 0 ? `${report.username}.json` : 'report.json'
  tempLink.click()
}

// Load and execute
console.log("Initializing challenge evaluator extension...");
insertFooter()
replaceCheckboxesWithInputs()
calculatePointsEarned()
