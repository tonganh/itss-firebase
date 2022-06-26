import React, { useState } from 'react';

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useFirebaseStorage from '../hooks/firebaseStorage';

/* ライブラリ */
import { getKey } from "../lib/util";

function Todo() {
  const [items, putItems, clearItems, updateItem] = useFirebaseStorage();

  const [filter, setFilter] = React.useState('ALL');

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });

  const handleCheck = async (checked) => {
    await updateItem(checked)
  };

  // const handleAdd = text => {
  //   putItems([...items, { key: getKey(), text, done: false }]);
  // };

  const handleAdd = async (text) => {
    await putItems({ key: getKey(), text, done: false });
  };

  const handleFilterChange = value => setFilter(value);

  return (
    <article class="panel is-danger">
      <div className="panel-heading">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map(item => (
        <TodoItem
          key={item.key}
          item={item}
          onCheck={handleCheck}
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={async () => {
          await clearItems()
        }}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;