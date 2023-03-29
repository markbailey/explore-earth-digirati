import { HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from '../assets/stylesheets/header.module.scss';

function Header(props: HTMLAttributes<HTMLElement>) {
  const { children, className: classNameProp, ...otherProps } = props;
  const className = classNames(styles.header, classNameProp);

  return (
    <header {...otherProps} className={className}>
      <div className={styles.brand}>
        <span className={styles.logo}>
          {'Explore'}
          <span>Earth</span>
        </span>
      </div>

      {children}
    </header>
  );
}

export default Header;
