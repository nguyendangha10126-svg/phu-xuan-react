// src/components/Bài7/TheDiaDanh.jsx
// LAB 2 — Component CON: hiển thị 1 thẻ địa danh + checkbox
// ⚠️ KHÔNG giữ state riêng — chỉ nhận props và báo lên cha

export default function TheDiaDanh({ diaDanh, dangChon, onChon }) {
  return (
    <div className={`the-dia-danh ${dangChon ? 'dang-chon' : ''}`}>
      {/* Dùng <label> bọc <input> để click vào chữ cũng tick được checkbox */}
      <label>
        <input
          type="checkbox"
          checked={dangChon}
          onChange={() => onChon(diaDanh.id)}
        />
        <span className="ten">{diaDanh.ten}</span>
        <span className="loai"> {diaDanh.loai}</span>
      </label>
    </div>
  );
}