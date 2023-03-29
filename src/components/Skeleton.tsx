import classNames from 'classnames';
import styles from '../assets/stylesheets/skeleton.module.scss';
import Card, { CardBody, CardBodyProps } from './Card';

export function SkeletonCard(props: CardBodyProps) {
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(styles.card, classNameProp);
  const getClassNames = (initialClassName: string) => classNames(initialClassName, styles.skeleton);

  return (
    <Card {...otherProps} className={className}>
      <div className={getClassNames(styles.image)} />
      <CardBody>
        <div className={getClassNames(styles.title)} />
        <div className={getClassNames(styles.text)} />
        <div className={getClassNames(styles.text)} />
      </CardBody>
      <div className={getClassNames(styles.button)} />
    </Card>
  );
}
