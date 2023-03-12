import React from 'react';
import styles from './index.module.scss';
import Categories from '../Categories';
import { useInView } from 'react-intersection-observer';

function NotesInfo({ notes, inputValue, filterItems, categories, filterCategory }) {
  const [fixed, setFixed] = React.useState(false);
  const refItems = React.useRef();
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '-57px 0px 0px 0px',
  });

  // React.useEffect(() => {
  //   if (inView) {
  //     setFixed(false);
  //   } else {
  //     setFixed(true);
  //   }
  // }, [inView]);

  // const tmin = 47,
  //   tmax = 47,
  //   pmin = 7,
  //   pmax = 10;
  // window.addEventListener('scroll', function () {
  //   if (refItems.current) {
  //     if (fixed) {
  //       const s = window.pageYOffset; // current scrollTop
  //       const top = tmax - ((tmax - tmin) * s) / (document.body.scrollHeight - window.innerHeight);
  //       const padding =
  //         pmax - ((pmax - pmin) * s) / (document.body.scrollHeight - window.innerHeight);

  //       refItems.current.style.top = top + 'px';
  //       refItems.current.style.paddingTop = padding + 'px';
  //       refItems.current.style.paddingBottom = padding + 'px';
  //     } else {
  //       refItems.current.removeAttribute('style');
  //     }
  //   }
  // });

  return (
    <>
      {notes.length > 0 && inputValue === '' ? (
        <div ref={ref} className={fixed ? styles.notesInfo + ' ' + styles.fixed : styles.notesInfo}>
          <div ref={refItems} className={styles.notesInfoItems}>
            <>
              <div className={styles.noteCounter}>Всего заметок: {notes.length}</div>
              {notes.length > 1 && (
                <Categories
                  fixed={fixed}
                  filter={filterItems}
                  categories={categories}
                  onFilter={filterCategory}
                />
              )}
            </>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NotesInfo;
