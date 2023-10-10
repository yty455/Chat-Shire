import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import styles from "./ColorPicker.module.css"

interface ColorPickerDialogProps {
  // open: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

function ColorPickerDialog({
  // open,
  onClose,
  onSelectColor,
}: ColorPickerDialogProps) {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    onClose();
  };

  return (
    <div>
      <div>
        <h2 style={{fontFamily:'preBd', fontSize:'20px', margin: 0, marginTop: '-3px'}}>상태 변경</h2>
        <div>
          <button
            className={styles.onlineBtn}
            onClick={() => handleColorSelect("ONLINE")}
          >
            온라인
          </button>
          <button
            className={styles.awayBtn}
            onClick={() => handleColorSelect("AWAY")}
          >
            자리비움
          </button>
          <button
            className={styles.offBtn}
            onClick={() => handleColorSelect("OFFLINE")}
          >
            오프라인
          </button>
          <button
            className={styles.dndBtn}
            onClick={() => handleColorSelect("DND")}
          >
            방해금지
          </button>
        </div>
        {/* <Button onClick={handleColorSelect}>선택</Button> */}
      </div>
    </div>
  );
}

export default ColorPickerDialog;
