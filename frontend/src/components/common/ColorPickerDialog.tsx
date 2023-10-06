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

  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    // onClose();
  };

  return (
    <div>
      <div>
        <h2>상태 변경</h2>
        <div>
          <button
            style={{
              backgroundColor: "green",
              borderRadius: "0px",
              color: "white",
            }}
            onClick={() => handleColorSelect("ONLINE")}
          >
            ONLINE
          </button>
          <button
            style={{
              backgroundColor: "orange",
              borderRadius: "0px",
              color: "white",
            }}
            onClick={() => handleColorSelect("AWAY")}
          >
            AWAY
          </button>
          <button
            style={{
              backgroundColor: "gray",
              borderRadius: "0px",
              color: "white",
            }}
            onClick={() => handleColorSelect("OFFLINE")}
          >
            OFFLINE
          </button>
          <button
            style={{
              backgroundColor: "red",
              borderRadius: "0px",
              color: "white",
            }}
            onClick={() => handleColorSelect("DND")}
          >
            DND
          </button>
        </div>
        {/* <Button onClick={handleColorSelect}>선택</Button> */}
      </div>
    </div>
  );
}

export default ColorPickerDialog;
