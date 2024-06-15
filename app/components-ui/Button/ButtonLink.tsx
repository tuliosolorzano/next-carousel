import Link from 'next/link';
const ButtonLink = ({
  children,
  className,
  target,
  to,
}: {
  children: any;
  className: any;
  target: any;
  to: any;
}) => {
  // Base Class: button
  // Available Button Display Classes: primary, secondary, tertiary
  // Available Button Size Classes: large, medium, small
  return (
    <Link className={className} href={to} target={target}>
      {children}
    </Link>
  );
};
export default ButtonLink;
