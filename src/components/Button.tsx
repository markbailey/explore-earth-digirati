import {
  ButtonHTMLAttributes,
  PointerEvent,
  KeyboardEvent,
  useState,
  forwardRef,
  ForwardedRef,
} from 'react';
import classNames from 'classnames';

import styles from '../assets/stylesheets/button.module.scss';

export type ButtonProps = {
  block?: boolean;
  iconOnly?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const [isPressed, setIsPressed] = useState(false);
  const { className: classNameProp, block = false, iconOnly = false, ...otherProps } = props;

  const className = classNames(
    styles.button,
    iconOnly && styles.iconButton,
    block && styles.block,
    classNameProp
  );

  const onInteract = (event: PointerEvent | KeyboardEvent) => {
    const isPointerDown = event.type === 'pointerdown';
    const isLeftClick = (event as PointerEvent).button === 0;
    const isKeyDown = event.type === 'keydown';
    const isEnter = (event as KeyboardEvent).key === 'Enter';
    const newIsPressed = (isPointerDown && isLeftClick) || (isKeyDown && isEnter);

    setIsPressed(newIsPressed);
  };

  return (
    <button
      {...otherProps}
      ref={ref}
      className={className}
      aria-pressed={isPressed}
      onPointerDown={onInteract}
      onKeyDown={onInteract}
    />
  );
});

export default Button;
