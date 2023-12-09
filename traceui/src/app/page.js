import MetaMaskConnect from './metamask';
import MfgReg from "@/app/mfgreg";

export default function Home() {
  return (
      <div>
          <div>
              <h1>MetaMask Connect Example</h1>
              <MetaMaskConnect />
          </div>
          <div>
              <h1>Manufacturer registration</h1>
              <MfgReg />
          </div>
          <div>
              <h1>Item registration</h1>
          </div>
          <div>
              <h1>Intermediary attestation</h1>
          </div>
          <div>
              <h1>Trace history</h1>
          </div>
      </div>
  );
}
