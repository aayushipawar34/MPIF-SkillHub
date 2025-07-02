import React, { useEffect, useState } from "react";
import "./batch.css";

function OpenBatchesNotice() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/batch/open")
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch((err) => console.error("Failed to fetch batches:", err));
  }, []);

  if (!batches || batches.length === 0) return null;

  return (
    <div className="scroll-notice-container">
      <div className="scroll-text">
        {batches.map((batch, index) => (
          <span key={index}>
             <strong>Current Batch Admission Started</strong>: 
            <b> {batch.title}</b> – <i>{batch.course?.title}</i> 
           ({new Date(batch.startDate).toLocaleDateString('en-GB')} ➝ {new Date(batch.endDate).toLocaleDateString('en-GB')})
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default OpenBatchesNotice;
