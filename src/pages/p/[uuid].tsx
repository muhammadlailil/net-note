import Layout from "@/components/Layout/Layout";
import Api from "@/libs/Api";
import BoxNote from "@/moduls/Notes/BoxNote";
import FormProject from "@/moduls/Project/FormProject";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Detail() {
     const router = useRouter()
     const [project, setProject] = useState<any>(null)
     const { uuid } = router.query
     const [search, setSearch] = useState('');
     const [open, setOpen] = useState(false);
     const [edited, setEdited] = useState<any>(null);
     const [id, setId] = useState<any>(null);


     const fetchProjects = useCallback(
          async () => {
               if (uuid) {
                    const project: any = await new Api('/api/projects/detail').get({
                         uuid: uuid
                    });
                    setProject(project)
               }
          },
          [uuid]
     );

     useEffect(() => {
          fetchProjects()
     }, [fetchProjects])

     const togglePopup = () => {
          setOpen(() => !open);
     };

     const editProject = () => {
          togglePopup()
          setId(project?.id)
          setEdited({
               title: project?.title,
               description: project?.description,
          })
     }


     return (
          <Layout
               title="Detail"
               createNew={() => togglePopup()}
          >
               {(project) ? <>
                    <FormProject
                         id={id}
                         open={open}
                         toggle={() => togglePopup()}
                         setId={(id: any) => setId(id)}
                         edited={edited}
                         setEdited={(row: any) => { setEdited(row) }}
                         fetch={() => fetchProjects()}
                         redirect={true}
                    />

                    <div className="flex items-center">
                         <h1 className="font-inter-bold text-sub-heading text-black">
                              {project?.title}
                         </h1>
                         <button onClick={() => editProject()} type="button" className="ml-3 text-primary underline text-description font-inter-semi-bold">Edit</button>
                    </div>
                    <p className="text-description text-dark-grey">
                         {project?.description}
                    </p>
                    <input
                         type="text"
                         onKeyUp={(e) => { if (e.key == 'Enter') setSearch(e.target.value) }}
                         placeholder="Search note name ..."
                         className="border w-full focus:outline-primary py-4 px-6 text-sm rounded-full bg-[#F9F9F9] mt-7"
                    />
                    <div className="mt-7"></div>

                    <BoxNote
                         uuid={project?.uuid}
                         database={project?.database}
                         icon="📂"
                         title="Analyst"
                         category="analyst"
                         search={search}
                    />
                    <BoxNote
                         uuid={project?.uuid}
                         database={project?.database}
                         icon="🎨"
                         title="Design"
                         category="design"
                         search={search}
                    />
                    <BoxNote
                         uuid={project?.uuid}
                         database={project?.database}
                         icon="🧑‍💻"
                         title="Engineer"
                         category="engineer"
                         search={search}
                    />
                    <BoxNote
                         uuid={project?.uuid}
                         database={project?.database}
                         icon="🤖"
                         title="Tester"
                         category="terter"
                         search={search}
                    />
                    <BoxNote
                         uuid={project?.uuid}
                         database={project?.database}
                         icon="📑"
                         title="Miscellaneous"
                         category="miscellaneous"
                         search={search}
                    />

               </> : <>
                    <h1 className="font-inter-bold text-black text-sub-heading text-center">
                         404 Not Found
                    </h1>
               </>}
          </Layout>
     )
}
