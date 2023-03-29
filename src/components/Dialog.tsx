import { HTMLAttributes, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import useEventListener from '../hooks/useEventListener';

import styles from '../assets/stylesheets/dialog.module.scss';

type ElementProps = HTMLAttributes<HTMLDialogElement>;
export type DialogProps = ElementProps & { open: boolean; onClose: () => void };

function Dialog(props: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const { children, className: classNameProp, open, onClose, ...otherProps } = props;
  const className = classNames(styles.dialog, classNameProp);

  useEventListener('close', () => onClose?.(), ref.current!);

  useEffect(() => {
    if (open && !ref.current?.hasAttribute('open')) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  return createPortal(
    <dialog {...otherProps} ref={ref} role="dialog" className={className} aria-modal={true}>
      {children}
    </dialog>,
    document.getElementById('portal')!
  );
}

export default Dialog;
