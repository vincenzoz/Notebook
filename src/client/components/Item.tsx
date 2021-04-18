import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { useEffect } from 'react'
import { Item } from '../../shared/models/Item'
import { NoteContext, NoteContextType } from './context/NoteContext'
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './handler/ItemSliderHandler'

type ItemComponentProps = {
    item: Item
    id: string
}

const ItemComponent = ({ item, id }: ItemComponentProps) => {
  const noteContext: NoteContextType = React.useContext(NoteContext)

  useEffect(() => {
    const element = document.getElementById(id)
    if (element != null) {
      addTouchListeners(element)
    }
    return () => cleanupTouchListeners(element)
  })

  const addTouchListeners = (element: HTMLElement) => {
    element.addEventListener('touchstart', touchStart)
    element.addEventListener('touchmove', touchMove)
    element.addEventListener('touchend', touchEnd)
  }

  const cleanupTouchListeners = (element: HTMLElement) => {
    element.removeEventListener('touchstart', touchStart)
    element.removeEventListener('touchmove', touchMove)
    element.removeEventListener('touchend', touchEnd)
  }

  const touchStart = function (event: TouchEvent) {
    handleTouchStart(event, this)
  }
  const touchMove = function (event: TouchEvent) {
    handleTouchMove(event, this)
  }
  const touchEnd = function () {
    handleTouchEnd(this)
    removeItemFromContext()
  }

  function removeItemFromContext() {
    const element = document.getElementById(id)
    if (element === null) {
      let noteListClone: Item[] = [...noteContext.noteList]
      noteListClone = noteListClone.filter((elem) => elem.description !== item.description)
      noteContext.updateNoteList(noteListClone)
    }
  }

  const [itemClass, setItemClass] = React.useState(item.isStrikethrough ? 'note-item strikethrough' : 'note-item')

  function strikethrough(item: Item) {
    // The order is important
    item.isStrikethrough = !item.isStrikethrough
    setItemClass(item.isStrikethrough ? 'note-item strikethrough' : 'note-item')
  }
  return (
    <div>
      <div id={id} className="item-row slider">
        <FontAwesomeIcon className="item-icon" icon={['fas', 'bullseye']} />
        <span className={`${itemClass} noselect`} onClick={() => strikethrough(item)}>{item.description}</span>
      </div>
    </div>
  )
}

export default ItemComponent
