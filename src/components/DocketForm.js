import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function DocketForm({dockets,setDockets}) {
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Read and parse the CSV file
    Papa.parse("filled_file.csv", {
      download: true,
      header: true,
      complete: function (results) {
        let newData = [];
        results.data.forEach((item) => {
          newData.push({
            PurchaseOrder: item["PO Number"],
            Description: item.Description,
            Supplier: item.Supplier,
          });
        });
        const supplierSet = new Set(newData.map((item) => item.Supplier));
        const purchaseOrderSet = new Set(
          newData.map((item) => item.PurchaseOrder)
        );

        setSuppliers(Array.from(supplierSet));
        setPurchaseOrders(Array.from(purchaseOrderSet));
        setData(newData);
      },
    });
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      const purchaseOrdersForSelectedSupplier = data
        .filter((item) => item.Supplier === selectedSupplier)
        .map((item) => item.PurchaseOrder);
      setPurchaseOrders(purchaseOrdersForSelectedSupplier);
    }
  }, [selectedSupplier, data]);

  useEffect(() => {
    if (selectedSupplier && selectedPurchaseOrder) {
      const selectedDescription = data.find(
        (item) =>
          item.Supplier === selectedSupplier &&
          item.PurchaseOrder === selectedPurchaseOrder
      );

      if (selectedDescription) {
        setDescription(selectedDescription.Description);
      } else {
        setDescription(""); // Set description to an empty string if no match is found
      }
    }
  }, [selectedSupplier, selectedPurchaseOrder, data]);

  const calculateHoursWorked = (e) => {
    e.preventDefault()
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      const timeDiff = end - start;
      let hours = timeDiff / 3600000; // 3600000 milliseconds in an hour
      hours = Math.max(0, hours); // Ensure hours is non-negative
      hours = parseFloat(hours.toFixed(2)); // Limit to two decimal places
      setHoursWorked(hours);
    } else {
      setHoursWorked("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object to represent the submitted data
    const submittedItem = {
      name,
      startTime,
      endTime,
      hoursWorked,
      rate,
      description,
      selectedSupplier,
      selectedPurchaseOrder,
      // Add other form field values as needed
    };

    // Add the submitted data to the list
    setDockets([...dockets, submittedItem]);

    // Reset the form fields
    setName("");
    setStartTime("");
    setEndTime("");
    setHoursWorked("");
    setRate("");
    setDescription("");
    setSelectedSupplier("");
    setSelectedPurchaseOrder("");
    // Reset other form fields as needed
  };



  return (
    <div>
      <h2>Create a Docket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          {" "}
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onInput={(e) => {
              setStartTime(e.target.value);
            }}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onInput={(e) => {
              setEndTime(e.target.value);
            }}
          />
          <button onClick={calculateHoursWorked}>Calculate Hours Worked</button>
        </div>
        <div>
          {" "}
          <label>No. of hours worked</label>
          <input value={hoursWorked} readOnly />
        </div>
        <div>
          {" "}
          <label>Rate per hour</label>
          <input value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>

        <div>
          <label>Select Supplier:</label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Purchase Order:</label>
          <select
            value={selectedPurchaseOrder}
            onChange={(e) => setSelectedPurchaseOrder(e.target.value)}
          >
            {purchaseOrders.map((order, index) => (
              <option key={index} value={order}>
                {order}
              </option>
            ))}
          </select>
        </div>
        {/* Other form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DocketForm;
