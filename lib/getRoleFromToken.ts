/* eslint-disable */

import { jwtDecode } from "jwt-decode";

export interface KeycloakJwtPayload {
  resource_access?: {
    [clientId: string]: {
      roles: string[];
    };
  };
}

export const getRolesFromToken = (token: string) => {
  try {
    const decoded = jwtDecode<KeycloakJwtPayload>(token);
    return decoded.resource_access?.["kino-client"]?.roles || [];
  } catch (error) {
    return [];
  }
};
