import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';
import styles from '../assets/stylesheets/form-controls.module.scss';

export type SelectOption = { value: string; text: string };
export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  placeholder?: string;
  value?: string;
}

const Select = forwardRef((props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const {
    children,
    className: classNameProp,
    placeholder = 'Select one',
    value,
    ...otherProps
  } = props;

  const className = classNames(styles.select, classNameProp);
  const defaultValue = value === undefined ? '' : undefined;

  return (
    <select
      {...otherProps}
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={className}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );
});

export default Select;
