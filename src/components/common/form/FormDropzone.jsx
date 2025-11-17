import { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

function FileDropzone({ onFiles }) {
  const [fileList, setFileList] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setFileList(newFiles);
    onFiles(newFiles);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        borderStyle: "dashed",
        borderColor: isDragOver ? "primary.main" : "grey.400",
        bgcolor: isDragOver ? "action.hover" : "inherit",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => document.getElementById("fileInput").click()}
    >
      <input
        id="fileInput"
        type="file"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Typography>
        Arrastra tus archivos aquí o haz clic para seleccionarlos
      </Typography>

      {fileList.length > 0 && (
        <Box sx={{ mt: 2, textAlign: "left" }}>
          <Typography variant="subtitle2">Archivos seleccionados:</Typography>
          <ul>
            {fileList.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </Box>
      )}
    </Paper>
  );
}
export default FileDropzone;
