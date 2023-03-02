import DetailNote from "@/moduls/Notes/DetailNote";
import { useState } from "react";
import Dropdown from "./Dropdown";

interface props {
     title: string;
     icon: string;
     new: Function
     edit: Function
     delete: Function
     data: any[]
}
export default function NoteItem(props: props) {
     const [open, setOpen] = useState(false);
     const [detail, setDetail] = useState<any>({
          title: '',
          description: ''
     })

     const buildDescription = (msg: any) => {
          msg = msg.split(" ");
          msg = msg.map((text: any) => {
               if (text.includes("http://") || text.includes("https://")) {
                    return `<a href="${text}" class="text-primary underline" target="_blank">${text}</a>`;
               }
               return text;
          });
          return msg.join(" ")
     }

     const togglePopup = () => {
          setOpen(() => !open);
     };


     const viewDetail = (row: any) => {
          setDetail({
               title: row.title,
               description: row.description
          })
          togglePopup()
     }
     return (
          <>
               <DetailNote
                    open={open}
                    close={() => togglePopup()}
                    detail={detail}
               />
               <div className="flex justify-between">
                    <h2 className="text-black font-inter-bold text-title mb-5">
                         {props.icon} {props.title}
                    </h2>
                    <button onClick={() => props.new()} className=" text-primary text-description font-inter-semi-bold underline underline-offset-1 decoration-2">
                         + Add New
                    </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {props.data?.map(row =>
                         <div
                              key={row.id}
                              className="shadow-card border bg-white rounded-2xl group relative max-h-[95px] "
                         // whitespace-nowrap overflow-hidden text-ellipsis
                         >
                              <div className="cursor-pointer px-5 py-6 block rounded-2xl" onClick={() => viewDetail(row)}>
                                   <p className="font-inter-bold text-black text-description">{row.title}</p>
                                   <span
                                        dangerouslySetInnerHTML={{ __html: buildDescription(row.description) }}
                                        className="text-caption text-dark-grey break-words block whitespace-nowrap overflow-hidden text-ellipsis"
                                   ></span>
                              </div>
                              <div className="hidden group-hover:block">
                                   <Dropdown>
                                        <>
                                             <a href="#"
                                                  onClick={() => props.edit(row)}
                                                  className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0"
                                             >Edit</a>
                                             <a href="#"
                                                  onClick={() => props.delete(row.id)}
                                                  className="text-red-600 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1"
                                             >Delete</a>
                                        </>
                                   </Dropdown>
                              </div>
                         </div>
                    )}
                    <div onClick={() => props.new()} className="bg-[#f9f9f9] rounded-2xl px-6 py-7 justify-center items-center flex group cursor-pointer min-h-[95px]">
                         <span className="hidden group-hover:block text-primary text-description font-inter-semi-bold">+ Create New</span>
                    </div>
               </div>
          </>
     )
}