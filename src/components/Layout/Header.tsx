interface props{
    createNew : Function
}
export default function Header(props:props) {
    return (
        <div className="bg-primary h-[53px] flex items-center justify-center text-center text-white sticky top-0 z-10">
            <h1>
                Made with ❤️ by Malfa. Wanna make new project?
                <button type="button" onClick={()=>props.createNew()} className="font-inter-semi-bold ml-2 underline underline-offset-4 decoration-2 cursor-pointer">Create New </button>
            </h1>
        </div>
    );
}