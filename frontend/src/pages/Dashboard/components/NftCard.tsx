import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface NftCardProps {
  id: number;
  name: string;
  quantity: number;
  imageUrl: string;
}

function NftCard(props: NftCardProps) {
  return (
    <div className="flex flex-col w-56 overflow-hidden h-max rounded-lg bg-foreground gap-y-4 items-center pb-4">
      <img
        src={props.imageUrl}
        alt={`${props.id} ${props.name} NFT Card`}
        className="aspect-square w-full object-cover bg-primary bg-opacity-20 border-b-2 border-primary"
      />
      <p className="truncate font-mono text-2xl font-thin tracking-tight"> {props.name} </p>
      <p className="text-front font-light text-opacity-70"> Supply : <span className="text-primary text-opacity-80"> {props.quantity} </span> </p>
      <Link to={`/nft/${props.id}`} className="flex items-center gap-x-2 btn-3 py-2 px-4">
        View
        <span className="material-icons">&#xe89e;</span>
      </Link>
    </div>
  );
}

// function NftCard(props: NftCardProps) {
//   return (
//     <div className="w-56 p-4 rounded-2xl relative bg-foreground border border-primary overflow-hidden">
//       <div className="border-2 borders-front relative z-[1] rounded-inherit aspect-[4/5] ">
//         <img
//           src={props.imageUrl}
//           alt={`${props.id} ${props.name} NFT Card`}
//           className="h-full w-full object-center object-cover rounded-t-xl"
//         />
//         <div className="py-2 px-3 border-t-2 border-front">
//           <p className="text-2xl font-semibold truncate">
//             {props.name.toUpperCase()}
//           </p>
//           <p className="text-front text-opacity-60 text-sm">
//             Supply :{" "}
//             <span className="text-base text-primary text-opacity-80">
//               {" "}
//               {props.quantity}{" "}
//             </span>{" "}
//           </p>
//         </div>
//       </div>
//       <div className="absolute bottom-0 right-0 w-full h-full blur-3xl bg-gradient-to-tl from-primary to-transparent opacity-30"></div>
//     </div>
//   );
// }

export default NftCard;
