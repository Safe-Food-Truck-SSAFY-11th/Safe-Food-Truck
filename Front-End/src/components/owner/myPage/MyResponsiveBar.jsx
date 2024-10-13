import styles from "./MyResponsiveBar.module.css";
import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data /* see data tab */ }) => {
  const chartData = data.map((item) => ({
    storeType: item.storeType,
    surveyCount: item.surveyCount,
    surveyCountColor: "hsl(217, 70%, 50%)", // Customize color as needed
  }));

  return (
    <ResponsiveBar
      data={chartData}
      keys={["surveyCount"]}
      indexBy="storeType"
      margin={{ top: 50, right: 30, bottom: 10, left: 73 }}
      padding={0.2}
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "pastel1" }}
      colorBy="indexValue"
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 0,
        tickPadding: 2,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in storeType: " + e.indexValue
      }
      tooltip={({ id, value, color, formattedValue, index, indexValue }) => (
        <div
          style={{
            padding: 12,
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          <strong
            style={{
              color: "black",
            }}
          >
            {indexValue} : {value}
          </strong>
        </div>
      )}
    />
  );
};

export default MyResponsiveBar;
