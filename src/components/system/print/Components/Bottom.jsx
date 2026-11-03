import react from "react";
import DoctorData from "../../../../data/config/prescription.json";
import siteinfo from "../../../../data/setting/siteDetels.json";
import { FaFacebookSquare } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";



export default function Bottom() {
    return (
        <>
            <div className="" >
                <div className="segestBox flex beet w100">
                    <div className="t16">
                        <ul>
                            {(DoctorData?.detels?.idaya || []).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            <li className="flex medel " style={{color:"#000"}}> 
                                 <FaFacebookSquare /> arif.hassanat
                            </li>
                            <li className="flex medel " style={{color:"#000"}}>
                                <IoEarthOutline /> www.recent.dental.ndsql.top
                            </li>
                        </ul>
                       

                    </div>
                    <div>
                        <div className="flex">
                            চেম্বার :
                        </div>
                        <b>রিসেন্ট ডেন্টাল সার্জারী এন্ড ডেন্টাল এক্সরে</b>
                        <address className="t16">আতাইকুলা মাস্টার প্লাজা ২য় তলা , আতাইকুলা বাজার , পাবনা</address>
                        <em className="t16">শনিবার থেকে বৃহস্পতিবার সকাল ৮টা থেকে বিকেল ৩টা পর্যন্ত।</em>
                        <br />
                        <b>চেম্বার ২ - রুবিয়া ফয়েজ ডায়াবেটিক ও জেনারেল হাসপাতাল (ক্লিনিক)</b>
                        <address className="t16">সাঁথিয়া অডিটরিয়ামের সামনে, সাঁথিয়া, পাবনা।</address>
                        <em className="t16">
                            শনিবার থেকে বৃহস্পতিবার বিকেল ৩টা থেকে রাত ৯ টা পর্যন্ত ও শুক্রবার সকাল ৯ টা থেকে সন্ধ্যা ৬টা পর্যন্ত।
                        </em>
                    </div>
                </div>
                <div className="bottomSystem t16 w100">
                    {DoctorData.bottomtext}
                </div>
            </div>
        </>
    )
}