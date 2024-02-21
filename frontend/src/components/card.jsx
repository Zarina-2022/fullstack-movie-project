import React from "react";
import {Link} from 'react-router-dom'

const Card = ({ item, index }) => {
  return (
    <Link to={`/movie/${item.id}`} className="cursor-pointer flex flex-col items-center">
      <div className="relative ">
        {/**Database te image yok ise rastgele resim (sayfa her yenilendiginde yeni resin olacak) koyabiliriz:
         * Lorem picsum arattir googlda - istedogon resimlerin url kopyala.
         */}
        <img 
        className="rounded-md"
        src={`https://picsum.photos/200/300?grayscale${index}`} alt="poster" />
        <span className="left-[10px] bottom-[-10px] p-1 rounded-full text-white" 
              style={{ background: item.rating > 8 
                ? 'green'  
                : item.rating > 6 
                ? 'orange'
                : 'red'}}>{item.rating}</span>
      </div>
      <div>
        <h3 className="mt-4 font-bold">{item.title}</h3>
        <p className="text-gray-400 flex gap-2">
        <span>{item.year}</span>
        <span>{item.genre}</span>
        </p>
      </div>
    </Link>
  );
};

export default Card;
