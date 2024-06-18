import React, { useState } from "react";
import JsBarcode from "jsbarcode";
import {
  CirclePlus,
  Save,
  CircleArrowLeft,
  X,
  PencilLine,
  Printer,
  Trash,
} from "lucide-react";
import Pencil from "../../../assets/image/Pencil.png";

const Income = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    codeID: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    telephone: "",
    role: "",
    email: "",
    image: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleAddEmployeeClick = () => {
    setShowForm(true);
    setEditMode(false);
    setFormValues({
      id: "",
      codeID: "",
      name: "",
      gender: "",
      dateOfBirth: "",
      telephone: "",
      role: "",
      email: "",
      image: "",
    });
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setFormValues({
      id: "",
      codeID: "",
      name: "",
      gender: "",
      dateOfBirth: "",
      telephone: "",
      role: "",
      email: "",
      image: "",
    });
  };

  const generateBarcode = (codeID) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, codeID, { format: "CODE39" });
    return canvas.toDataURL("image/png");
  };

  const handleAddClick = () => {
    if (formValues.name.trim() !== "") {
      const isDuplicate = employees.some(
        (employee) =>
          employee.codeID.toLowerCase() === formValues.codeID.toLowerCase()
      );

      if (isDuplicate) {
        alert("This employee code already exists. Please add a new employee.");
        return;
      }

      if (editMode) {
        const updatedEmployees = employees.map((employee) =>
          employee.id === editEmployeeId
            ? { ...employee, ...formValues }
            : employee
        );
        setEmployees(updatedEmployees);
      } else {
        const newEmployee = {
          ...formValues,
          id: employees.length + 1,
          barcode: generateBarcode(formValues.codeID),
        };
        setEmployees([...employees, newEmployee]);
      }
      setShowForm(false);
      setFormValues({
        id: "",
        codeID: "",
        name: "",
        gender: "",
        dateOfBirth: "",
        telephone: "",
        role: "",
        email: "",
        image: "",
      });
    }
  };

  const handleUpdateClick = () => {
    if (formValues.name.trim() !== "") {
      const isDuplicate = employees.some(
        (employee) =>
          employee.id !== editEmployeeId &&
          employee.codeID.toLowerCase() === formValues.codeID.toLowerCase()
      );

      if (isDuplicate) {
        alert(
          "This employee code already exists. Please use a different code."
        );
        return;
      }

      const updatedEmployees = employees.map((employee) =>
        employee.id === editEmployeeId
          ? {
              ...employee,
              ...formValues,
              barcode: generateBarcode(formValues.codeID),
            }
          : employee
      );

      setEmployees(updatedEmployees);
      setShowForm(false);
      setFormValues({
        id: "",
        codeID: "",
        name: "",
        gender: "",
        dateOfBirth: "",
        telephone: "",
        role: "",
        email: "",
        image: "",
      });
      setEditEmployeeId(null);
      setEditMode(false);
    }
  };

  const handleEditClick = (employee) => {
    setEditMode(true);
    setEditEmployeeId(employee.id);
    setFormValues({ ...employee });
    setShowForm(true);
  };

  const handleRemoveClick = (id) => {
    if (window.confirm("Do you want to delete this employee?")) {
      const updatedEmployees = employees.filter(
        (employee) => employee.id !== id
      );
      setEmployees(updatedEmployees);
      setSelectedEmployees(
        selectedEmployees.filter((employeeId) => employeeId !== id)
      );
    }
  };

  const handlePrintEmployeeCard = (employee) => {
    const printWindow = window.open("", "PRINT", "height=400,width=600");
    printWindow.document.write("<html><head><title>Employee Card</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(`<h1>Employee Card for ${employee.name}</h1>`);
    printWindow.document.write(`<p>ID: ${employee.codeID}</p>`);
    printWindow.document.write(`<p>Date of Birth: ${employee.dateOfBirth}</p>`);
    printWindow.document.write(`<p>Phone Number: ${employee.telephone}</p>`);
    printWindow.document.write(`<p>Email: ${employee.email}</p>`);
    printWindow.document.write(
      `<img src="${employee.image}" alt="Employee Image" width="100" height="100"/>`
    );
    printWindow.document.write(
      `<img src="${employee.barcode}" alt="Barcode for ${employee.codeID}" />`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleCheckboxChange = (id) => {
    setSelectedEmployees((prevSelectedEmployees) =>
      prevSelectedEmployees.includes(id)
        ? prevSelectedEmployees.filter((employeeId) => employeeId !== id)
        : [...prevSelectedEmployees, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedEmployees.length === paginatedEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(paginatedEmployees.map((employee) => employee.id));
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormValues({ ...formValues, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const getPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);

    if (currentPage === 1) {
      endPage = Math.min(totalPages, 3);
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            backgroundColor: i === currentPage ? "#758BFF" : "white",
            color: "black",
            height: "30px",
            fontSize: "14px",
            border: "solid 1px #BCBCBC",
            borderLeft: "0px solid #BCBCBC",
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderStartEndRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <h1>Employee</h1>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleAddEmployeeClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              backgroundColor: "#38B000",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "15px",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            <CirclePlus size={20} color="white" />
            Add New Employee
          </button>
          <button
            onClick={() =>
              selectedEmployees.forEach((id) =>
                handlePrintEmployeeCard(employees.find((emp) => emp.id === id))
              )
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              backgroundColor: "#FF9100",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "15px",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            <Printer size={20} color="white" />
            Print Membercard
          </button>
        </div>
      </div>
      {showForm && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(1px)",
              zIndex: 999,
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                width: "90%",
                maxWidth: "800px",
                padding: "20px",
              }}
            >
              <div
                className="form-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>{editMode ? "Edit Employee" : "Add Employee"}</h1>
                  <X
                    color="#538392"
                    style={{ cursor: "pointer" }}
                    onClick={handleCancelClick}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Code ID:
                    <input
                      type="text"
                      value={formValues.codeID}
                      onChange={(e) =>
                        setFormValues({ ...formValues, codeID: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Name:
                    <input
                      type="text"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Gender:
                    <input
                      type="text"
                      value={formValues.gender}
                      onChange={(e) =>
                        setFormValues({ ...formValues, gender: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Date of Birth:
                    <input
                      type="date"
                      value={formValues.dateOfBirth}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          dateOfBirth: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Telephone:
                    <input
                      type="text"
                      value={formValues.telephone}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          telephone: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Role:
                    <input
                      type="text"
                      value={formValues.role}
                      onChange={(e) =>
                        setFormValues({ ...formValues, role: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Email:
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "20px" }}>
                    Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    {editMode ? (
                      <button
                        onClick={handleUpdateClick}
                        style={{
                          width: "88px",
                          height: "33px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          backgroundColor: "#4FC64C",
                          borderRadius: "5px",
                        }}
                      >
                        <PencilLine size={15} /> Update
                      </button>
                    ) : (
                      <button
                        onClick={handleAddClick}
                        style={{
                          width: "78px",
                          height: "33px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          backgroundColor: "#4FC64C",
                          borderRadius: "5px",
                        }}
                      >
                        <Save size={15} color="white" />
                        Save
                      </button>
                    )}
                    <button
                      onClick={handleCancelClick}
                      style={{
                        width: "90px",
                        height: "33px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        backgroundColor: "#FF4F4F",
                        borderRadius: "5px",
                      }}
                    >
                      <CircleArrowLeft size={15} color="white" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div style={{ margin: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <label style={{ fontSize: "15px", whiteSpace: "nowrap" }}>
            Show
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: "67px",
                height: "27px",
                paddingLeft: "20px",
                fontSize: "15px",
              }}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            entries
          </label>
          <div style={{ fontSize: "15px", whiteSpace: "nowrap" }}>
            Search:
            <input
              style={{
                width: "147px",
                height: "29px",
                padding: "5px",
                marginLeft: "5px",
              }}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={
                      selectedEmployees.length === paginatedEmployees.length
                    }
                  />
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Code ID
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Gender
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Date of Birth
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Telephone
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Role
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Email
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Image
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleCheckboxChange(employee.id)}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.codeID}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.gender}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.dateOfBirth}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.telephone}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.role}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {employee.email}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <img
                      src={employee.image}
                      alt="Employee"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <button
                      onClick={() => handleEditClick(employee)}
                      style={{
                        width: "36px",
                        height: "30px",
                        backgroundColor: "#4557F7",
                        borderRadius: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    >
                      <img
                        src={Pencil}
                        alt="Pencil"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </button>
                    <button
                      onClick={() => handleRemoveClick(employee.id)}
                      style={{
                        width: "36px",
                        height: "30px",
                        backgroundColor: "#FF0505",
                        borderRadius: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    >
                      <Trash size={16} color="white" />
                    </button>
                    <button
                      onClick={() => handlePrintEmployeeCard(employee)}
                      style={{
                        width: "36px",
                        height: "30px",
                        backgroundColor: "#4CAF50",
                        borderRadius: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    >
                      <Printer size={16} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "14px" }}>
            Showing page {currentPage} of {totalPages} (
            {filteredEmployees.length} entries)
          </div>
          <div>
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderRadius: "5px 0 0 5px",
                borderRight: "0px",
              }}
            >
              {"<<"}
            </button>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderRight: "0px",
              }}
            >
              Previous
            </button>
            {getPageButtons()}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderLeft: "0px",
              }}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderRadius: "0 5px 5px 0",
                borderLeft: "0px",
              }}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
