import React from "react";
import "./CustomCss.css";
export default function CustomCss() {
  return (
    <div className="container mt-1">
      <article className="bg-gray-500 p-5 shadow-lg">
        <p className="text-4xl text-white">Mobile First</p>
        <p className="content">
          By default, Tailwind uses a mobile first breakpoint system, similar to
          what you might be used to in other frameworks like Bootstrap. What
          this means is that unprefixed utilities (like uppercase) take effect
          on all screen sizes, while prefixed utilities (like md:uppercase) only
          take effect at the specified breakpoint and above.
        </p>

        <button className="p-5 animation-scale">
            Hover me
        </button>
      </article>
    </div>
  );
}
