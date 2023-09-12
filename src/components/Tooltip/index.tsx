import React from 'react';
import styles from "./index.module.scss"

interface ITooltip {
    visible: boolean;
    text: string;
    image?: string;
}

const Tooltip: React.FC<ITooltip> = ({ visible = false, text, image }) => {

  return (
    <div
      className={visible ? styles.tooltip + ' ' + styles._active : styles.tooltip}
    >
      <div className={styles.tooltip__body}>
        <div className={styles.tooltip__items}>
          <div className={styles.tooltip__image}>
            <img src={image} alt="" />
          </div>
          <div className={styles.tooltip__content}>
            <div className={styles.tooltip__text}>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
