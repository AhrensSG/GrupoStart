"use client"
import React from "react";
import Link from "next/link"
import {useState} from "react";


const images = [
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=1",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=2",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=3",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=4",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=5",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=6",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=7",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=8",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=9",
    "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=10"
]

const Carrousel = () =>  {
    const [fiveImage, setfiveImage]= useState(0);
    const goPreview = () => {
        setfiveImage((preIndex)=> preIndex === 0? images.length - 5 : preIndex - 1);
    }
    const goNext = () => {
        setfiveImage((preIndex)=> preIndex === images.length -5? 0 : preIndex + 1);
    }
    const vistaImage = images.slice(fiveImage, fiveImage + 5);

    return (
        <div className="relative w-full h-fit justify-center">
        <button onClick={goPreview} className="absolute top-1/2 left-16 transform -translate-y-1/2 text-[#FB8A00] bg-transparent focus:outline-none focus:ring-gray-300 font-extrabold md:text-[100px] px-6 py-4.5">
        &#10094;
        </button>
        <div className="flex gap-3 overflow-x-auto items-center justify-center" >
            {
                vistaImage.map((image, index) => (
                    <div key={index} className="w-48 h-48">
                            <img src={image} alt={`Slide${fiveImage+ index + 1}`} className="w-full h-full object-cover rounded-md" />

                    </div>
                ))
            }
        </div>
        <button onClick={goNext} className="absolute top-1/2 right-16 transform -translate-y-1/2 text-[#FB8A00] bg-transparent focus:outline-none focus:ring-gray-300 font-extrabold md:text-[100px] px-6 py-4.5">
            &#10095;
        </button>
        </div>
    );
}

export default Carrousel;