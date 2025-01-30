import Logo from "./helperComp/Logo";

export function FooterCom() {
  return (
    <div  className="border-y-4 border-indigo-400 my-0 p-3 flex justify-center items-center  flex-col">
        <div className="mb-4">
          <Logo />
        </div>

          <h1>by: <span className="text-indigo-500 dark:text-indigo-400">Hammad Rasheed</span></h1>
      </div>
  );
}
