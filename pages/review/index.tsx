import { useState, useEffect } from "react";

export default function Review() {
    const [docs, setDocs] = useState<any[]>([]);
    useEffect(() => {
        fetch("/api/doucments/list")
        .then(res => res.json())
        .then(setDocs);
    }, []);
    async function review(id: string, action: "APPROVE" | "REJECT") {
        await fetch("/api/documents/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, action }),
        });
        alert(`${action} done`);
        setDocs(docs.filter(d => d.id !== id));
    }
    return (
    <div style={{ padding: 20 }}>
      <h1>Review Documents</h1>
      {docs.length === 0 && <p>No documents to review.</p>}
      {docs.map(d => (
        <div key={d.id} style={{ border: "1px solid", padding: 10, margin: 10 }}>
          <h3>{d.title}</h3>
          <p><em>Status: {d.status}</em></p>
          <p>{d.content}</p>
          <button onClick={() => review(d.id, "APPROVE")}>Approve</button>{" "}
          <button onClick={() => review(d.id, "REJECT")}>Reject</button>
        </div>
      ))}
    </div>
  );
}