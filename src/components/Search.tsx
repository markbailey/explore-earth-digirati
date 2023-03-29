import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';
import styles from '../assets/stylesheets/form-controls.module.scss';

export type SearchProps = HTMLProps<HTMLInputElement>;

const Search = forwardRef((props: SearchProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(styles.search, classNameProp);
  return (
    <input placeholder="Search" {...otherProps} ref={ref} type="search" className={className} />
  );
});

export default Search;
