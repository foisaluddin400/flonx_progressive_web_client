
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

export const handleDeleteConfirm = ({ title, content, onConfirm }) => {
  Modal.confirm({
    centered: true,
    closable: false,
    icon: null, // disable default icon
    className: "custom-delete-modal",

    title: (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            backgroundColor: "#2E2838",
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 10px",
          }}
        >
          <ExclamationCircleOutlined style={{ fontSize: "24px", color: "#FF4D4F" }} />
        </div>
        <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#fff" }}>{title}</h2>
        <p style={{ fontSize: "14px", color: "#ccc" }}>{content}</p>
      </div>
    ),

    okText: "Confirm",
    cancelText: "Cancel",

    okType: "default", // we’ll override styles manually
    onOk: onConfirm,

    okButtonProps: {
      style: {
        backgroundColor: "#FF4D4F", // red confirm button
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "6px 20px",
        fontWeight: "bold",
      },
    },
    cancelButtonProps: {
      style: {
        backgroundColor: "#555", // dark gray cancel button
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "6px 20px",
        fontWeight: "bold",
      },
    },
  });
};