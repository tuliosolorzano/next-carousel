import Link from 'next/link';
import { IconChevronRight } from '@/app/components-icons';
import { IconArrowRight } from '@/app/components-icons';
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
  return (
    <Link className={className} href={to} target={target}>
      {children}
      <div className='iconWrapper'>
        <IconChevronRight />
        <IconArrowRight />
      </div>
    </Link>
  );
};
export default ButtonLink;
