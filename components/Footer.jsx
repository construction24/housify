import Link from 'next/link';

const Footer = ({className}) => {
  return (
    <div className={`container w-full py-10 ${className} border`}>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="\logo.ico" className="h-8 rounded-2xl" alt="Keshav Builders Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Keshav Builders</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 ">
            <li>
              <Link href="#">
                <span className="hover:underline me-4 md:me-6">About</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="hover:underline me-4 md:me-6">Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="hover:underline me-4 md:me-6">Licensing</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="hover:underline">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="my-6  sm:mx-auto  lg:my-8 border" />
        <span className="block text-sm  sm:text-center ">
          © 2024 
          <Link href="#">
            <span className="hover:underline"> Keshav Builders™</span>
          </Link>. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
