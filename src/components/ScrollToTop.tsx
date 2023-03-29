import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { ReactComponent as ArrowUpIcon } from '../assets/svg/arrow-up.svg';
import { mount } from '../utilities/show';
import useEventListener from '../hooks/useEventListener';
import Button, { ButtonProps } from './Button';
import css from '../assets/stylesheets/scroll-to-top.module.scss';

type ScrollToTopProps = ButtonProps & {
  offset: number;
};

function ScrollToTop(props: ScrollToTopProps) {
  const [shouldMount, setShouldMount] = useState(false);
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { offset, className, ...otherProps } = props;
  const newClassName = classNames(css.root, className, show ? css.show : null);

  const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const onTransitionEnd = useCallback(
    () => (!show ? setShouldMount(false) : false),
    [show, setShouldMount]
  );

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const isScrolled = scrollTop > offset;

    if (isScrolled && !shouldMount) setShouldMount(true);
    else setShow(isScrolled);
  }, [offset, shouldMount, setShow, setShouldMount]);

  useEventListener('scroll', onScroll, window);
  useEventListener('transitionend', onTransitionEnd, buttonRef.current);

  return mount(
    shouldMount,
    createPortal(
      <Button
        ref={buttonRef}
        {...otherProps}
        className={newClassName}
        onClick={onClick}
        title="Scroll to top"
      >
        <ArrowUpIcon />
      </Button>,
      document.body
    )
  );
}

export default ScrollToTop;
