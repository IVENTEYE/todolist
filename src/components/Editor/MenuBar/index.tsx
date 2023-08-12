import React, { useState, useEffect, useRef, FC } from 'react';
import { BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline, BsTextLeft, BsTextCenter, BsTextRight } from 'react-icons/bs';
import { BiHighlight, BiHeading } from 'react-icons/bi';
import { RiTaskLine } from 'react-icons/ri';
import { HiMiniListBullet } from 'react-icons/hi2';
import { AiOutlineOrderedList } from 'react-icons/ai';
import styles from './styles.module.scss';
import cl from 'clsx'
import { Editor } from '@tiptap/react';

interface IMenuBar {
  editor: Editor;
  fixed: boolean;
}

type OptionsTypes = {
  icon: JSX.Element,
  onClick: () => boolean,
  className: string,
}

const MenuBar: FC<IMenuBar> = ({ editor, fixed }) => {

  const options: OptionsTypes[] = [
    {
      icon: <BsTypeBold size={20} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      className: editor.isActive('bold') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BsTypeItalic size={20} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      className: editor.isActive('italic') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BsTypeUnderline size={20} />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      className: editor.isActive('underline') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BsTypeStrikethrough size={20} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      className: editor.isActive('strike') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BiHeading size={20} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      className: editor.isActive('heading') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BsTextLeft size={20}/>,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      className: editor.isActive({ textAlign: 'left' }) ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BsTextCenter size={20}/>,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      className: editor.isActive({ textAlign: 'center' }) ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BsTextRight size={20}/>,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      className: editor.isActive({ textAlign: 'right' }) ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <HiMiniListBullet size={20} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      className: editor.isActive('bulletList') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <AiOutlineOrderedList size={20} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      className: editor.isActive('orderedList') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <RiTaskLine size={20} />,
      onClick: () => editor.chain().focus().toggleTaskList().run(),
      className: editor.isActive('taskList') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
    {
      icon: <BiHighlight size={20} />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      className: editor.isActive('highlight') ? `${styles.isActive} ${styles.menuOptionsItem}` : styles.menuOptionsItem,
    },
  ];
  
  return (
    <>
      {editor && (
        <div className={ fixed ? cl(`${styles.menuOptions}`, `${styles.fixed}`) : styles.menuOptions}>
          {
            options.map(option => {
              return <button type='button' className={option.className} onClick={option.onClick}>{option.icon}</button>
            })
          }
        </div>
      )}
    </>
  );
};

export default MenuBar;
