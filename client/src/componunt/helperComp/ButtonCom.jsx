export default function ButtonCom({ text }) {
  return (
    <button className="bg-indigo-500 p-2 text-white rounded-lg text-sm hover:bg-indigo-700 w-full">
      {text}
    </button>
  );
}
