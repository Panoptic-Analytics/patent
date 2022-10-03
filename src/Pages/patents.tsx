import React, { useEffect, useState } from "react";
import axios from "axios";
import { PatentData } from "../Types/types";
import { organizations } from "../Utils/organizations";
import Chart from "../Components/Chart";
import getPastDate from "../Utils/getPastDate";
import "./patents.css";
import Select from "../Components/Select";

const Patents = () => {
  const [data, setData] = useState<PatentData>({} as PatentData);
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
      axios
        .get(
          `https://api.patentsview.org/patents/query?q={"_and": [{"assignee_organization":"${value}"},{"_gte":{"patent_date":"${getPastDate(
            5
          )}"}}]}&f=["patent_date","cpc_section_id"]&o={"per_page":9999999999}`
        )
        .then((response) => {
          setData(response.data);
        })
        .finally(() => setTimeout(function(){
          setIsLoading(false)
      },500) );
    }
  }, [value]);
  return (
    <div className="main-wrapper">
      {isLoading && (
        <div className="loading">
          <div className="loader" />
        </div>
      )}
      <div className="card">
      {!isLoading &&  <div className="center">
          <Select
            options={organizations.map(
              (organization) => organization.organization
            )}
            setValue={setValue}
            value={value}
          />
        </div>}
        {!isLoading && <div className="main-heading">{value}</div>}
        {!isLoading && data.count && (
          <div className="chart-container">
            <Chart data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Patents;
