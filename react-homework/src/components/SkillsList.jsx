function SkillsList({ skills }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 8,
      }}
    >
      {skills.map((skill) => (
        <span
          key={skill}
          style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "4px 10px",
            borderRadius: 6,
            fontSize: 12,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default SkillsList;