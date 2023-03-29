import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './new-component.module.scss';

export interface NewComponentProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-new-components-and-templates
 */
function NewComponent(props: NewComponentProps) {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(styles.root, classNameProp);
  return (
    <div {...otherProps} className={className}>
      NewComponent
    </div>
  );
}

export default NewComponent;
