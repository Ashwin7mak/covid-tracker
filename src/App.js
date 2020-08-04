import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import numeral from "numeral";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import InfoTable from "./components/InfoTable";
import "leaflet/dist/leaflet.css";
import './styles/App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const sortHelper = (items) => {
    return items.sort((a, b) => a.cases > b.cases ? -1 : 1);
  }

  const formatStat = (stat) => {
    return stat ? `+${numeral(stat).format("0,0a")}` : "+0";
  }

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      });
  }, [])

  useEffect(() => {
    // disease.sh api call
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((e) => (
            {
              name: e.country,
              value: e.countryInfo.iso2
            }
          ));
          let sortedData = sortHelper(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountries();
  }, [])

  /* onChange on dropdown */
  const onCountryChange = async (e) => {
    const selectCountry = e.target.value;

    const url = selectCountry === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${selectCountry}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {  
        setCountry(selectCountry);
        setCountryInfo(data);      
        if (data && data.countryInfo && data.countryInfo.lat) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(3); 
        } else {
          console.log("Noooo", mapCenter, mapZoom);
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(3);
        }
      });
  }

  return (
    <div className="app">

      <div className="app__left">
        {/* Header with Title + select dropdown */}
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>

        {/* Info Box component with 3 info boxes */}
        <div className="app__stats">
          <InfoBox 
            isRed
            title="Coronavirus Cases" 
            onClick={(e) => setCasesType('cases')}
            active={casesType === "cases"}
            cases={formatStat(countryInfo.todayCases)} 
            total={formatStat(countryInfo.cases)} 
          />

          <InfoBox 
            title="Recovered Cases" 
            onClick={(e) => setCasesType('recovered')}
            active={casesType === "recovered"}
            cases={formatStat(countryInfo.todayRecovered)} 
            total={formatStat(countryInfo.recovered)} 
          />

          <InfoBox 
            isRed
            title="Deaths" 
            onClick={(e) => setCasesType('deaths')}
            active={casesType === "deaths"}
            cases={formatStat(countryInfo.todayDeaths)} 
            total={formatStat(countryInfo.deaths)} 
          />
        </div>

        {/* Map component*/}
        <div className="app__map">
          <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
        </div>
      </div>
      
      {/* Table component with countries and cases*/}
      <Card className="app__right">
        <CardContent>
          <h2 className="table__header">Live Cases by Country</h2>
          <InfoTable countries={tableData} />
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
