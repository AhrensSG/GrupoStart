"use client";
import React from "react";
import NavBarV2 from "@/components/navbar/NavBarV2";

const JotFormPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "white" }}>
            <NavBarV2 />
            <div style={{ flex: 1, width: "100%", border: "none", margin: 0, padding: 0, overflow: "hidden" }}>
                <iframe
                    id="JotFormIFrame-260224598305053"
                    title="Formulario GrupoStart"
                    src="https://form.jotform.com/260224598305053"
                    style={{
                        width: "100%",
                        height: "100vh",
                        minHeight: "800px",
                        border: "none",
                    }}
                    scrolling="yes"
                ></iframe>
            </div>
        </div>
    );
};

export default JotFormPage;
