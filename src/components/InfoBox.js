import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../styles/InfoBox.css";

function InfoBox({ title, cases, total, ...props}) {
    return (
        <Card className={` infoBox ${props.active && "infoBox--selected"} ${props.isRed && "infoBox--red"} `} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

                <h2 className={ `infoBox__cases ${!props.isRed && "infoBox__cases--green"}` }>{cases}</h2>
                
                <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    ) 
}

export default InfoBox;