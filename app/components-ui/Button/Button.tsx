const Button = ({
  children,
  id,
  type,
  disabled,
  onClick,
  className,
}: {
  children: any;
  id?: any;
  type?: any;
  disabled?: any;
  onClick?: any;
  className?: any;
}) => {
  // Base Class: button
  // Available Button Display Classes: primary, secondary, tertiary
  // Available Button Size Classes: large, medium, small
  return (
    <button
      id={id}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
