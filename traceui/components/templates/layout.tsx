import { Box } from "@obolnetwork/obol-ui";
import { Navbar } from "../organisms/navbar/navbar";
export default function Layout({ children }) {

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      {children}    
    </Box>
  );
}
