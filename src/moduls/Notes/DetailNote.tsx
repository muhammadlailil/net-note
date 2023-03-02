import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";

interface props {
     open: boolean,
     close: Function,
     detail: any
}
export default function DetailNote(props: props) {
     const buildDescription = (msg: any) => {
          msg = msg.replace(/\n/g, " <br/>")
          msg = msg.split(" ");
          msg = msg.map((text: any) => {
               if (text.includes("http://") || text.includes("https://")) {
                    return `<a href="${text}" class="text-primary underline" target="_blank">${text}</a>`;
               }
               return text;
          });
          return msg.join(" ")
     }

     return (
          <>
               <Transition show={props.open} as={Fragment} leave="duration-200">
                    <Dialog
                         as="div"
                         id="modal"
                         className="fixed inset-0 flex  overflow-y-auto px-4 py-6 sm:px-0 justify-center z-50 transform transition-all"
                         onClose={() => props.close()}
                    >
                         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                         <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                         >
                              <div className="fixed inset-0 overflow-y-auto">
                                   <div className="flex min-h-full items-center justify-center p-4">
                                        <Dialog.Panel
                                             className="mb-6 bg-white overflow-hidden rounded-lg shadow-xl transform transition-all w-full sm:w-1/4 md:w-full  sm:max-w-lg "
                                        >
                                             <>
                                                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                                                       <p className="font-inter-bold text-black text-description mb-4">
                                                            {props.detail.title}
                                                       </p>
                                                       <p
                                                            dangerouslySetInnerHTML={{ __html: buildDescription(props.detail.description) }}
                                                            className="text-caption text-dark-grey break-words">
                                                       </p>
                                                  </div>
                                                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                       <button type="button"
                                                            onClick={() => props.close()}
                                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                            Close
                                                       </button>
                                                  </div>
                                             </>
                                        </Dialog.Panel>
                                   </div>
                              </div>
                         </Transition.Child>
                    </Dialog>
               </Transition>
          </>
     )
}