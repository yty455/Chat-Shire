import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

interface ColorPickerDialogProps {
  // open: boolean;
  // onClose: () => void;
  onSelectColor: (color: string) => void;
}

function ColorPickerDialog({
  // open,
  // onClose,
  onSelectColor,
}: ColorPickerDialogProps) {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = () => {
    onSelectColor(selectedColor);
    // onClose();
  };

  return (
    <div>
      <div>
        <h2>색상 선택</h2>
        <div>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => setSelectedColor("ONLINE")}
          >
            ONLINE
          </button>
          <button
            style={{ backgroundColor: "orange" }}
            onClick={() => setSelectedColor("AWAY")}
          >
            AWAY
          </button>
          <button
            style={{ backgroundColor: "gray" }}
            onClick={() => setSelectedColor("OFFLINE")}
          >
            OFFLINE
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => setSelectedColor("DND")}
          >
            DND
          </button>
        </div>
        <Button onClick={handleColorSelect}>선택</Button>
      </div>
    </div>
  );
}

export default ColorPickerDialog;
