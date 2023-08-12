import { useEditor, EditorContent } from '@tiptap/react';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import BulletList from '@tiptap/extension-bullet-list'
import StarterKit from '@tiptap/starter-kit';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import Placeholder from '@tiptap/extension-placeholder';
import MenuBar from '../MenuBar/index.tsx';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading';

interface IEditor {
  value: string;
  setValue: Dispatch<string>;
  menuState: boolean;
}

const EditorField: React.FC<IEditor> = ({ value, setValue, menuState }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Введите текст...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Underline,
      Highlight,
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [2],
      })
    ],
    content: value,
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
  });

  if (!editor) {
    return null
  }

  return (
    <>
      <MenuBar editor={editor} fixed={menuState}/>
      <EditorContent className={styles.editor__content} editor={editor} />
    </>
  );
};

export default EditorField;
