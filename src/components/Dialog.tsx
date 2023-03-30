import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { mount } from '../utilities/show';
import useEventListener from '../hooks/useEventListener';

import styles from '../assets/stylesheets/dialog.module.scss';

type ElementProps = HTMLAttributes<HTMLDialogElement>;
export type DialogProps = ElementProps & { open: boolean; onClose: () => void };

function Dialog(props: DialogProps) {
  const [show, setShow] = useState<boolean>(false);
  const [shouldMount, setShouldMount] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { children, className: classNameProp, open, onClose, ...otherProps } = props;
  const className = classNames(styles.dialog, classNameProp);

  useEventListener('close', () => onClose?.(), ref.current!);

  useEffect(() => {
    if (show && !ref.current?.hasAttribute('open')) ref.current?.showModal();
    else ref.current?.close();
  }, [show]);

  useEffect(() => {
    if (open && !shouldMount) setShouldMount(true);
    else if (open && !show) setShow(true);
    else if (!open && show) setShow(false);
    else if (!open && shouldMount) setShouldMount(false);
  }, [open, show, shouldMount]);

  return mount(
    shouldMount,
    createPortal(
      <dialog {...otherProps} ref={ref} role="dialog" className={className} aria-modal={true}>
        {children}
      </dialog>,
      document.getElementById('portal')!
    )
  );
}

export default Dialog;
