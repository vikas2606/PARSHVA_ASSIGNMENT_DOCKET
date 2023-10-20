import React from 'react';
import './DocketList.css'

function DocketList({ dockets }) {
  return (
    <div>
      <h3>Submitted Data</h3>
      <table className="docket-table">
        <thead>
          <tr> 
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Hours Worked</th>
            <th>Rate</th>
            <th>Description</th>
            <th>Selected Supplier</th>
            <th>Selected Purchase Order</th>
          </tr>
        </thead>
        <tbody>
          {dockets.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
              <td>{item.hoursWorked}</td>
              <td>{item.rate}</td>
              <td>{item.description}</td>
              <td>{item.selectedSupplier}</td>
              <td>{item.selectedPurchaseOrder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocketList;
