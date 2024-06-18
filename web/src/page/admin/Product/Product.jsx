// import React, { useState } from "react";
// import JsBarcode from "jsbarcode";
// import {
//   CirclePlus,
//   Save,
//   CircleArrowLeft,
//   X,
//   ArrowDownWideNarrow,
//   PencilLine,
//   Printer,
// } from "lucide-react";
// import Setting from "../../../assets/image/Setting.png";
// import Trash from "../../../assets/image/Trash.png";
// import Pencil from "../../../assets/image/Pencil.png";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formValues, setFormValues] = useState({
//     id: "",
//     code: "",
//     name: "",
//     category: "",
//     brand: "",
//     purchasePrice: "",
//     sellingPrice: "",
//     discount: "",
//     stock: "",
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editProductId, setEditProductId] = useState(null);
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleAddProductClick = () => {
//     setShowForm(true);
//     setEditMode(false);
//     setFormValues({
//       id: "",
//       code: "",
//       name: "",
//       category: "",
//       brand: "",
//       purchasePrice: "",
//       sellingPrice: "",
//       discount: "",
//       stock: "",
//     });
//   };

//   const handleCancelClick = () => {
//     setShowForm(false);
//     setFormValues({
//       id: "",
//       code: "",
//       name: "",
//       category: "",
//       brand: "",
//       purchasePrice: "",
//       sellingPrice: "",
//       discount: "",
//       stock: "",
//     });
//   };

//   const generateBarcode = (productCode) => {
//     const canvas = document.createElement("canvas");
//     JsBarcode(canvas, productCode, { format: "CODE128" });
//     return canvas.toDataURL("image/png");
//   };

//   const handleAddClick = () => {
//     if (formValues.name.trim() !== "") {
//       // Check if the product code already exists
//       const isDuplicate = products.some(
//         (product) =>
//           product.code.toLowerCase() === formValues.code.toLowerCase()
//       );

//       if (isDuplicate) {
//         alert("This product code already exists. Please add a new product.");
//         return;
//       }

//       if (editMode) {
//         const updatedProducts = products.map((product) =>
//           product.id === editProductId ? { ...product, ...formValues } : product
//         );
//         setProducts(updatedProducts);
//       } else {
//         const newProduct = {
//           ...formValues,
//           id: products.length + 1,
//           barcode: generateBarcode(formValues.code),
//         };
//         setProducts([...products, newProduct]);
//       }
//       setShowForm(false);
//       setFormValues({
//         id: "",
//         code: "",
//         name: "",
//         category: "",
//         brand: "",
//         purchasePrice: "",
//         sellingPrice: "",
//         discount: "",
//         stock: "",
//       });
//     }
//   };

//   const handleUpdateClick = () => {
//     if (formValues.name.trim() !== "") {
//       // Check if the product code already exists, excluding the current product being edited
//       const isDuplicate = products.some(
//         (product) =>
//           product.id !== editProductId &&
//           product.code.toLowerCase() === formValues.code.toLowerCase()
//       );

//       if (isDuplicate) {
//         alert("This product code already exists. Please use a different code.");
//         return;
//       }

//       const updatedProducts = products.map((product) =>
//         product.id === editProductId
//           ? {
//               ...product,
//               ...formValues,
//               barcode: generateBarcode(formValues.code),
//             }
//           : product
//       );

//       setProducts(updatedProducts);
//       setShowForm(false);
//       setFormValues({
//         id: "",
//         code: "",
//         name: "",
//         category: "",
//         brand: "",
//         purchasePrice: "",
//         sellingPrice: "",
//         discount: "",
//         stock: "",
//       });
//       setEditProductId(null);
//       setEditMode(false);
//     }
//   };

//   const handleEditClick = (product) => {
//     setEditMode(true);
//     setEditProductId(product.id);
//     setFormValues({ ...product });
//     setShowForm(true);
//   };

//   const handleRemoveClick = (id) => {
//     if (window.confirm("Do you want to delete it?")) {
//       const updatedProducts = products
//         .filter((product) => product.id !== id)
//         .map((product, index) => ({ ...product, id: index + 1 }));
//       setProducts(updatedProducts);
//     }
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const handleLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const getPageButtons = () => {
//     const buttons = [];
//     let startPage = Math.max(1, currentPage - 1);
//     let endPage = Math.min(totalPages, startPage + 2);

//     if (currentPage === 1) {
//       endPage = Math.min(totalPages, 3);
//     } else if (currentPage === totalPages) {
//       startPage = Math.max(1, totalPages - 2);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => setCurrentPage(i)}
//           style={{
//             backgroundColor: i === currentPage ? "#758BFF" : "white",
//             color: "black",
//             height: "30px",
//             fontSize: "14px",
//             border: "solid 1px #BCBCBC",
//             borderLeft: "0px solid #BCBCBC",
//             borderTopRightRadius: "0px",
//             borderTopLeftRadius: "0px",
//             borderStartEndRadius: "0px",
//             borderBottomLeftRadius: "0px",
//             borderBottomRightRadius: "0px",
//           }}
//           disabled={i === currentPage}
//         >
//           {i}
//         </button>
//       );
//     }
//     return buttons;
//   };

//   const handlePrintBarcode = (product) => {
//     const printWindow = window.open("", "PRINT", "height=400,width=600");
//     printWindow.document.write("<html><head><title>Product Barcode</title>");
//     printWindow.document.write("</head><body>");
//     printWindow.document.write(`<h1>Barcode for ${product.name}</h1>`);
//     printWindow.document.write(
//       `<img src="${product.barcode}" alt="Barcode for ${product.name}" />`
//     );
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div>
//       <div>
//         <h1 style={{ fontSize: "24px", marginTop: "23px", marginLeft: "24px" }}>
//           Product
//         </h1>
//       </div>
//       <section
//         style={{
//           width: "1180px",
//           height: "auto",
//           backgroundColor: "white",
//           marginLeft: "23px",
//           marginTop: "26px",
//         }}
//       >
//         <div style={{ height: "1px" }}></div>
//         <div style={{ marginLeft: "10px", marginTop: "12px" }}>
//           <button
//             onClick={handleAddProductClick}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "Center",
//               gap: "7px",
//               backgroundColor: "#38B000",
//               width: "170px",
//               height: "42px",
//               borderRadius: "5px",
//               fontSize: "15px",
//             }}
//           >
//             <CirclePlus size={20} color="white" />
//             Add Product
//           </button>
//         </div>

//         {showForm && (
//           <>
//             <div
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//                 backdropFilter: "blur(1px)",
//                 zIndex: 999,
//               }}
//             >
//               <div
//                 style={{
//                   position: "fixed",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   zIndex: 1000,
//                   backgroundColor: "white",
//                   boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <div
//                   className="form-container"
//                   style={{
//                     width: "1031px",
//                     height: "auto",
//                     display: "flex",
//                     flexDirection: "column",
//                     backgroundColor: "white",
//                     padding: "20px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       marginBottom: "20px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <h1>{editMode ? "Edit Product" : "Add Product"}</h1>
//                     <X
//                       color="#538392"
//                       style={{ cursor: "pointer" }}
//                       onClick={handleCancelClick}
//                     />
//                   </div>
//                   <div>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Code:
//                       <input
//                         type="text"
//                         value={formValues.code}
//                         onChange={(e) =>
//                           setFormValues({ ...formValues, code: e.target.value })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Name:
//                       <input
//                         type="text"
//                         value={formValues.name}
//                         onChange={(e) =>
//                           setFormValues({ ...formValues, name: e.target.value })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Category:
//                       <input
//                         type="text"
//                         value={formValues.category}
//                         onChange={(e) =>
//                           setFormValues({
//                             ...formValues,
//                             category: e.target.value,
//                           })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Brand:
//                       <input
//                         type="text"
//                         value={formValues.brand}
//                         onChange={(e) =>
//                           setFormValues({
//                             ...formValues,
//                             brand: e.target.value,
//                           })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Purchase Price:
//                       <input
//                         type="number"
//                         value={formValues.purchasePrice}
//                         onChange={(e) =>
//                           setFormValues({
//                             ...formValues,
//                             purchasePrice: e.target.value,
//                           })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Selling Price:
//                       <input
//                         type="number"
//                         value={formValues.sellingPrice}
//                         onChange={(e) =>
//                           setFormValues({
//                             ...formValues,
//                             sellingPrice: e.target.value,
//                           })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "10px" }}>
//                       Discount:
//                       <input
//                         type="number"
//                         value={formValues.discount}
//                         onChange={(e) =>
//                           setFormValues({
//                             ...formValues,
//                             discount: e.target.value,
//                           })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <label style={{ display: "block", marginBottom: "20px" }}>
//                       Stock:
//                       <input
//                         type="number"
//                         value={formValues.stock}
//                         onChange={(e) =>
//                           setFormValues({
//                             ...formValues,
//                             stock: e.target.value,
//                           })
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "5px",
//                           marginTop: "5px",
//                         }}
//                       />
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         gap: "10px",
//                       }}
//                     >
//                       {editMode ? (
//                         <button
//                           onClick={handleUpdateClick}
//                           style={{
//                             width: "88px",
//                             height: "33px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             gap: "4px",
//                             fontSize: "12px",
//                             backgroundColor: "#4FC64C",
//                             borderRadius: "5px",
//                           }}
//                         >
//                           <PencilLine size={15} /> Update
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleAddClick}
//                           style={{
//                             width: "78px",
//                             height: "33px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             gap: "4px",
//                             fontSize: "12px",
//                             backgroundColor: "#4FC64C",
//                             borderRadius: "5px",
//                           }}
//                         >
//                           <Save size={15} color="white" />
//                           Save
//                         </button>
//                       )}
//                       <button
//                         onClick={handleCancelClick}
//                         style={{
//                           width: "90px",
//                           height: "33px",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           gap: "4px",
//                           fontSize: "12px",
//                           backgroundColor: "#FF4F4F",
//                           borderRadius: "5px",
//                         }}
//                       >
//                         <CircleArrowLeft size={15} color="white" />
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         <section
//           style={{ marginLeft: "10px", marginTop: "21px", marginRight: "10px" }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <label style={{ fontSize: "15px" }}>
//               Show
//               <select
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//                 style={{
//                   marginLeft: "5px",
//                   marginRight: "5px",
//                   width: "67px",
//                   height: "27px",
//                   paddingLeft: "20px",
//                   fontSize: "15px",
//                 }}
//               >
//                 <option value={3}>3</option>
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//               </select>
//               entries
//             </label>
//             <div
//               style={{
//                 fontSize: "15px",
//               }}
//             >
//               Search:
//               <input
//                 style={{
//                   width: "147px",
//                   height: "29px",
//                   padding: "5px",
//                   marginLeft: "5px",
//                 }}
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>
//           </div>

//           <div>
//             <section style={{ marginTop: "12px" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   border: "solid 1px black",
//                   width: "1160px",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   height: "40px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       fontSize: "15px",
//                       width: "45px",
//                       height: "40px",
//                       borderLeft: "0",
//                       borderTop: "0 solid black",
//                       borderRight: "0px solid black",
//                       borderBottom: "0 solid black",
//                       marginInlineStart: "20px",
//                     }}
//                   >
//                     <h3>#</h3>
//                     <ArrowDownWideNarrow
//                       size={18}
//                       style={{ marginLeft: "10px" }}
//                     />
//                   </div>
//                   <div>
//                     <h3 style={{ fontSize: "15px" }}>Product</h3>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     width: "147px",
//                     height: "40px",
//                     display: "flex",
//                     alignItems: "center",
//                     borderLeft: "1px solid black",
//                     borderTop: "0 solid black",
//                     borderRight: "0px solid black",
//                     borderBottom: "0 solid black",
//                   }}
//                 >
//                   <img
//                     src={Setting}
//                     alt="Setting"
//                     style={{
//                       marginLeft: "10px",
//                       width: "20px",
//                       height: "20px",
//                     }}
//                   />
//                 </div>
//               </div>
//             </section>
//             <section>
//               {paginatedProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     borderLeft: "1px solid black",
//                     borderTop: "0 solid black",
//                     borderRight: "1px solid black",
//                     borderBottom: "1px solid black",
//                     width: "1160px",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     height: "40px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       alignItems: "center",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "14px",
//                         width: "45px",
//                         height: "40px",
//                         borderLeft: "0",
//                         borderTop: "0 solid black",
//                         borderRight: "1px solid black",
//                         borderBottom: "0 solid black",
//                       }}
//                     >
//                       {product.id}
//                     </div>
//                     <div
//                       style={{ marginInlineStart: "20px", fontSize: "14px" }}
//                     >
//                       {product.name}
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       width: "147px",
//                       height: "40px",
//                       alignItems: "center",
//                       borderLeft: "1px solid black",
//                       borderTop: "0 solid black",
//                       borderRight: "0px solid black",
//                       borderBottom: "0 solid black",
//                     }}
//                   >
//                     <button
//                       onClick={() => handleEditClick(product)}
//                       style={{
//                         width: "36px",
//                         height: "30px",
//                         backgroundColor: "#4557F7",
//                         borderRadius: "0",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         padding: "0",
//                         marginLeft: "10px",
//                       }}
//                     >
//                       <img
//                         src={Pencil}
//                         alt="Pencil"
//                         style={{ width: "16px", height: "16px" }}
//                       />
//                     </button>
//                     <button
//                       onClick={() => handleRemoveClick(product.id)}
//                       style={{
//                         width: "36px",
//                         height: "30px",
//                         backgroundColor: "#FF0505",
//                         borderRadius: "0",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         padding: "0",
//                       }}
//                     >
//                       <img
//                         src={Trash}
//                         alt="Trash"
//                         style={{ width: "16px", height: "16px" }}
//                       />
//                     </button>
//                     <button
//                       onClick={() => handlePrintBarcode(product)}
//                       style={{
//                         width: "36px",
//                         height: "30px",
//                         backgroundColor: "#4CAF50",
//                         borderRadius: "0",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         padding: "0",
//                       }}
//                     >
//                       <Printer size={16} color="white" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </section>
//           </div>
//         </section>

//         <div
//           style={{
//             marginLeft: "10px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginRight: "10px",
//           }}
//         >
//           <div style={{ fontSize: "14px" }}>
//             Showing page {currentPage} of {totalPages} (
//             {filteredProducts.length} entries)
//           </div>
//           <div>
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderTopRightRadius: "0px",
//                 borderTopLeftRadius: "10px",
//                 borderStartEndRadius: "0px",
//                 borderBottomLeftRadius: "10px",
//                 borderBottomRightRadius: "0px",
//                 borderRight: "0px",
//               }}
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleFirstPage}
//               disabled={currentPage === 1}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderTopRightRadius: "0px",
//                 borderTopLeftRadius: "0px",
//                 borderStartEndRadius: "0px",
//                 borderBottomLeftRadius: "0px",
//                 borderBottomRightRadius: "0px",
//               }}
//             >
//               {"<<"}
//             </button>
//             {getPageButtons()}

