// src/components/Bài7/TheDiaDanh.jsx
// LAB 2 + BONUS: bọc memo để tránh re-render không cần thiết
import { memo } from 'react';

const TheDiaDanh = memo(function TheDiaDanh({ diaDanh, dangChon, onChon }) {
  return (
    <div className={`the-dia-danh ${dangChon ? 'dang-chon' : ''}`}>
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
});

export default TheDiaDanh;