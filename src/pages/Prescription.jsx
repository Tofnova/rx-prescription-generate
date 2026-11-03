import React, { useEffect, useState } from "react";
import PresentAbbPrepction from "../components/prepction/PresentAbbPrepction";
import MedicineAddPrepction from "../components/prepction/medicineAddPrepction";
import CcOeADVX_ray from "../components/prepction/CcOeADVX_ray";
import { brCodeID } from "../components/barcode/brCodeID";
import { todayDate } from "../scripts/todayDate";
import UiModiul from "../components/ui/UiModiul";
import MainContent from "../components/system/print/Components/MainContent";
import { CgClose } from "react-icons/cg";
import { postApi } from "../hooks/post/postApi";
import { toast } from "react-toastify";
import A4page from "../components/system/print/A4page";
import { IoMdClose } from "react-icons/io";
import Popup from "../components/popup/Popup";
import { sendWA } from "../hooks/useWhatsApp"




export default function Prescription() {
    const recordsMedicen_DB = "patient_records"
    const [medicineData, setMedicineData] = useState(null);
    const [newPatient, setNewPatient] = useState(null);
    const [prepctionAllData, setPrepctionAllData] = useState(null);
    const [on_CC_OE_ADV_XRY_Data, set_ON_CC_OE_ADV_XRY] = useState(null);
    const [barcode] = useState(brCodeID());
    const pNumber = newPatient ? newPatient.number : null;
    const pName = newPatient ? newPatient.name : null;
    const [today] = useState(todayDate())
    const [demoShow, setDemoShow] = useState(false);
    const [printOk, setPrintOk] = useState(false);
    const alldata = {
        date: today,
        rpid: barcode,
        userNumber: pNumber,
        medicineData: medicineData,
        cc_oe_avd_xry: on_CC_OE_ADV_XRY_Data,
    };
    // medicine list theke ekta row muchhe fela
    const removeMedicine = (index) =>
        setMedicineData((prev) => (prev || []).filter((_, i) => i !== index));
    const handelApppageData = () => {
        setPrepctionAllData(alldata);
        setDemoShow(true);
    }
    const handelSaveToServerData = async () => {
        if (!alldata.userNumber) {
            toast.error("Number dewa hoyni!");
            return;
        }

        postApi({
            db_name: "patient_records",
            data: alldata,
        });
        setPrintOk(true);
        setPrepctionAllData(alldata);

        try {
            const res = await sendWA({
                to: alldata.userNumber,
                name: pName,
                id: alldata.rpid,
                date: alldata.date,
            });
            res.success
                ? toast.success("Message Sent")
                : toast.error("Message pathano jayni: " + res.error);
        } catch (e) {
            toast.error("Network error: " + e.message);
        }
    };

    return (
        <UiModiul>
            {/* <div>{JSON.stringify(prepctionAllData)}</div> */}
            <div className="diman" >
                <PresentAbbPrepction onAddPatient={setNewPatient} />
                {
                    pNumber && (
                        <MedicineAddPrepction medicines={medicineData || []} onAddMedicine={setMedicineData} />
                    )
                }
            </div>
            <div className="center w100">
                <div className="uiBox">
                    <CcOeADVX_ray on_CC_OE_ADV_XRY={set_ON_CC_OE_ADV_XRY} />
                </div>
                <div className="uiBox">
                    <div>
                        {
                            medicineData && medicineData.length > 0 ? (
                                <div>
                                    <h3>Medicine List:</h3>
                                    <ol>
                                        {medicineData.map((med, index) => (
                                            <li>
                                                <div className="medinet" key={index}>
                                                    <div>
                                                        <b>
                                                            {med.medicine}
                                                        </b>
                                                    </div>

                                                    <div>
                                                        <span>
                                                            {med.timeL} --- {med.notes}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            {med.setDay}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="btn_tap" title="Delete" aria-label="Delete medicine" onClick={() => removeMedicine(index)}>
                                                            <IoMdClose /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="flex center medel">
                                        <button onClick={handelApppageData} className="btn printBtn">
                                            View Graphic
                                        </button>
                                        <button onClick={handelSaveToServerData} className="btn printBtn">
                                            Save and Print
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>No medicines added.</p>
                            )
                        }
                    </div>

                    {
                        demoShow && (
                            <Popup show={demoShow} onClose={() => setDemoShow(false)}>
                                <MainContent pageData={prepctionAllData} />
                            </Popup>
                        )
                    }
                    <Popup show={printOk} onClose={() => setPrintOk(false)}>
                        <A4page pageData={prepctionAllData} />
                    </Popup>
                </div>
            </div>

        </UiModiul>
    );
}
