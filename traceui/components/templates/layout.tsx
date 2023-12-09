import { Box } from "@obolnetwork/obol-ui";
import { Navbar } from "../organisms/navbar/navbar";
// import { useHasMounted } from "hooks";

export default function Layout({ children }) {
  // check if route is secure

  // const hasMounted = useHasMounted();

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {children}    
    </Box>
  );
}
