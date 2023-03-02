import NoteItem from "@/components/NoteItem";
import Confirmation from "@/components/Popup/Confirmation";
import PopupForm from "@/components/Popup/PopupForm";
import Api from "@/libs/Api";
import { useEffect, useState } from "react";

interface props {
     database: string
     uuid: string
     icon: string
     title: string
     category: string
     search: string
}
export default function Analyst(props: props) {
     const [open, setOpen] = useState(false);
     const [id, setId] = useState<any>(null);
     const [confirmation, setConfirmation] = useState(false);
     const [form, setForm] = useState({
          title: '',
          description: '',
     })
     const [notes, setNotes] = useState<any[]>([])
     const { database, category, search } = props

     useEffect(() => {
          fetchData(database, category, search)
     }, [database, category, search])

     const togglePopup = () => {
          setOpen(() => !open);
     };
     const toggleConfirmation = (id: any = null) => {
          setId(id)
          setConfirmation(() => !confirmation);
     };

     const handleFormChange = (event: any) => {
          const { name, value } = event.target;
          setForm({
               ...form,
               [name]: value,
          });
     };

     const fetchData = async (database: any, category: any, search: any) => {
          if (database) {
               const projects: any = await new Api(`/api/project-notes/${database}`).get({
                    category: category,
                    search: search
               });
               setNotes(projects)
          }
     }

     const storeUpdateProject = async (e: any) => {
          e.preventDefault()
          await new Api(`/api/project-notes/${props.database}/create`).post({
               ...form,
               id,
               tag: props.category,
               uuid: props.uuid
          });
          resetData()
     }


     const editNote = (row: any) => {
          setId(row.id)
          setForm({
               title: row.title,
               description: row.description
          })
          togglePopup()
     }


     const deleteNote = async (e: any) => {
          e.preventDefault()
          await new Api(`/api/project-notes/${props.database}/delete`).post({ id })
          toggleConfirmation()
          fetchData(database, category, search)
     }


     const resetData = () => {
          setForm({
               title: '',
               description: ''
          })
          setId(null)
          togglePopup()
          fetchData(database, category, search)
     }




     return (
          <>
               <PopupForm
                    open={open}
                    close={() => togglePopup()}
                    action={(e: any) => storeUpdateProject(e)}
               >
                    <div className="flex flex-col">
                         <div className="flex flex-col">
                              <label htmlFor="" className="text-caption text-dark-grey">Judul</label>
                              <input type="text"
                                   onChange={(e) => handleFormChange(e)}
                                   value={form.title}
                                   name="title"
                                   className="border w-full rounded-xl mt-2 focus:outline-primary text-sm font-inter-regular px-3 py-2" placeholder="Judul ..."
                              />
                         </div>
                         <div className="flex flex-col mt-4">
                              <label htmlFor="" className="text-caption text-dark-grey">Description</label>
                              <textarea
                                   value={form.description}
                                   onChange={(e) => handleFormChange(e)}
                                   name="description"
                                   className="border w-full rounded-xl mt-2 focus:outline-primary text-sm font-inter-regular px-3 py-2"
                                   placeholder="Description ..." cols={30} rows={20}>
                              </textarea>
                         </div>
                    </div>
               </PopupForm>

               <Confirmation
                    open={confirmation}
                    close={() => toggleConfirmation()}
                    action={(e: any) => deleteNote(e)}
               >
                    <>
                         <h1>Yakin ingin menghapus?</h1>
                    </>
               </Confirmation>

               <NoteItem
                    icon={props.icon}
                    title={props.title}
                    new={() => togglePopup()}
                    data={notes}
                    edit={(row: any) => editNote(row)}
                    delete={(id: any) => toggleConfirmation(id)}
               />
          </>
     )
}