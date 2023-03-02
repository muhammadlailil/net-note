import { Transition } from "@headlessui/react";
import { Fragment } from "react";

interface props {
     open: boolean,
     close: Function,
     action: Function
     children: JSX.Element
}
export default function Confirmation(props: props) {
     return (
          <>
               <Transition
                    as={Fragment}
                    show={props.open}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                         <div className="fixed inset-0 z-10 overflow-y-auto">
                              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                   <Transition
                                        as={Fragment}
                                        show={props.open}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                        <form action="" method="post" onSubmit={(e) => props.action(e)}>
                                             <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl w-1/4 transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                       {props.children}
                                                  </div>
                                                  <div className="bg-gray-50 px-4 py-3 flex justify-center">
                                                       <button type="button"
                                                            onClick={() => props.close()}
                                                            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm  mr-2">
                                                            Cancel
                                                       </button>
                                                       <button type="submit"
                                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm">
                                                            Yes
                                                       </button>
                                                  </div>
                                             </div>
                                        </form>
                                   </Transition>
                              </div>
                         </div>
                    </div>
               </Transition>
          </>
     )
}