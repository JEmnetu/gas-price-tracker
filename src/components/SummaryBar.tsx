interface SummaryBarPropType {
  nationalAvg: number | null;
  weeklyDelta: number | null;
  highestRegion: string;
  lowestRegion: string;
}

const SummaryBar = ({
  nationalAvg,
  weeklyDelta,
  highestRegion,
  lowestRegion,
}: SummaryBarPropType) => {
  const weekOverWeek = weeklyDelta != null ? Math.sign(weeklyDelta) : null;

  return (
    <div
      style={{
        backgroundColor: "teal",
        width: "100vw",
        textAlign: "center",
        color: "white",
        padding: "1em",
      }}
    >
      <div>National Average: {nationalAvg?.toFixed(2)}</div>
      <div>
        Week over Week Change:
        {weekOverWeek === 1 ? "(^)" : weekOverWeek === -1 ? "(v)" : "(-)"}
        {weeklyDelta?.toFixed(3)}
      </div>
      <div>Highest Region: {highestRegion}</div>
      <div>Lowest Region: {lowestRegion}</div>
    </div>
  );
};

export default SummaryBar;
