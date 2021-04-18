const MAX_EXTENSION = 200
const INITIAL_OPACITY = 1
const OPACITY_DIFFERENCE = 0.1
const opacityIncrement: number = MAX_EXTENSION / 10
let sliderStartPosition: number
let sliderEndPosition: number
let opacityNextIncrement: number = opacityIncrement
let currentOpacity: number = INITIAL_OPACITY

const handleTouchStart = (event: TouchEvent, element: HTMLElement) => {
  element.classList.add('touched')
  sliderStartPosition = event.touches[0].pageX
}

const handleTouchMove = (event: TouchEvent, element: HTMLElement) => {
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

const handleTouchEnd = (element: HTMLElement) => {
  element.classList.remove('touched')
  element.style.opacity = INITIAL_OPACITY.toString()
  if (currentSliderProgress() > MAX_EXTENSION) {
    element.remove()
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
