
const MAX_EXTENSION = 200
const INITIAL_OPACITY = 1
const OPACITY_DIFFERENCE = 0.1
const opacityIncrement: number = MAX_EXTENSION / 10
let sliderStartPosition: number
let sliderEndPosition: number
let opacityNextIncrement: number = opacityIncrement
let currentOpacity: number = INITIAL_OPACITY
const touchedElements = new Set()
let startVerticalPosition: number
const VERTICAL_SCROLLING_OFFSET: number = 20

const handleTouchStart = (event: TouchEvent, element: HTMLElement) => {
  touchedElements.add(element.id)
  applyTouchClass(element)
  sliderStartPosition = event.touches[0].pageX
  startVerticalPosition = event.touches[0].pageY
}

const applyTouchClass = (element: HTMLElement) => {
  setTimeout(() => {
    if (touchedElements.has(element.id)) {
      element.classList.add('touched')
    }
  }, 50)
}

const handleTouchMove = (event: TouchEvent, element: HTMLElement) => {
  if (userIsScrolling(event)) {
    element.classList.remove('touched')
  } else {
    sliderEndPosition = event.touches[0].pageX
    if (needOpacityIncrement()) {
      opacityNextIncrement += opacityIncrement
      currentOpacity -= OPACITY_DIFFERENCE
      element.style.opacity = (currentOpacity).toString()
    } else if (needOpacityDecrement()) {
      opacityNextIncrement -= opacityIncrement
      currentOpacity += OPACITY_DIFFERENCE
      element.style.opacity = (currentOpacity).toString()
    }
  }
}

const userIsScrolling = (event: TouchEvent) => {
  const currentVerticalPosition = event.touches[0].pageY
  const verticalDelta = Math.abs(currentVerticalPosition - startVerticalPosition)
  return verticalDelta > VERTICAL_SCROLLING_OFFSET
}

const handleTouchEnd = (element: HTMLElement, updateNoteCallback: (id: string) => void) => {
  touchedElements.delete(element.id)
  element.classList.remove('touched')
  element.style.opacity = INITIAL_OPACITY.toString()
  if (currentSliderProgress() > MAX_EXTENSION) {
    updateNoteCallback(element.id)
  }
  resetCounters()
}

const resetCounters = () => {
  sliderStartPosition = 0
  sliderEndPosition = 0
  currentOpacity = 1
  opacityNextIncrement = opacityIncrement
}

const needOpacityIncrement = () => currentSliderProgress() > opacityNextIncrement

const needOpacityDecrement = () => currentSliderProgress() < opacityNextIncrement - opacityIncrement

const currentSliderProgress = () => sliderEndPosition - sliderStartPosition

export { handleTouchStart, handleTouchMove, handleTouchEnd }
