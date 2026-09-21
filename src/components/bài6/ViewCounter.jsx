import { useState, useEffect, useRef } from 'react';

function ViewCounter() {
  // State: số lượt xem hiển thị ra UI
  const [views, setViews] = useState(0);

  // useRef: lưu ID của interval (không gây re-render)
  const intervalRef = useRef(null);

  // useRef: lưu thời điểm bắt đầu xem
  const startTimeRef = useRef(Date.now());

  // useRef: đếm số lần component render (chỉ để debug)
  const renderCountRef = useRef(0);

  // Mỗi lần render, tăng bộ đếm render
  renderCountRef.current += 1;

  // useEffect: thiết lập "đồng hồ" tăng lượt xem mỗi giây
  useEffect(() => {
    console.log('🟢 ViewCounter mounted — bắt đầu đếm');

    intervalRef.current = setInterval(() => {
      setViews((prev) => prev + 1);
    }, 1000);

    // Cleanup: chạy khi unmount
    return () => {
      console.log('🔴 ViewCounter unmounted — dọn dẹp interval');
      clearInterval(intervalRef.current);
    };
  }, []); // [] = chỉ chạy 1 lần sau mount

  // Tính thời lượng đã xem (giây)
  const elapsedSeconds = Math.floor(
    (Date.now() - startTimeRef.current) / 1000
  );

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '24px auto',
        padding: 20,
        border: '2px solid #c0392b',
        borderRadius: 12,
        background: 'linear-gradient(135deg, #fdf6e3 0%, #fceabb 100%)',
        fontFamily: 'system-ui, sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ color: '#8b0000', marginTop: 0 }}>
        🏯 Đại Nội Huế — Lượt xem
      </h2>

      <p style={{ fontSize: 14, color: '#555', fontStyle: 'italic' }}>
        Cố đô Huế · Di sản Văn hóa Thế giới UNESCO
      </p>

      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#c0392b',
          textAlign: 'center',
          margin: '20px 0',
        }}
      >
        {views.toLocaleString('vi-VN')}
      </div>

      <p style={{ textAlign: 'center', color: '#666' }}>
        👁️ lượt xem (tăng mỗi giây)
      </p>

      <hr style={{ border: 'none', borderTop: '1px dashed #c0392b' }} />

      <div style={{ fontSize: 12, color: '#888', lineHeight: 1.8 }}>
        <div>⏱️ Thời gian xem: <strong>{elapsedSeconds}s</strong></div>
        <div>🔄 Số lần render: <strong>{renderCountRef.current}</strong></div>
        <div style={{ marginTop: 8, fontStyle: 'italic' }}>
          💡 Mở Console (F12) để thấy log mount/unmount
        </div>
      </div>
    </div>
  );
}

export default ViewCounter;