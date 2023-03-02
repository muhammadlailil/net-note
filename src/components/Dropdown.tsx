import { Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
interface props {
     children : JSX.Element
}
export default function Dropdown(props:props) {
     const [open, setOpen] = useState(false);
     const toggleOpen = () => {
          setOpen(() => !open);
     };

     return (
          <div className="absolute inline-block text-left right-5 top-5">
               <div>
                    <button
                         onClick={toggleOpen}
                         type="button"
                         className="">
                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.16667 8.33334C3.25 8.33334 2.5 9.08334 2.5 10C2.5 10.9167 3.25 11.6667 4.16667 11.6667C5.08333 11.6667 5.83333 10.9167 5.83333 10C5.83333 9.08334 5.08333 8.33334 4.16667 8.33334Z" fill="#333333" />
                              <path d="M15.8333 8.33334C14.9166 8.33334 14.1666 9.08334 14.1666 10C14.1666 10.9167 14.9166 11.6667 15.8333 11.6667C16.75 11.6667 17.5 10.9167 17.5 10C17.5 9.08334 16.75 8.33334 15.8333 8.33334Z" fill="#333333" />
                              <path d="M10 8.33334C9.08337 8.33334 8.33337 9.08334 8.33337 10C8.33337 10.9167 9.08337 11.6667 10 11.6667C10.9167 11.6667 11.6667 10.9167 11.6667 10C11.6667 9.08334 10.9167 8.33334 10 8.33334Z" fill="#333333" />
                         </svg>
                    </button>
               </div>

               <Transition
                    as={Fragment}
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
               >
                    <div 
                         onClick={() => setOpen(false)}
                         className="absolute right-0 z-10 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-[#FAFAFA] ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                         <div className="py-1" role="none">
                              {props.children}
                         </div>
                    </div>
               </Transition>
          </div>

     )
}