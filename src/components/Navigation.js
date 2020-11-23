import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import PatientDetails from './PatientDetails';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function Navigation() {
    const [patientList, setPatientList] = useState([]);
    useEffect(() => {
        axios.get('https://profile-management-a742b.firebaseio.com/patients.json').then((res) => {
            let data = [];
            for (const key in res.data) {
                data = [...data, ...res.data[key]];
            }
            setPatientList(data);
            console.info(data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const onFileUpload = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = e => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setPatientList([...patientList, ...d]);
            console.log([...patientList, ...d]);
            axios.post('https://profile-management-a742b.firebaseio.com/patients.json', d).then((res) => {
                alert('File uploaded successfully');
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        })
    };

    return (<Fragment>
        <Router>
            <Switch>
                {patientList && <Route path='/' exact component={() => <Fragment><input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={e => onFileUpload(e.target.files[0])} /><Home patientList={patientList} /></Fragment>}></Route>}
                {patientList && <Route path='/patients/:id' exact component={() => <PatientDetails patientList={patientList} />}></Route>}
            </Switch>
        </Router>
    </Fragment>);
};