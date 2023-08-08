import {
  TbBrandFacebook,
  TbBrandLinkedin,
  TbBrandGithub,
} from "react-icons/tb";
const BaseFooter = () => {
  return (
    <footer className="border-t-2">
      <div className="container py-10 flex items-center justify-between">
        <p>copyright c Ashfaq naseem</p>
        <ul className="flex items-center justify-center gap-3">
          <li className="shadow-md rounded-full">
            <a
              href="#"
              className="rounded-full bg-white p-3 flex items-center justify-center">
              <TbBrandGithub className="w-6 h-6" />
            </a>
          </li>
          <li className="shadow-md rounded-full">
            <a
              href="#"
              className="rounded-full bg-white p-3 flex items-center justify-center">
              <TbBrandFacebook className="w-6 h-6" />
            </a>
          </li>
          <li className="shadow-md rounded-full">
            <a
              href="#"
              className="rounded-full bg-white p-3 flex items-center justify-center">
              <TbBrandLinkedin className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default BaseFooter;
