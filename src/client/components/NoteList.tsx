import * as React from 'react'
import { Item } from '../../shared/models/Item'
import { NoteContext } from './context/NoteContext'
import ItemComponent from './Item'

const NoteList = () => (
  <NoteContext.Consumer>
    {
      (context) => (
        <div className="item-list-container">
          <table className="item-list-table">
            <tbody>
              {
                  context.noteList.map((item: Item) => (
                    <ItemComponent
                      item={item}
                      key={item.description}
                      id={item.description}
                    />
                  ))
                }
            </tbody>
          </table>
        </div>
      )
      }
  </NoteContext.Consumer>
)

export default NoteList
