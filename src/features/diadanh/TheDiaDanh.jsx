import { memo } from 'react';

/**
 * Component con hiển thị 1 địa danh.
 * Bọc bằng React.memo → chỉ re-render khi props THAY ĐỔI (shallow compare).
 */
function TheDiaDanh({ diaDanh, onYeuThich, daYeuThich }) {
  // 🎯 LOG: để quan sát khi nào con re-render
  console.log(`🎴 Render TheDiaDanh: ${diaDanh.ten}`);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.emoji}>{diaDanh.emoji}</span>
        <div style={styles.info}>
          <h3 style={styles.ten}>{diaDanh.ten}</h3>
          <div style={styles.meta}>
            <span style={styles.badge}>{diaDanh.loai}</span>
            <span style={styles.khuVuc}>📍 {diaDanh.khuVuc}</span>
          </div>
        </div>
        <button
          onClick={() => onYeuThich(diaDanh.id)}
          style={{
            ...styles.heartBtn,
            ...(daYeuThich ? styles.heartBtnActive : {}),
          }}
          title={daYeuThich ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
        >
          {daYeuThich ? '❤️' : '🤍'}
        </button>
      </div>
      <p style={styles.moTa}>{diaDanh.moTa}</p>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 14,
    padding: '16px 18px',
    border: '1px solid rgba(192,57,43,0.1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.25s ease',
  },
  header: {
    display: 'flex',
    gap: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 36,
    flexShrink: 0,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
  },
  info: { flex: 1, minWidth: 0 },
  ten: {
    margin: 0,
    fontSize: 18,
    color: '#8b0000',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 700,
  },
  meta: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  badge: {
    fontSize: 11,
    padding: '3px 10px',
    background: 'linear-gradient(135deg, #f39c12, #e67e22)',
    color: '#fff',
    borderRadius: 12,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  khuVuc: {
    fontSize: 12,
    color: '#a0522d',
    fontStyle: 'italic',
  },
  heartBtn: {
    border: 'none',
    background: 'transparent',
    fontSize: 24,
    cursor: 'pointer',
    padding: 6,
    borderRadius: '50%',
    transition: 'transform 0.2s',
    flexShrink: 0,
  },
  heartBtnActive: {
    transform: 'scale(1.15)',
  },
  moTa: {
    margin: 0,
    fontSize: 13.5,
    color: '#666',
    lineHeight: 1.6,
    fontFamily: '"Cormorant Garamond", Georgia, serif',
  },
};

// 🎯 BỌC React.memo: chỉ re-render khi props đổi (shallow compare)
export default memo(TheDiaDanh);