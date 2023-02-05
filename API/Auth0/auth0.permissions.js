const userPermissions = {
  claim: "own-claim:read-create-delete",
  location: "own-location:read-create-update",
  question: "own-question:create",
  review: "own-review:create",
  sale: "own-sale:read-create",
  user: "own-user:read-update-delete"
};

const adminPermissions = {
  branchOffice: "all-branchoffice:create-update-delete", //El permiso "read" es público...
  brand: "all-brand:create-update-delete",
  category: "all-category:create-update-delete",
  claim: "all-claim:read-create-update-delete",
  location: "all-location:read-create-update-delete",
  product: "all-product:create-update-delete",
  question: "all-question:create-update-delete",
  review: "all-review:create-update-delete",
  sale: "all-sale:read-create-update-delete",
  user: "all-user:read-update-delete"
};

module.exports = {
  userPermissions,
  adminPermissions
};