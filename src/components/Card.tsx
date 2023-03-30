import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import { BackgroundImg, MinImageProps } from './Img';
import styles from '../assets/stylesheets/card.module.scss';

export type CardProps = HTMLAttributes<HTMLElement> & { backgroundImg?: string };
export type CardBodyProps = HTMLAttributes<HTMLDivElement> & { scrollable?: boolean };
export type CardMediaProps = HTMLAttributes<HTMLDivElement> & MinImageProps;

export const cardStyles = styles;

export function CardMedia(props: CardMediaProps) {
  const { className: classNameProp, src, alt, ...otherProps } = props;
  const className = classNames(styles.media, classNameProp);

  return (
    <div {...otherProps} className={className}>
      <BackgroundImg src={src} alt={alt} title={alt} />
    </div>
  );
}

export function CardBody(props: CardBodyProps) {
  const { className: classNameProp, scrollable, ...otherProps } = props;
  const className = classNames(styles.body, scrollable && styles.scrollable, classNameProp);
  return <div {...otherProps} className={className} />;
}

function Card(props: CardProps) {
  const {
    children,
    className: classNameProp,
    style: styleProp = {},
    backgroundImg,
    ...otherProps
  } = props;

  const className = classNames(styles.card, classNameProp);
  const style =
    backgroundImg !== undefined
      ? { ...styleProp, '--card-bg': `url(${backgroundImg})` }
      : styleProp;

  return (
    <article {...otherProps} className={className} style={style}>
      {children}
    </article>
  );
}

export default Card;
