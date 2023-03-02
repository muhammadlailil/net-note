import PopupForm from "@/components/Popup/PopupForm";
import Api from "@/libs/Api";
import { useRouter } from "next/router";
import { useState } from "react";

interface props {
     id?: any
     open: boolean
     toggle: Function
     setId?: Function
     setEdited: Function
     edited: any
     fetch?: any
     redirect?: true
}
export default function FormProject(props: props) {
     const [form, setForm] = useState({
          title: '',
          description: '',
     })
     const router = useRouter()

     const handleFormChange = (event: any) => {
          const { name, value } = event.target;
          setForm({
               ...form,
               ...props.edited,
               [name]: value,
          });
          props.setEdited({
               ...form,
               ...props.edited,
               [name]: value,
          })
     };

     const storeUpdateProject = async (e: any) => {
          e.preventDefault()
          const result = await new Api('/api/projects/create').post({
               ...form,
               id: props.id || null
          });
          resetData()
          if (props.redirect && !props.id) {
               router.push(`/p/${result.uuid}`)
          } 
          props.fetch()
     }


     const resetData = () => {
          const data = {
               title: '',
               description: ''
          }
          setForm(data)
          props.setEdited(data)
          props.toggle()
          if (props.setId) props.setId(null)
     }
     const close = () => {
          props.toggle()
          resetData()
     }


     return (
          <PopupForm
               open={props.open}
               close={() => close()}
               action={(e: any) => storeUpdateProject(e)}
          >
               <div className="flex flex-col">
                    <div className="flex flex-col">
                         <label htmlFor="" className="text-caption text-dark-grey">Judul</label>
                         <input type="text"
                              onChange={(e) => handleFormChange(e)}
                              value={props.edited?.title || form.title}
                              name="title"
                              className="border rounded-xl mt-2 w-full focus:outline-primary text-sm font-inter-regular px-3 py-2" placeholder="Judul ..."
                         />
                    </div>
                    <div className="flex flex-col mt-4">
                         <label htmlFor="" className="text-caption text-dark-grey">Description</label>
                         <textarea
                              value={props.edited?.description || form.description}
                              onChange={(e) => handleFormChange(e)}
                              name="description"
                              className="border w-full rounded-xl mt-2 focus:outline-primary text-sm font-inter-regular px-3 py-2"
                              placeholder="Description ..." cols={30} rows={4}>
                         </textarea>
                    </div>
               </div>
          </PopupForm>
     )
}