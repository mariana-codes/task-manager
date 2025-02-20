import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <h1 className="text-3xl text-slate-100 font-bold text-center">
      {props.children}
    </h1>
  );
};

export default PageTitle;
