import React, { useState } from "react";
import {
  CirclePlus,
  Save,
  CircleArrowLeft,
  X,
  ArrowDownWideNarrow,
  PencilLine,
} from "lucide-react";
import Setting from "../../../assets/image/Setting.png";
import Trash from "../../../assets/image/Trash.png";
import Pencil from "../../../assets/image/Pencil.png";

const Category = () => {
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
      // Check if the category name already exists
      const isDuplicate = categories.some(
        (category) =>
          category.name.toLowerCase() === newCategoryName.toLowerCase()
      );

      if (isDuplicate) {
        alert("This Category already exists. Please add a new Category.");
        return;
      }

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

  const handleUpdateClick = () => {
    if (newCategoryName.trim() !== "") {
      // Check if the category name already exists, excluding the current category being edited
      const isDuplicate = categories.some(
        (category) =>
          category.id !== editCategoryId &&
          category.name.toLowerCase() === newCategoryName.toLowerCase()
      );

      if (isDuplicate) {
        alert("This Category already exists. Please use a different name.");
        return;
      }

      // Find the index of the category to update
      const categoryIndex = categories.findIndex(
        (category) => category.id === editCategoryId
      );

      // If category is found, update its details
      if (categoryIndex !== -1) {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          name: newCategoryName,
        };

        // Update the state with the new categories list
        setCategories(updatedCategories);

        // Close the form and reset the form state
        setShowForm(false);
        setNewCategoryName("");
        setEditCategoryId(null);
        setEditMode(false);
      } else {
        // Handle the case where the category to update was not found
        console.error("Category not found for updating");
      }
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
            border: " solid 1px #BCBCBC",
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
          width: "1000px",
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
              justifyContent: "Center",
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
                }}
              >
                <div
                  className="form-container"
                  style={{
                    width: "1031px",
                    height: "217px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
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
                          marginRight: "25px",
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
              entries
            </label>
            <div
              style={{
                fontSize: "15px",
              }}
            >
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

          <div>
            <section style={{ marginTop: "12px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "solid 1px black",
                  width: "980px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      width: "45px",
                      height: "40px",
                      borderLeft: "0",
                      borderTop: "0 solid black",
                      borderRight: "0px solid black",
                      borderBottom: "0 solid black",
                      marginInlineStart: "20px",
                    }}
                  >
                    <h3>#</h3>
                    <ArrowDownWideNarrow
                      size={18}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px" }}>Category</h3>
                  </div>
                </div>
                <div
                  style={{
                    width: "147px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    borderLeft: "1px solid black",
                    borderTop: "0 solid black",
                    borderRight: "0px solid black",
                    borderBottom: "0 solid black",
                  }}
                >
                  <img
                    src={Setting}
                    alt="Setting"
                    style={{
                      marginLeft: "10px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
              </div>
            </section>
            <section>
              {paginatedCategories.map((category) => (
                <div
                  key={category.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderLeft: "1px solid black",
                    borderTop: "0 solid black",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    width: "980px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        width: "45px",
                        height: "40px",
                        borderLeft: "0",
                        borderTop: "0 solid black",
                        borderRight: "1px solid black",
                        borderBottom: "0 solid black",
                      }}
                    >
                      {category.id}
                    </div>
                    <div
                      style={{ marginInlineStart: "20px", fontSize: "14px" }}
                    >
                      {category.name}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "147px",
                      height: "40px",
                      alignItems: "center",
                      borderLeft: "1px solid black",
                      borderTop: "0 solid black",
                      borderRight: "0px solid black",
                      borderBottom: "0 solid black",
                    }}
                  >
                    <button
                      onClick={() =>
                        handleEditClick(category.id, category.name)
                      }
                      style={{
                        width: "36px",
                        height: "30px",
                        backgroundColor: "#4557F7",
                        borderRadius: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        marginLeft: "10px",
                      }}
                    >
                      <img
                        src={Pencil}
                        alt="Pencil"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </button>
                    <button
                      onClick={() => handleRemoveClick(category.id)}
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
                      <img
                        src={Trash}
                        alt="Trash"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </section>

        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: "10px",
          }}
        >
          <div style={{ fontSize: "14px" }}>
            Showing page {currentPage} of {totalPages} (
            {filteredCategories.length} entries)
          </div>
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderTopRightRadius: "0px",
                borderTopLeftRadius: "10px",
                borderStartEndRadius: "0px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "0px",
                borderRight: "0px",
              }}
            >
              Previous
            </button>
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderTopRightRadius: "0px",
                borderTopLeftRadius: "0px",
                borderStartEndRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              {"<<"}
            </button>
            {getPageButtons()}

            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              style={{
                border: "solid 1px #BCBCBC",
                borderLeft: "0px",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderTopRightRadius: "0px",
                borderTopLeftRadius: "0px",
                borderStartEndRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              {">>"}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                border: "solid 1px #BCBCBC",
                backgroundColor: "white",
                color: "black",
                height: "30px",
                fontSize: "14px",
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "0px",
                borderStartEndRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "10px",
                borderLeft: "0px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
