import React, { memo } from 'react';
import styles from './styles.module.css';
import Button from './MenuItem';
import { useMenuController } from './useMenuController';

function Menu() {
  const { menuData } = useMenuController();

  return (
    <ul className={styles.menu}>
      {menuData.map(({ id, value }) => {
        return <Button key={id} value={value} />;
      })}
    </ul>
  );
}

export default memo(Menu);
