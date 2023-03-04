 const ROLE_BASE_ROTE={
    ROLE_BASE_ADMIN : "Admin",
    ROLE_BASE_ACCOUNTENT:"Accountent",
    ROLE_BASE_MANAGER:"Manager"

}

const API_END_POINT={
    GET_SUPPLIERS_DATA:"api/inventory/fetchSupplier",
    POST_SUPPLIER_DATA:"api/inventory/createSupplier",
    UPDATE_SUPPLIERS_DATA:"api/inventory/editSupplier",
    DETELE_SUPPLIER_DATA:"api/inventory/deletSuppliers",
    // Units
    GET_UNIQUE_SUPPLIER_DATA:"api/inventory/fetchUniqueDataSupplier",
    POST_UNIT_DATA:"api/inventory/createUnits",
    UPDATE_UNIT_DATA:"api/inventory/updateUnitsData",
    GET_UNIT_DATA:"api/inventory/getunitsdata",
    GET_UNIT_UNIQUE_DATA:"api/inventory/getUniqueData",
    DELETE_UNIT_DATA:"api/inventory/deleteUnitsData",
    // Categories
    GET_CATEGORIES_DATA:"api/inventory/getCategoriesData",
    POST_CATEGORIES_DATA:"api/inventory/createcategories",
    DELETE_CATEGORIES_DATA:"api/inventory/deleteCategories",
    UPDATE_CATEGORIES_DATA:"api/inventory/editCategories",
    GET_UNIQUE_CATEGORIES_DATA:"api/inventory/getUniqueCateoriesData",
    // Products
    POST_PRODUCTS_DATA:"api/inventory/createProducts",
    GET_PRODUCTS_DATA:"api/inventory/getProductData",
    UPDATE_PRODUCTS_DATA:"api/inventory/updateData",
    DELETE_PRODUCTS_DATA:"api/inventory/productsDeleted",
    GET_UNIQUE_PRODUCTS_DATA:"api/inventory/getUniqueProductsData"

}

export default { ROLE_BASE_ROTE,API_END_POINT}