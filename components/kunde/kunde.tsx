import { Login } from "../login";
import { BestilleBillett } from "./bestilleBillett";
import { TilgjengeligeVisninger } from "./tilgjengeligeVisninger";

export function Kunde() {
  return (
    <>
      <h1 className="text-3xl text-center underline p-5">Norges beste kino!</h1>
      <div className="flex justify-evenly container mx-auto">
        <div>
          <TilgjengeligeVisninger />
          <BestilleBillett />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </>
  );
}
