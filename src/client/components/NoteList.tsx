import * as React from 'react'
import { Item } from '../../shared/models/Item'
import { NoteContext } from './context/NoteContext'
import ItemComponent from './Item'

const NoteList = () => (
  <NoteContext.Consumer>
    {
      (context) => (
        <div>
          <div>
            {
                context.noteList.map((item: Item) => (
                  <ItemComponent
                    item={item}
                    key={item.description}
                    id={item.description}
                  />
                ))
              }
          </div>
        </div>
      )
      }
  </NoteContext.Consumer>
)

export default NoteList
