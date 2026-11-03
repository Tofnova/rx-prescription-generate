# Ki ki change holo

## Notun
- `src/theme.css` : puro app er notun design (clinical teal, card, sidebar). `index.css` er A4/print css ager moto ache.
- `src/pages/Home.jsx` : notun Dashboard (stats, gender donut, age, month, weekday, top medicine, top treatment, recent records, weather, quick actions)
- `src/components/dashboard/Charts.jsx` : Stat, Bars, Donut (SVG, d3 lage na)
- `src/hooks/getjson/useClinicData.js` : dashboard er jonno 4 table ek shathe load (apnar `api.json` er API)

## Bodlano
- `src/App.js` : wallpaper bad, sidebar layout. Splash ekbar/session, click korle skip. Ager `setTimeout` render er bhitore chhilo (bug), thik kora.
- `src/components/system/Nav.jsx`, `NavApp.jsx` : notun sidebar (NavLink, active highlight, Data section e shob insert page)
- `src/components/wathear/Weather.jsx` : same logic, dashboard card e fit kora design
- `src/index.js` : `theme.css` import
- `src/pages/Insert.jsx` : tile gulo wrap hoy
- `package.json` : missing dependency add (`qrcode`, `jspdf`, `html2canvas`, `typeit`). Ager zip e import chhilo kintu list e chhilo na, clean install e build fail korto.

## Je gulo ami chhuini
Prescription form, A4 print, Users/Medicine/Record logic, API hook gulo (`useRestApi`, `postApi`, `drop`).

## Fix (Prescription delete + black background)
- `pages/Prescription.jsx` : delete button e `onClick` chhilo na. Ekhon `removeMedicine(index)` diye row muche. Table e `thead/tbody` add (React DOM warning gelo). Debug `JSON.stringify(setMedicineData)` bad.
- `components/prepction/medicineAddPrepction.jsx` : medicine list er state ager child e chhilo, parent theke delete kora jeto na (ar render er bhitore parent er setState call hocchilo). Ekhon list parent e thake, child `medicines` prop ney.
- Black background : `NUi.css` (splash) global `:root{--bg:#000}` ar `.content{text-align:center}` set kore app er style bhenge dichhilo. Amar variable `--page` ar class `.shellMain` e rename kore alada kora hoyeche.
