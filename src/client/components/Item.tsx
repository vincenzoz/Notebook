import * as React from 'react';
import { Item } from '../../shared/models/Item';

type ItemComponentProps = {
    item: Item
}

const ItemComponent = ({item}: ItemComponentProps) => {

    console.log('item: ', item.description, item.isStrikethrough)
    const [itemClass, setItemClass] = React.useState(item.isStrikethrough ? 'note-item strikethrough' : 'note-item')

    function strikethrough(item: Item) {
        //The order is important
        item.isStrikethrough = item.isStrikethrough ? false : true
        setItemClass(item.isStrikethrough ? 'note-item strikethrough' : 'note-item')
    }

    return (
        <div>
            <div>
                <span className={itemClass} onClick={() => strikethrough(item)}>{item.description}</span>
            </div>
        </div>
        )
}

export default ItemComponent