import { Fragment, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { mount } from '../utilities/show';
import Button from './Button';
import styles from '../assets/stylesheets/error-view.module.scss';

export interface ErrorViewProps extends HTMLAttributes<HTMLDivElement> {
  code?: number;
  message: ReactNode;
}

function ErrorView(props: ErrorViewProps) {
  const { className: classNameProp, code, message, ...otherProps } = props;
  const className = classNames(styles.view, classNameProp);
  const hasCode = code !== undefined;

  return (
    <div {...otherProps} className={className}>
      <div>
        {mount(
          hasCode,
          <Fragment>
            <h1>{code}</h1>
            <span>{message}</span>
          </Fragment>
        )}

        {mount(!hasCode, <h2>{message}</h2>)}
        <Button>Return to Home</Button>
      </div>
    </div>
  );
}

export default ErrorView;
