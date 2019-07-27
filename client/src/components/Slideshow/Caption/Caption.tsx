import React from "react";

interface CaptionProps {
  title: string;
  subtitle: string;
}

const Caption = ({ title, subtitle }: CaptionProps) => {
  return (
    <section
      style={{
        position: "absolute",
        top: "40%",
        left: "20%",
        color: "#fff"
      }}
    >
      <h1> {title} </h1>
      <h4> {subtitle} </h4>
    </section>
  );
};

export default Caption;
