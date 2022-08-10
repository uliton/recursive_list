import React, { useEffect, useState } from 'react';
import { Item } from '../Item';

import styles from './List.module.css';

export const List = () => {
  const [list, setList] = useState(null);
  const [itemContent, setItemContent] = useState('');
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (list !== null) {
      localStorage.setItem('list', JSON.stringify(list));
    }

    if (localStorage.getItem('list') === null) {
      localStorage.setItem('list', JSON.stringify({ items: [] }));
      setList({ items: [] });
    }

    if (localStorage.getItem('list') && list === null) {
      setList(JSON.parse(localStorage.getItem('list')));
    }
  }, [refresh]);

  const addItem = (content) => {
    const item = {
      id: new Date().getTime(),
      content,
      items: [],
    };

    list.items = [...list.items, item];
    setRefresh(!refresh);
  };

  return (
    <>
      <div className={styles.list__container}>
        <ul className={styles.list}>
          {list !== null && list.items.map((thisItem, index, thisArr) => (
            <li key={thisItem.id}>
              <Item
                item={thisItem}
                i={index}
                arr={thisArr}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
          ))}
        </ul>

        <div className={styles.itemAdder__container}>
          <input
            type="text"
            placeholder="enter input text here"
            className={styles.itemAdder__input}
            value={itemContent}
            onChange={(event) => {
              setItemContent(event.target.value);
            }}
          />

          <button
            type="button"
            className={styles.itemAdder__button}
            onClick={() => {
              if (itemContent) {
                addItem(itemContent);
                setItemContent('');
              }
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );
};
