// import React from "react";

// function Expenses() {
//   return <div>Expenses</div>;
// }

// export default Expenses;
import React, { useState } from "react";
import {
  CirclePlus,
  Save,
  CircleArrowLeft,
  X,
  ArrowDownWideNarrow,
} from "lucide-react";
import Setting from "../../../assets/image/Setting.png";
import Trash from "../../../assets/image/Trash.png";
import Pencil from "../../../assets/image/Pencil.png";

const Expenses = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddCategoryClick = () => {
    setShowForm(true);
    setEditMode(false);
    setNewCategoryName("");
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setNewCategoryName("");
  };

  const handleAddClick = () => {
    if (newCategoryName.trim() !== "") {
      if (editMode) {
        const updatedCategories = categories.map((category) =>
          category.id === editCategoryId
            ? { ...category, name: newCategoryName }
            : category
        );
        setCategories(updatedCategories);
      } else {
        const newCategory = {
          id: categories.length + 1,
          name: newCategoryName,
        };
        setCategories([...categories, newCategory]);
      }
      setShowForm(false);
      setNewCategoryName("");
    }
  };

  const handleEditClick = (id, name) => {
    setEditMode(true);
    setEditCategoryId(id);
    setNewCategoryName(name);
    setShowForm(true);
  };

  const handleRemoveClick = (id) => {
    if (window.confirm("Do you want to delete it?")) {
      const updatedCategories = categories
        .filter((category) => category.id !== id)
        .map((category, index) => ({ ...category, id: index + 1 }));
      setCategories(updatedCategories);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedCategories = filteredCategories.slice(
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
    <div>
      <div>
        <h1 style={{ fontSize: "24px", marginTop: "23px", marginLeft: "24px" }}>
          Category
        </h1>
      </div>
      <section
        style={{
          width: "1180px",
          height: "auto",
          backgroundColor: "white",
          marginLeft: "23px",
          marginTop: "26px",
        }}
      >
        <div style={{ height: "1px" }}></div>
        <div style={{ marginLeft: "10px", marginTop: "12px" }}>
          <button
            onClick={handleAddCategoryClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              backgroundColor: "#38B000",
              width: "170px",
              height: "42px",
              borderRadius: "5px",
              fontSize: "15px",
            }}
          >
            <CirclePlus size={20} color="white" />
            Add Category
          </button>
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
                backdropFilter: "blur(5px)",
                zIndex: 999,
              }}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                backgroundColor: "#D8EFD3",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="form-container"
                style={{
                  width: "1031px",
                  height: "217px",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#D8EFD3",
                }}
              >
                <div
                  style={{
                    marginLeft: "22px",
                    marginTop: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>{editMode ? "Edit Category" : "Add Category"}</h1>
                  <X
                    color="#538392"
                    style={{ marginRight: "23px", cursor: "pointer" }}
                    onClick={handleCancelClick}
                  />
                </div>
                <label
                  style={{
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "43px",
                  }}
                >
                  Category:
                  <input
                    placeholder="Enter Category"
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    style={{
                      width: "476px",
                      height: "39px",
                      marginLeft: "5px",
                      padding: "5px",
                    }}
                  />
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    marginTop: "36px",
                  }}
                >
                  {editMode ? (
                    <button
                      onClick={handleUpdateClick} // This should handle the update logic
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
                        marginRight: "25px",
                      }}
                    >
                      <UpdateIcon size={15} color="white" />{" "}
                      {/* Update with your chosen icon for update */}
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={handleAddClick} // This should handle the add logic
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
                        marginRight: "25px",
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
                      marginRight: "25px",
                    }}
                  >
                    <CircleArrowLeft size={15} color="white" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <section
          style={{ marginLeft: "10px", marginTop: "21px", marginRight: "10px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "15px" }}>
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
              Entries
            </label>
            <label style={{ fontSize: "15px" }}>
              Search:
              <input
                placeholder="Search Category"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                style={{
                  width: "160px",
                  height: "26px",
                  marginLeft: "5px",
                  paddingLeft: "8px",
                  fontSize: "15px",
                }}
              />
            </label>
          </div>
          <div style={{ height: "10px" }}></div>
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#F3F3F3", height: "41px" }}>
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                      }}
                    >
                      <span>ID</span>
                      <ArrowDownWideNarrow size={15} />
                    </button>
                  </th>
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                      }}
                    >
                      <span>Name</span>
                      <ArrowDownWideNarrow size={15} />
                    </button>
                  </th>
                  <th style={{ textAlign: "left", padding: "8px" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                      }}
                    >
                      <span>Actions</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category) => (
                  <tr key={category.id} style={{ height: "41px" }}>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                        width: "30px",
                      }}
                    >
                      {category.id}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                        width: "150px",
                      }}
                    >
                      {category.name}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleEditClick(category.id, category.name)
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0",
                        }}
                      >
                        <img
                          src={Pencil}
                          alt="Edit"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </button>
                      <button
                        onClick={() => handleRemoveClick(category.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0",
                        }}
                      >
                        <img
                          src={Trash}
                          alt="Delete"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
        >
          <div>
            <button
              onClick={handleFirstPage}
              style={{
                width: "75px",
                height: "30px",
                backgroundColor: "#758BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              First
            </button>
            <button
              onClick={handlePreviousPage}
              style={{
                width: "75px",
                height: "30px",
                backgroundColor: "#758BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Previous
            </button>
          </div>
          <div>{getPageButtons()}</div>
          <div>
            <button
              onClick={handleNextPage}
              style={{
                width: "75px",
                height: "30px",
                backgroundColor: "#758BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              style={{
                width: "75px",
                height: "30px",
                backgroundColor: "#758BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Last
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expenses;
