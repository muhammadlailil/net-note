import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout/Layout";
import Confirmation from "@/components/Popup/Confirmation";
import Api from "@/libs/Api";
import DateTime from "@/libs/DateTime";
import FormProject from "@/moduls/Project/FormProject";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";



export default function Home() {
    const [id, setId] = useState<any>(null);
    const [confirmation, setConfirmation] = useState(false);
    const [projects, setProjects] = useState<any[]>([])
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(null);
    const [search, setSearch] = useState('');

    const fetchProjects = useCallback(
        async () => {
            const projects: any = await new Api('/api/projects').get({
                search
            });
            setProjects(projects)
        },
        [search]
    );

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])


    const togglePopup = () => {
        setOpen(() => !open);
    };

    const toggleConfirmation = (id: any = null) => {
        setId(id)
        setConfirmation(() => !confirmation);
    };


    const deleteProject = async (e: any) => {
        e.preventDefault()
        await new Api('/api/projects/delete').post({ id })
        toggleConfirmation()
        fetchProjects()
    }

    const editProject = (row: any) => {
        setId(row.id)
        setEdited(row)
        togglePopup()
    }


    return (
        <Layout
            title="Home"
            createNew={() => togglePopup()}
        >
            <>
                <FormProject
                    id={id}
                    open={open}
                    toggle={() => togglePopup()}
                    setId={(id: any) => setId(id)}
                    edited={edited}
                    setEdited={(row: any) => { setEdited(row) }}
                    fetch={() => fetchProjects()}
                />

                <Confirmation
                    open={confirmation}
                    close={() => toggleConfirmation()}
                    action={(e: any) => deleteProject(e)}
                >
                    <>
                        <h1>Yakin ingin menghapus?</h1>
                    </>
                </Confirmation>


                <h1 className="font-inter-bold text-sub-heading text-black">Project Note</h1>
                <p className="text-description text-dark-grey">
                    Project Note Made with ❤️ by Malfa. Wanna make new project?
                    <button
                        type="button"
                        onClick={() => togglePopup()}
                        className="ml-2 cursor-pointer text-primary underline underline-offset-2 font-inter-semi-bold">
                        Create New
                    </button>
                </p>
                <input
                    type="text"
                    onKeyUp={(e:any)=>{  if(e.key=='Enter') setSearch(e.target.value) }}
                    placeholder="Search client name, project name, company..."
                    className="border w-full focus:outline-primary py-4 px-6 text-sm rounded-full bg-[#F9F9F9] mt-7"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
                    {projects?.map(row =>
                        <div className="shadow-card border bg-white rounded-2xl group relative" key={row.id}>
                            <Link href={`/p/${row.uuid}`} className="px-5 py-6 block rounded-2xl">
                                <p className="font-inter-bold text-black text-description">{row.title}</p>
                                <span className="text-caption text-dark-grey break-words">📅 {new DateTime(row.created_at).indo()}</span>
                            </Link>
                            <div className="hidden group-hover:block">
                                <Dropdown>
                                    <>
                                        <a href="#"
                                            onClick={() => editProject(row)}
                                            className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0"
                                        >Edit</a>
                                        <a href="#"
                                            onClick={() => toggleConfirmation(row.id)}
                                            className="text-red-600 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1"
                                        >Delete</a>
                                    </>
                                </Dropdown>
                            </div>
                        </div>
                    )}
                    <div className="bg-[#f9f9f9] rounded-2xl px-6 py-7 justify-center items-center flex group cursor-pointer min-h-[95px]" onClick={() => togglePopup()}>
                        <span className="hidden group-hover:block text-primary text-description font-inter-semi-bold">+ Create New</span>
                    </div>
                </div>
            </>
        </Layout>
    )
}