import React, { useState } from "react";

import styles from './Item.module.css';

export const Item = ({ item, i, arr, refresh, setRefresh, }) => {
  const [subItemContent, setSubItemContent] = useState('');
  const [needSubList, setNeedSubList] = useState(false);

  const handler = (action) => {
    switch (action) {
      case 'up':
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        setRefresh(!refresh);
        break;
      case 'down':
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        setRefresh(!refresh);
        break;
      case 'remove':
        arr.splice(i, 1);
        setRefresh(!refresh);
        break;
      default:
        setList(nweList);
    };
  };

  const addSubItem = (content) => {
    const subItem = {
      id: new Date().getTime(),
      content,
      items: []
    };
    item.items = [...item.items, subItem];
    setRefresh(!refresh);
  };

  const removeSubList = () => {
    item.items = [];
    setRefresh(!refresh);
    setNeedSubList(false);
  };

  return (
    <>
      {item.items.length > 0 && (
        <ul>
          {item.items.map((thisItem, index, thisArr) => (
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
      )}

      <div className={styles.item}>
        <div className={styles.item__content}>
          {item.content} 
        </div>

        <div className={styles.item__control__container}>
          <div className={styles.item__control__buttons}>
            <div className={styles.item__position__buttons}>
              {i !== (0) && (
                <button
                  type="button"
                  className={styles.item__positionButton}
                  onClick={() => {
                    handler('up');
                  }}
                >
                  UP
                </button>
              )}

              {i !== arr.length - 1 && (
                <button
                  type="button"
                  className={styles.item__positionButton}
                  onClick={() => {
                    handler('down');
                  }}
                >
                  DOWN
                </button>
              )}
            </div>

            <div className={styles.item__actions__buttons}>
              <button
                type="button"
                className={styles.item__actionsButton_del}
                onClick={() => {
                  handler('remove');
                }}
              >
                Remove
              </button>

              {needSubList ? (
                <button
                  type="button"
                  className={styles.item__actionsButton_add}
                  onClick={() => {
                    if (subItemContent) {
                      addSubItem(subItemContent);
                      setSubItemContent('');
                    };
                  }}
                >
                  ADD
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.item__actionsButton_add}
                  onClick={() => {
                    setNeedSubList(true);
                  }}
                >
                  Add Sublist
                </button>
              )}
            </div>
          </div>

          {needSubList && (
            <input
              type="text"
              className={styles.actions__input}
              value={subItemContent}
              onChange={event => {
                setSubItemContent(event.target.value);
              }}
            />
          )}

          {item.items.length > 0 && (
            <button
              type="button"
              className={styles.item__actionsButton_del}
              onClick={removeSubList}
            >
              Remove Sublist
            </button>
          )}
        </div>
      </div>
    </>
  );
};
