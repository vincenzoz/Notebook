import * as React from 'react';
import { Item } from '../../shared/models/Item';
import ItemComponent from './Item';

type NoteListProps = {
    noteListUpdated: Item[]
}

const NoteList = ({noteListUpdated}: NoteListProps) => {

    function showNoteList() {
        if (noteListUpdated != undefined) {
          return (
              <div>
                {
                    noteListUpdated.map((item: Item) =>
                    <ItemComponent item={item} key={item.description}></ItemComponent>
                    )
                }
              </div>
            )
        }
      }

    return (
        <div>
           {showNoteList()}
        </div>
        )
}

export default NoteList