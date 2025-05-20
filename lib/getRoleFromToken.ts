/* eslint-disable */

import { jwtDecode } from "jwt-decode";

export const getRolesFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.resource_access["tcs-client"]?.roles || [];
  } catch (error) {
    return [];
  }
};
