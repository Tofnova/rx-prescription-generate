import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LiaFilePrescriptionSolid } from "react-icons/lia";
import { VscInsert } from "react-icons/vsc";
import { CiMemoPad } from "react-icons/ci";
import { FaUserCog, FaUsers, FaNotesMedical, FaPills, FaTags, FaListUl } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import logo from "../../assets/img/logo.jpg";
import siteData from "../../data/setting/siteDetels.json";
import { BsWhatsapp } from "react-icons/bs";


const link = (to, icon, text, end) => (
  <NavLink key={to} to={to} end={end} className="sideLink">{icon}<span>{text}</span></NavLink>
);

export default function SideNav() {
  return (
    <>
      <div className="sideBrand">
        <img src={logo} alt="logo" />
        <div><b>{siteData.siteName_en}</b><span>Clinic Admin</span></div>
      </div>

      {link("/", <AiOutlineHome />, "Dashboard", true)}
      {link("/prescription", <LiaFilePrescriptionSolid />, "Prescription")}
      {link("/wamessege", <BsWhatsapp /> , "Whatsapp Messege")}
      {link("/memo", <CiMemoPad />, "Demo")}


      <small className="sideSec">DATA</small>
      {link("/insert", <VscInsert />, "Insert hub", true)}
      {link("/insert/users", <FaUsers />, "Patients")}
      {link("/insert/records", <FaNotesMedical />, "Records")}
      {link("/insert/medicine", <FaPills />, "Medicines")}
      {link("/insert/category", <FaTags />, "Categories")}
      {link("/insert/mNotes", <FaRegCommentDots />, "Dose notes")}
      {link("/insert/typem", <FaListUl />, "Dose types")}

      <div className="sideFoot">
        <a className="sideLink" href="https://wa.me/+8801763279587"><FaUserCog /><span>Developer Need</span></a>
        <a className="sideLink" href="https://www.ndsql.top"><FaKey /><span>NdSQL API</span></a>
      </div>
    </>
  );
}
