import React from "react";
import numeral from "numeral";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import '../styles/InfoTable.css';

function InfoTable({ countries }) {

    return (
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Countries</TableCell>
                            <TableCell>Cases</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.map((eachCountry, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{eachCountry.country}</TableCell>
                                    <TableCell>{numeral(eachCountry.cases).format("0,0")}</TableCell>
                                </TableRow>
                            ) 
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InfoTable
