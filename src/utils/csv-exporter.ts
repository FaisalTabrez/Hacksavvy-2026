
// Utility to clean fields for CSV (escape quotes and commas)
const clean = (text: string | undefined | null) => {
    if (!text) return "";
    // If text contains comma, quotes or newline, wrap in quotes and escape internal quotes
    const s = String(text).replace(/"/g, '""'); 
    return `"${s}"`;
  };
  
  export const downloadTeamsCSV = (teams: any[]) => {
    // 1. Define Headers
    const headers = [
      "Team Name",
      "Track",
      "Payment Status",
      "Registration Date",
      "Team Size",
      // Leader Info
      "Leader Name",
      "Leader Email",
      "Leader Phone",
      "Leader College",
      "Leader Roll No",
      // Member 2 (if exists)
      "Member 2 Name",
      "Member 2 Email",
      "Member 2 Phone",
      // Member 3
      "Member 3 Name",
      "Member 3 Email",
      "Member 3 Phone",
      // Member 4
      "Member 4 Name",
      "Member 4 Email",
      "Member 4 Phone",
      // Member 5
      "Member 5 Name",
      "Member 5 Email",
      "Member 5 Phone",
      // Extra
      "Transaction ID"
    ];
  
    // 2. Map Data to Rows
    const rows = teams.map((team) => {
      const leader = team.members_data[0] || {};
      const m2 = team.members_data[1] || {};
      const m3 = team.members_data[2] || {};
      const m4 = team.members_data[3] || {};
      const m5 = team.members_data[4] || {};
  
      return [
        clean(team.team_name),
        clean(team.track),
        clean(team.payment_status),
        clean(team.created_at),
        team.members_data.length,
        // Leader
        clean(leader.name),
        clean(leader.email),
        clean(leader.phone),
        clean(leader.college),
        clean(leader.roll_no),
        // M2
        clean(m2.name),
        clean(m2.email),
        clean(m2.phone),
        // M3
        clean(m3.name),
        clean(m3.email),
        clean(m3.phone),
        // M4
        clean(m4.name),
        clean(m4.email),
        clean(m4.phone),
        // M5
        clean(m5.name),
        clean(m5.email),
        clean(m5.phone),
        
        clean(team.transaction_id)
      ];
    });
  
    // 3. Construct CSV String
    const csvContent =
      headers.join(",") + "\n" + rows.map((e) => e.join(",")).join("\n");
  
    // 4. Trigger Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    // Add timestamp to filename
    const dateStr = new Date().toISOString().split('T')[0];
    
    link.href = url;
    link.setAttribute("download", `hacksavvy_export_${dateStr}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  