import Courses from "@/components/courses/Courses";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import { Toaster } from 'sonner'

const CoursesPage = () => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <Toaster
        richColors
        visibleToasts={3}
        duration={5000}
        position="bottom-right"
        expand={false}
      />
      <div className="w-full relative flex flex-col justify-center items-center">
        <NavBar />
        <div className="bg-[url('/courses.svg')] w-full h-[480px] absolute top-0 bg-cover bg-top"/>
        <section className="w-full flex flex-row justify-center items-center">
          <Courses/>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default CoursesPage;
