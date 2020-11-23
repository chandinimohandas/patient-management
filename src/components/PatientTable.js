import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

export default function PatientTable({ patientList }) {
    const history = useHistory();

    const onRowClick = (event, id) => {
        history.push(
            {
                pathname: `/patients/${id}`
            }
        );
    }
    return (
        <Fragment>
            {patientList && <table className="table container">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {patientList.map((entry, index) => {
                        return <tr key={index} onClick={(event) => onRowClick(event, index)}>
                            <td>{entry.firstName}</td>
                            <td>{entry.lastName}</td>
                            <td>{entry.gender}</td>
                            <td>{entry.age}</td>
                            <td>{entry.phone}</td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </Fragment>
    );
}
