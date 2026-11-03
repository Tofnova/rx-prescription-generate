import React, { useEffect } from "react";

function NamazTimes() {

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://www.ummahapi.com/widget.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
   <>
       <div className="flex gap">
        <div data-ummahapi="prayer-times" data-accent="#0d5c2f" data-gold="#0d5c2f" data-bg="#000"></div>
<div data-ummahapi="hijri-date"></div>
       <div data-ummahapi="name-of-allah"></div>
       <div data-ummahapi="dua-of-day"></div>
       </div>
   </>
        

    );
};

export default NamazTimes;