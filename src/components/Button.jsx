const colors = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  gray: "bg-gray-400"
};


export function Button({onClick, name, color}){
    return (
        <button onClick={onClick} className={`${colors[color]} py-1 px-2 cursor-pointer`} >{name}</button>
    )
}