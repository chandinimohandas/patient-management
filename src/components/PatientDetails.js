import { useParams, useHistory } from 'react-router-dom';
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 'fit-content',
        padding: '1rem',
        margin: '5rem auto',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function PatientDetails({ patientList }) {
    const classes = useStyles();
    const { id, } = useParams();
    const history = useHistory();

    const goBackHome = () => {
        history.goBack();
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Patient Details
                </Typography>
                {patientList[id] ? <Fragment>
                    <Typography variant="h5" component="h2">{`First Name : ${patientList[id].firstName}`}</Typography>
                    <Typography variant="h5" component="h2">{`Last Name : ${patientList[id].lastName}`}</Typography>
                    <Typography variant="h5" component="h2">{`Gender : ${patientList[id].gender}`}</Typography>
                    <Typography variant="h5" component="h2">{`Age : ${patientList[id].age}`}</Typography>
                    <Typography variant="h5" component="h2">{`Phone : ${patientList[id].phone}`}</Typography>
                </Fragment>
                    : <Typography className={classes.pos} color="textSecondary">
                        Not found...
              </Typography>}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={goBackHome}>Go Back</Button>
            </CardActions>
        </Card>
    );
}