//             <button
//               onClick={handleLastPage}
//               disabled={currentPage === totalPages}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 borderLeft: "0px",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderTopRightRadius: "0px",
//                 borderTopLeftRadius: "0px",
//                 borderStartEndRadius: "0px",
//                 borderBottomLeftRadius: "0px",
//                 borderBottomRightRadius: "0px",
//               }}
//             >
//               {">>"}
//             </button>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderTopRightRadius: "10px",
//                 borderTopLeftRadius: "0px",
//                 borderStartEndRadius: "0px",
//                 borderBottomLeftRadius: "0px",
//                 borderBottomRightRadius: "10px",
//                 borderLeft: "0px",
//               }}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Product;
// import React, { useState } from "react";
// import JsBarcode from "jsbarcode";
// import {
//   CirclePlus,
//   Save,
//   CircleArrowLeft,
//   X,
//   PencilLine,
//   Printer,
// } from "lucide-react";
// // import Setting from "../../../assets/image/Setting.png";
// import Trash from "../../../assets/image/Trash.png";
// import Pencil from "../../../assets/image/Pencil.png";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formValues, setFormValues] = useState({
//     id: "",
//     code: "",
//     name: "",
//     category: "",
//     brand: "",
//     purchasePrice: "",
//     sellingPrice: "",
//     discount: "",
//     stock: "",
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editProductId, setEditProductId] = useState(null);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleAddProductClick = () => {
//     setShowForm(true);
//     setEditMode(false);
//     setFormValues({
//       id: "",
//       code: "",
//       name: "",
//       category: "",
//       brand: "",
//       purchasePrice: "",
//       sellingPrice: "",
//       discount: "",
//       stock: "",
//     });
//   };

//   const handleCancelClick = () => {
//     setShowForm(false);
//     setFormValues({
//       id: "",
//       code: "",
//       name: "",
//       category: "",
//       brand: "",
//       purchasePrice: "",
//       sellingPrice: "",
//       discount: "",
//       stock: "",
//     });
//   };

//   const generateBarcode = (productCode) => {
//     const canvas = document.createElement("canvas");
//     JsBarcode(canvas, productCode, { format: "CODE128" });
//     return canvas.toDataURL("image/png");
//   };

//   const handleAddClick = () => {
//     if (formValues.name.trim() !== "") {
//       // Check if the product code already exists
//       const isDuplicate = products.some(
//         (product) =>
//           product.code.toLowerCase() === formValues.code.toLowerCase()
//       );

//       if (isDuplicate) {
//         alert("This product code already exists. Please add a new product.");
//         return;
//       }

//       if (editMode) {
//         const updatedProducts = products.map((product) =>
//           product.id === editProductId ? { ...product, ...formValues } : product
//         );
//         setProducts(updatedProducts);
//       } else {
//         const newProduct = {
//           ...formValues,
//           id: products.length + 1,
//           barcode: generateBarcode(formValues.code),
//         };
//         setProducts([...products, newProduct]);
//       }
//       setShowForm(false);
//       setFormValues({
//         id: "",
//         code: "",
//         name: "",
//         category: "",
//         brand: "",
//         purchasePrice: "",
//         sellingPrice: "",
//         discount: "",
//         stock: "",
//       });
//     }
//   };

//   const handleUpdateClick = () => {
//     if (formValues.name.trim() !== "") {
//       // Check if the product code already exists, excluding the current product being edited
//       const isDuplicate = products.some(
//         (product) =>
//           product.id !== editProductId &&
//           product.code.toLowerCase() === formValues.code.toLowerCase()
//       );

//       if (isDuplicate) {
//         alert("This product code already exists. Please use a different code.");
//         return;
//       }

//       const updatedProducts = products.map((product) =>
//         product.id === editProductId
//           ? {
//               ...product,
//               ...formValues,
//               barcode: generateBarcode(formValues.code),
//             }
//           : product
//       );

//       setProducts(updatedProducts);
//       setShowForm(false);
//       setFormValues({
//         id: "",
//         code: "",
//         name: "",
//         category: "",
//         brand: "",
//         purchasePrice: "",
//         sellingPrice: "",
//         discount: "",
//         stock: "",
//       });
//       setEditProductId(null);
//       setEditMode(false);
//     }
//   };

//   const handleEditClick = (product) => {
//     setEditMode(true);
//     setEditProductId(product.id);
//     setFormValues({ ...product });
//     setShowForm(true);
//   };

//   const handleRemoveClick = (id) => {
//     if (window.confirm("Do you want to delete it?")) {
//       const updatedProducts = products
//         .filter((product) => product.id !== id)
//         .map((product, index) => ({ ...product, id: index + 1 }));
//       setProducts(updatedProducts);
//     }
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const handleLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const getPageButtons = () => {
//     const buttons = [];
//     let startPage = Math.max(1, currentPage - 1);
//     let endPage = Math.min(totalPages, startPage + 2);

//     if (currentPage === 1) {
//       endPage = Math.min(totalPages, 3);
//     } else if (currentPage === totalPages) {
//       startPage = Math.max(1, totalPages - 2);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => setCurrentPage(i)}
//           style={{
//             backgroundColor: i === currentPage ? "#758BFF" : "white",
//             color: "black",
//             height: "30px",
//             fontSize: "14px",
//             border: "solid 1px #BCBCBC",
//             borderLeft: "0px solid #BCBCBC",
//             borderTopRightRadius: "0px",
//             borderTopLeftRadius: "0px",
//             borderStartEndRadius: "0px",
//             borderBottomLeftRadius: "0px",
//             borderBottomRightRadius: "0px",
//           }}
//           disabled={i === currentPage}
//         >
//           {i}
//         </button>
//       );
//     }
//     return buttons;
//   };

//   const handlePrintBarcode = (product) => {
//     const printWindow = window.open("", "PRINT", "height=400,width=600");
//     printWindow.document.write("<html><head><title>Product Barcode</title>");
//     printWindow.document.write("</head><body>");
//     printWindow.document.write(`<h1>Barcode for ${product.name}</h1>`);
//     printWindow.document.write(
//       `<img src="${product.barcode}" alt="Barcode for ${product.name}" />`
//     );
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           margin: "20px",
//         }}
//       >
//         <h1>Product</h1>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             onClick={handleAddProductClick}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "7px",
//               backgroundColor: "#38B000",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               fontSize: "15px",
//               color: "white",
//             }}
//           >
//             <CirclePlus size={20} color="white" />
//             Add New Product
//           </button>
//           <button
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "7px",
//               backgroundColor: "#FF4F4F",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               fontSize: "15px",
//               color: "white",
//             }}
//           >
//             <img
//               src={Trash}
//               alt="Trash"
//               style={{ width: "16px", height: "16px" }}
//             />
//             Delete
//           </button>
//           <button
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "7px",
//               backgroundColor: "#FF9100",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               fontSize: "15px",
//               color: "white",
//             }}
//           >
//             <Printer size={20} color="white" />
//             Print Barcode
//           </button>
//         </div>
//       </div>
//       {showForm && (
//         <>
//           <div
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               backdropFilter: "blur(1px)",
//               zIndex: 999,
//             }}
//           >
//             <div
//               style={{
//                 position: "fixed",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: 1000,
//                 backgroundColor: "white",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <div
//                 className="form-container"
//                 style={{
//                   width: "1031px",
//                   height: "auto",
//                   display: "flex",
//                   flexDirection: "column",
//                   backgroundColor: "white",
//                   padding: "20px",
//                 }}
//               >
//                 <div
//                   style={{
//                     marginBottom: "20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <h1>{editMode ? "Edit Product" : "Add Product"}</h1>
//                   <X
//                     color="#538392"
//                     style={{ cursor: "pointer" }}
//                     onClick={handleCancelClick}
//                   />
//                 </div>
//                 <div>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Code:
//                     <input
//                       type="text"
//                       value={formValues.code}
//                       onChange={(e) =>
//                         setFormValues({ ...formValues, code: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Name:
//                     <input
//                       type="text"
//                       value={formValues.name}
//                       onChange={(e) =>
//                         setFormValues({ ...formValues, name: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Category:
//                     <input
//                       type="text"
//                       value={formValues.category}
//                       onChange={(e) =>
//                         setFormValues({
//                           ...formValues,
//                           category: e.target.value,
//                         })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Brand:
//                     <input
//                       type="text"
//                       value={formValues.brand}
//                       onChange={(e) =>
//                         setFormValues({ ...formValues, brand: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Purchase Price:
//                     <input
//                       type="number"
//                       value={formValues.purchasePrice}
//                       onChange={(e) =>
//                         setFormValues({
//                           ...formValues,
//                           purchasePrice: e.target.value,
//                         })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Selling Price:
//                     <input
//                       type="number"
//                       value={formValues.sellingPrice}
//                       onChange={(e) =>
//                         setFormValues({
//                           ...formValues,
//                           sellingPrice: e.target.value,
//                         })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "10px" }}>
//                     Discount:
//                     <input
//                       type="number"
//                       value={formValues.discount}
//                       onChange={(e) =>
//                         setFormValues({
//                           ...formValues,
//                           discount: e.target.value,
//                         })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <label style={{ display: "block", marginBottom: "20px" }}>
//                     Stock:
//                     <input
//                       type="number"
//                       value={formValues.stock}
//                       onChange={(e) =>
//                         setFormValues({ ...formValues, stock: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "5px",
//                         marginTop: "5px",
//                       }}
//                     />
//                   </label>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       gap: "10px",
//                     }}
//                   >
//                     {editMode ? (
//                       <button
//                         onClick={handleUpdateClick}
//                         style={{
//                           width: "88px",
//                           height: "33px",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           gap: "4px",
//                           fontSize: "12px",
//                           backgroundColor: "#4FC64C",
//                           borderRadius: "5px",
//                         }}
//                       >
//                         <PencilLine size={15} /> Update
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleAddClick}
//                         style={{
//                           width: "78px",
//                           height: "33px",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           gap: "4px",
//                           fontSize: "12px",
//                           backgroundColor: "#4FC64C",
//                           borderRadius: "5px",
//                         }}
//                       >
//                         <Save size={15} color="white" />
//                         Save
//                       </button>
//                     )}
//                     <button
//                       onClick={handleCancelClick}
//                       style={{
//                         width: "90px",
//                         height: "33px",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         gap: "4px",
//                         fontSize: "12px",
//                         backgroundColor: "#FF4F4F",
//                         borderRadius: "5px",
//                       }}
//                     >
//                       <CircleArrowLeft size={15} color="white" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <div style={{ margin: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "20px",
//           }}
//         >
//           <label style={{ fontSize: "15px" }}>
//             Show
//             <select
//               value={itemsPerPage}
//               onChange={handleItemsPerPageChange}
//               style={{
//                 marginLeft: "5px",
//                 marginRight: "5px",
//                 width: "67px",
//                 height: "27px",
//                 paddingLeft: "20px",
//                 fontSize: "15px",
//               }}
//             >
//               <option value={3}>3</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//             </select>
//             entries
//           </label>
//           <div style={{ fontSize: "15px" }}>
//             Search:
//             <input
//               style={{
//                 width: "147px",
//                 height: "29px",
//                 padding: "5px",
//                 marginLeft: "5px",
//               }}
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>Code</th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Category
//               </th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Brand
//               </th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Purchase Price
//               </th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Selling Price
//               </th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Discount
//               </th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Stock
//               </th>
//               <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedProducts.map((product, index) => (
//               <tr key={product.id}>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {index + 1}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.code}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.name}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.category}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.brand}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.purchasePrice}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.sellingPrice}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.discount}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {product.stock}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     display: "flex",
//                     gap: "5px",
//                   }}
//                 >
//                   <button
//                     onClick={() => handleEditClick(product)}
//                     style={{
//                       width: "36px",
//                       height: "30px",
//                       backgroundColor: "#4557F7",
//                       borderRadius: "0",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       padding: "0",
//                     }}
//                   >
//                     <img
//                       src={Pencil}
//                       alt="Pencil"
//                       style={{ width: "16px", height: "16px" }}
//                     />
//                   </button>
//                   <button
//                     onClick={() => handleRemoveClick(product.id)}
//                     style={{
//                       width: "36px",
//                       height: "30px",
//                       backgroundColor: "#FF0505",
//                       borderRadius: "0",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       padding: "0",
//                     }}
//                   >
//                     <img
//                       src={Trash}
//                       alt="Trash"
//                       style={{ width: "16px", height: "16px" }}
//                     />
//                     {/* <Trash size={20} color="white" /> */}
//                   </button>
//                   <button
//                     onClick={() => handlePrintBarcode(product)}
//                     style={{
//                       width: "36px",
//                       height: "30px",
//                       backgroundColor: "#4CAF50",
//                       borderRadius: "0",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       padding: "0",
//                     }}
//                   >
//                     <Printer size={16} color="white" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div
//           style={{
//             marginTop: "20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ fontSize: "14px" }}>
//             Showing page {currentPage} of {totalPages} (
//             {filteredProducts.length} entries)
//           </div>
//           <div>
//             <button
//               onClick={handleFirstPage}
//               disabled={currentPage === 1}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderRadius: "5px 0 0 5px",
//                 borderRight: "0px",
//               }}
//             >
//               {"<<"}
//             </button>
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderRight: "0px",
//               }}
//             >
//               Previous
//             </button>
//             {getPageButtons()}
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderLeft: "0px",
//               }}
//             >
//               Next
//             </button>
//             <button
//               onClick={handleLastPage}
//               disabled={currentPage === totalPages}
//               style={{
//                 border: "solid 1px #BCBCBC",
//                 backgroundColor: "white",
//                 color: "black",
//                 height: "30px",
//                 fontSize: "14px",
//                 borderRadius: "0 5px 5px 0",
//                 borderLeft: "0px",
//               }}
//             >
//               {">>"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React, { useState } from "react";
import JsBarcode from "jsbarcode";
import {
  CirclePlus,
  Save,
  CircleArrowLeft,
  X,
  PencilLine,
  Printer,
} from "lucide-react";
// import Setting from "../../../assets/image/Setting.png";
import Trash from "../../../assets/image/Trash.png";
import Pencil from "../../../assets/image/Pencil.png";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    code: "",
    name: "",
    category: "",
    brand: "",
    purchasePrice: "",
    sellingPrice: "",
    discount: "",
    stock: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddProductClick = () => {
    setShowForm(true);
    setEditMode(false);
    setFormValues({
      id: "",
      code: "",
      name: "",
      category: "",
      brand: "",
      purchasePrice: "",
      sellingPrice: "",
      discount: "",
      stock: "",
    });
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setFormValues({
      id: "",
      code: "",
      name: "",
      category: "",
      brand: "",
      purchasePrice: "",
      sellingPrice: "",
      discount: "",
      stock: "",
    });
  };

  const generateBarcode = (productCode) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, productCode, { format: "CODE128" });
    return canvas.toDataURL("image/png");
  };

  const handleAddClick = () => {
    if (formValues.name.trim() !== "") {
      // Check if the product code already exists
      const isDuplicate = products.some(
        (product) =>
          product.code.toLowerCase() === formValues.code.toLowerCase()
      );

      if (isDuplicate) {
        alert("This product code already exists. Please add a new product.");
        return;
      }

      if (editMode) {
        const updatedProducts = products.map((product) =>
          product.id === editProductId ? { ...product, ...formValues } : product
        );
        setProducts(updatedProducts);
      } else {
        const newProduct = {
          ...formValues,
          id: products.length + 1,
          barcode: generateBarcode(formValues.code),
        };
        setProducts([...products, newProduct]);
      }
      setShowForm(false);
      setFormValues({
        id: "",
        code: "",
        name: "",
        category: "",
        brand: "",
        purchasePrice: "",
        sellingPrice: "",
        discount: "",
        stock: "",
      });
    }
  };

  const handleUpdateClick = () => {
    if (formValues.name.trim() !== "") {
      // Check if the product code already exists, excluding the current product being edited
      const isDuplicate = products.some(
        (product) =>
          product.id !== editProductId &&
          product.code.toLowerCase() === formValues.code.toLowerCase()
      );

      if (isDuplicate) {
        alert("This product code already exists. Please use a different code.");
        return;
      }

      const updatedProducts = products.map((product) =>
        product.id === editProductId
          ? {
              ...product,
              ...formValues,
              barcode: generateBarcode(formValues.code),
            }
          : product
      );

      setProducts(updatedProducts);
      setShowForm(false);
      setFormValues({
        id: "",
        code: "",
        name: "",
        category: "",
        brand: "",
        purchasePrice: "",
        sellingPrice: "",
        discount: "",
        stock: "",
      });
      setEditProductId(null);
      setEditMode(false);
    }
  };

  const handleEditClick = (product) => {
    setEditMode(true);
    setEditProductId(product.id);
    setFormValues({ ...product });
    setShowForm(true);
  };

  const handleRemoveClick = (id) => {
    if (window.confirm("Do you want to delete it?")) {
      const updatedProducts = products
        .filter((product) => product.id !== id)
        .map((product, index) => ({ ...product, id: index + 1 }));
      setProducts(updatedProducts);
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm("Do you want to delete the selected products?")) {
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );
      setProducts(updatedProducts);
      setSelectedProducts([]);
    }
  };

  const handlePrintSelectedBarcodes = () => {
    selectedProducts.forEach((id) => {
      const product = products.find((product) => product.id === id);
      if (product) {
        handlePrintBarcode(product);
      }
    });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedProducts = filteredProducts.slice(
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

  const handlePrintBarcode = (product) => {
    const printWindow = window.open("", "PRINT", "height=400,width=600");
    printWindow.document.write("<html><head><title>Product Barcode</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(`<h1>Barcode for ${product.name}</h1>`);
    printWindow.document.write(
      `<img src="${product.barcode}" alt="Barcode for ${product.name}" />`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(id)
        ? prevSelectedProducts.filter((productId) => productId !== id)
        : [...prevSelectedProducts, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((product) => product.id));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <h1>Product</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleAddProductClick}
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
            }}
          >
            <CirclePlus size={20} color="white" />
            Add New Product
          </button>
          <button
            onClick={handleDeleteSelected}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              backgroundColor: "#FF4F4F",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "15px",
              color: "white",
            }}
          >
            <img
              src={Trash}
              alt="Trash"
              style={{ width: "16px", height: "16px" }}
            />
            Delete
          </button>
          <button
            onClick={handlePrintSelectedBarcodes}
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
            }}
          >
            <Printer size={20} color="white" />
            Print Barcode
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
              }}
            >
              <div
                className="form-container"
                style={{
                  width: "1031px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>{editMode ? "Edit Product" : "Add Product"}</h1>
                  <X
                    color="#538392"
                    style={{ cursor: "pointer" }}
                    onClick={handleCancelClick}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Code:
                    <input
                      type="text"
                      value={formValues.code}
                      onChange={(e) =>
                        setFormValues({ ...formValues, code: e.target.value })
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
                    Category:
                    <input
                      type="text"
                      value={formValues.category}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          category: e.target.value,
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
                    Brand:
                    <input
                      type="text"
                      value={formValues.brand}
                      onChange={(e) =>
                        setFormValues({ ...formValues, brand: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    Purchase Price:
                    <input
                      type="number"
                      value={formValues.purchasePrice}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          purchasePrice: e.target.value,
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
                    Selling Price:
                    <input
                      type="number"
                      value={formValues.sellingPrice}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          sellingPrice: e.target.value,
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
                    Discount:
                    <input
                      type="number"
                      value={formValues.discount}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          discount: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </label>
                  <label style={{ display: "block", marginBottom: "20px" }}>
                    Stock:
                    <input
                      type="number"
                      value={formValues.stock}
                      onChange={(e) =>
                        setFormValues({ ...formValues, stock: e.target.value })
                      }
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
          }}
        >
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
          <div style={{ fontSize: "15px" }}>
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
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={selectedProducts.length === paginatedProducts.length}
                />
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Code</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Category
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Brand
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Purchase Price
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Selling Price
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Discount
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Stock
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={product.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.code}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.category}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.brand}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.purchasePrice}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.sellingPrice}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.discount}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.stock}
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
                    onClick={() => handleEditClick(product)}
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
                    onClick={() => handleRemoveClick(product.id)}
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
                  <button
                    onClick={() => handlePrintBarcode(product)}
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
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "14px" }}>
            Showing page {currentPage} of {totalPages} (
            {filteredProducts.length} entries)
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

export default Product;
