import { Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function PatientDetails({ patientList }) {
    const { id, } = useParams();
    const history = useHistory();

    const goBackHome = () => {
        history.goBack();
    }
    return (<Fragment>
        {patientList[id] ? <div><h1>Patient Details</h1>
            {Object.entries(patientList[id]).map(([key, value], index) => { return (<h3 key={index}>{`${key} : ${value}`}</h3>) })}
            <button onClick={goBackHome}>Go back</button></div> : <p>Patient Details not found...</p>}
    </Fragment>);
};