import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#00FF00",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    }
};

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") => 
    data.map((country, index) => {
        return (
            <Circle
                key={index}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={caseTypeColors[casesType].hex}
                fillColor={caseTypeColors[casesType].hex}
                radius={
                    Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
                }
            >
                <Popup>
                    <div className="info-container">
                        <div 
                            className="info-flag"
                            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                        />
                        <div className="info-name">{country.country}</div>
                        <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                        <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                        <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
        )
    });

