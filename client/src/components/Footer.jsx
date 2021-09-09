import React,{useEffect,useState} from "react";

const Footer = () => {
    const [year,setYear] = useState();
    useEffect(()=>{
        const y = new Date().getFullYear();
        setYear(y);
    })
  return (
    <>
      <div className="container-fluid bg-dark p-3">
        <h3 className="text-white tex-center" >Copyright © {year}.All Rights Reserved By JM</h3>
     
      </div>
    </>
  );
};
export default Footer;
