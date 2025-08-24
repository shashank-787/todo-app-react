const colors = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  gray: "bg-gray-400"
};


export function Button({onClick, name, color}){
    return (
        <button onClick={onClick} className={`${colors[color]} px-1 cursor-pointer`} >{name}</button>
    )
}