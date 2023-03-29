import { HTMLProps } from 'react';
import classNames from 'classnames';
import styles from '../assets/stylesheets/image.module.scss';

export type BackgroundImageProps = Omit<ImageProps, 'background'>;
export interface ImageProps extends HTMLProps<HTMLImageElement> {
  alt: string;
  background?: boolean;
}

export const imgStyles = styles;

function Img(props: ImageProps) {
  const { className: classNameProp, background = false, ...otherProps } = props;
  const className = classNames(styles.image, background && styles.background, classNameProp);
  return <img {...otherProps} className={className} loading="lazy" />;
}

export const BackgroundImg = (props: BackgroundImageProps) => <Img {...props} background />;
export default Img;
