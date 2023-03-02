import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";

interface props {
     open: boolean,
     close: Function,
     action: Function
     children: JSX.Element
}
export default function PopupForm(props: props) {
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
                                             className="mb-6 bg-white overflow-hidden rounded-lg shadow-xl transform transition-all w-1/4 sm:w-full sm:max-w-lg "
                                        >
                                             <>
                                                  <form action="" method="post" onSubmit={(e) => props.action(e)}>
                                                       <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            {props.children}
                                                       </div>
                                                       <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button type="submit"
                                                                 className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm  focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                                                 Save
                                                            </button>
                                                            <button type="button"
                                                                 onClick={() => props.close()}
                                                                 className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                                 Cancel
                                                            </button>
                                                       </div>
                                                  </form>
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