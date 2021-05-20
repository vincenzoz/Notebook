import * as React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Item } from '../../../shared/models/Item'
import { selectNote, updateNotes } from '../../store/notebookSlice'
import { RootState } from '../../store/rootReducer'
import { useAppDispatch } from '../../store/store'
import { handleTouchEnd, handleTouchMove, handleTouchStart } from '../handler/ItemSliderHandler'

type ItemComponentProps = {
    item: Item
    id: string
}

const ItemComponent = ({ item, id }: ItemComponentProps) => {
  const dispatch = useAppDispatch()
  const state = useSelector((state: RootState) => state)

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

  const updateNoteCallback = (currentId: string) => {
    dispatch(updateNotes(state.notebook.notes
      .filter((elem) => elem.description !== currentId)))
  }
  const touchEnd = function () {
    handleTouchEnd(this, updateNoteCallback)
    removeItemFromContext()
  }

  function removeItemFromContext() {
    const element = document.getElementById(id)
    if (element === null) {
      let noteListClone: Item[] = [...state.notebook.notes]
      noteListClone = noteListClone.filter((elem) => elem.description !== item.description)
      dispatch(updateNotes(noteListClone))
    }
  }

  function getItemClass() {
    const currentItem = state.notebook.notes
      .filter((i) => i.description === item.description)
    return currentItem[0].isSelected ? ' selected' : ''
  }
  function selectItem(item: Item) {
    dispatch(selectNote(item))
  }
  return (
    <tr id={id} className={`note-item ${getItemClass()}`} onClick={() => selectItem(item)}>
      <td className="item-first-col" />
      <td className="item-description-col">
        <div className="item-description">
          {item.description}
        </div>
      </td>
    </tr>
  )
}

export default ItemComponent
