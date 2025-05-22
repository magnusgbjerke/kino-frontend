import { useSession } from "next-auth/react";
import { Login } from "../login";
import { BestilleBillett } from "./bestilleBillett";
import { TilgjengeligeVisninger } from "./tilgjengeligeVisninger";

export function Kunde() {
  const { data: session } = useSession();
  return (
    <>
      <h1 className="text-3xl text-center underline p-5">Norges beste kino!</h1>
      <div className="flex justify-evenly container mx-auto">
        <div>
          <TilgjengeligeVisninger />
          <BestilleBillett />
        </div>
        <div>
          {session && (
            <div>
              <p>
                Velkommen {session?.user?.email} ! <br /> Du har ingen
                rettigheter for øyeblikket. <br /> Vennligst ta kontakt med
                admin for tildeling av rettigheter.
              </p>
              <button
                onClick={async () => {
                  window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=http://localhost:3000/auth/signout`;
                }}
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Logg ut
              </button>
            </div>
          )}
          <Login />
        </div>
      </div>
    </>
  );
}
