import Head from "next/head";
import Header from "./Header";

interface props {
      title: string;
      createNew: Function
      children: JSX.Element;
}

export default function Layout(props: props) {
      return (
            <>
                  <Head>
                        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📑</text></svg>" />
                        <title>{props.title}</title>
                  </Head>
                  <Header createNew={() => props.createNew()} />
                  <div className="container mx-auto px-7 py-12">
                        {props.children}
                  </div>
            </>
      );
}