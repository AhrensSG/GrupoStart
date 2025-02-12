"use client";

import Footer from "@/components/footer/Footer";
import FirstSection from "@/components/home/FirstSection";
import FourthSection from "@/components/home/FourthSection";
import SecondSection from "@/components/home/SecondSection";
import ThirdSection from "@/components/home/ThirdSection";
import InfoViewMore from "@/components/home/auxiliarEstaticComp/InfoViewMore";
import Chat from "@/components/chat/Chat";
import { Context } from "./context/GlobalContext";
import { useContext } from "react";
import Loading from "@/components/loading/Loading";

export default function Home() {
    const { state, dispatch } = useContext(Context);
    // if (!state.user) {
    //     return <Loading />;
    // }
    return (
        <main id="home" className="h-full w-full flex flex-col justify-center items-center">
            <Chat className="absolute top-0 right-0" />
            <div className="w-full">
                <FirstSection className="w-full mb-4 md:mb-6 md:relative md:pb-auto lg:mb-8 xl:mb-10 xxl:mb-12" />
                <SecondSection className="mb-4 md:mb-6 lg:mb-8 xl:mb-10" />
                <ThirdSection className="mb-4 md:mb-6 lg:mb-8 xl:mb-10" />
                <FourthSection className="mb-4 md:mb-6 lg:mb-8 xl:mb-10" />
                <InfoViewMore className="mb-4 md:mb-6 lg:mb-8 xl:mb-10" />
            </div>
            <Footer className="relative bottom-0 left-0 w-full" />
        </main>
    );
}
