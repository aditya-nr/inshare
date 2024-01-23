import IconButton from "@/components/custom/IconButton";
import { FooterProp } from "@/types";
import { PaperPlaneTilt, Paperclip } from "@phosphor-icons/react";
import React from "react";

export const Footer = ({
  handleFile,
  text,
  setText,
  handleSend,
}: FooterProp) => {
  return (
    <>
      <div className="flex items-center p-2 gap-1 shadow-[0_35px_60px_4px_rgba(0,0,0,0.3)]">
        {/* attachment */}
        <label htmlFor="fileUpload">
          <IconButton>
            <Paperclip size={32} style={{ color: "grey" }} />
          </IconButton>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFile}
          />
        </label>

        {/* input field */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => e.key == "Enter" && handleSend()}
          placeholder="Say something..."
          className="outline-none flex-1"
        />

        {/* send */}
        <IconButton onClick={handleSend}>
          <PaperPlaneTilt size={32} style={{ color: "green" }} />
        </IconButton>
      </div>
    </>
  );
};
