import { useState, useEffect } from 'react';
import { fetchMonAn } from '../../data/fetchMonAn';

function ChiTietMonAn({ idMonAn }) {
  const [monAn, setMonAn] = useState(null);
  const [dangTai, setDangTai] = useState(false);
  const [loi, setLoi] = useState(null);

  useEffect(() => {
    if (!idMonAn) {
      setMonAn(null);
      return;
    }

    let daHuy = false;
    setDangTai(true);
    setLoi(null);

    console.log(`⏳ Bắt đầu tải món id=${idMonAn}`);

    fetchMonAn(idMonAn)
      .then((data) => {
        if (daHuy) {
          console.log(`🚫 Bỏ qua kết quả cũ id=${idMonAn}`);
          return;
        }
        console.log(`✅ Tải xong món id=${idMonAn}: ${data.ten}`);
        setMonAn(data);
        setDangTai(false);
      })
      .catch((err) => {
        if (daHuy) return;
        setLoi(err.message);
        setDangTai(false);
      });

    return () => {
      daHuy = true;
      console.log(`🧹 Cleanup cho id=${idMonAn}`);
    };
  }, [idMonAn]);

  if (!idMonAn) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>🍽️</div>
        <p style={styles.emptyText}>Chọn một món ăn để xem chi tiết</p>
      </div>
    );
  }

  if (dangTai) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingBar}>
          <div style={styles.loadingBarFill}></div>
        </div>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Đang tải món ăn...</p>
      </div>
    );
  }

  if (loi) {
    return <div style={styles.error}>❌ {loi}</div>;
  }

  if (!monAn) return null;

  return (
    <article className="mon-an-card" style={styles.card}>
      {/* === HERO BANNER === */}
      <div style={styles.hero}>
        {/* SVG hoa văn trống đồng */}
        <svg
          style={styles.pattern}
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="trongDong"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="30"
                cy="30"
                r="22"
                fill="none"
                stroke="rgba(255,215,0,0.15)"
                strokeWidth="1"
              />
              <circle
                cx="30"
                cy="30"
                r="14"
                fill="none"
                stroke="rgba(255,215,0,0.12)"
                strokeWidth="1"
              />
              <circle
                cx="30"
                cy="30"
                r="6"
                fill="none"
                stroke="rgba(255,215,0,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#trongDong)" />
        </svg>

        <div style={styles.heroInner}>
          <div className="hero-emoji" style={styles.emojiWrap}>
            <span style={styles.emoji}>{monAn.emoji}</span>
          </div>
          <div style={styles.heroText}>
            <h2 style={styles.ten}>{monAn.ten}</h2>
            <div style={styles.badgeRow}>
              {monAn.dacSan && (
                <span style={styles.badge}>⭐ Đặc sản Huế</span>
              )}
              <span style={styles.badgeGhost}>
                🕒 {monAn.thoiGian}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* === BODY === */}
      <div style={styles.body}>
        <p style={styles.moTa}>{monAn.moTa}</p>

        {/* Tags */}
        <div style={styles.tagsRow}>
          {monAn.tags.map((tag, i) => (
            <span key={i} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Grid thông tin */}
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Giá tham khảo</span>
            <span style={styles.infoValue}>{monAn.gia}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Đánh giá</span>
            <span style={styles.infoValue}>
              ⭐ {monAn.diem}
              <span style={styles.infoSub}> / 5</span>
            </span>
          </div>
        </div>

        {/* Địa chỉ */}
        <div style={styles.diaChiBox}>
          <span style={styles.diaChiIcon}>📍</span>
          <div>
            <div style={styles.diaChiLabel}>Thưởng thức tại</div>
            <div style={styles.diaChiText}>{monAn.diaChi}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

const styles = {
  empty: {
    padding: 80,
    textAlign: 'center',
    color: '#a0522d',
    fontStyle: 'italic',
    border: '2px dashed #d4b483',
    borderRadius: 20,
    background: 'rgba(255,255,255,0.4)',
  },
  emptyIcon: { fontSize: 64, marginBottom: 16, opacity: 0.6 },
  emptyText: { fontSize: 16 },
  loading: {
    padding: 60,
    textAlign: 'center',
    color: '#8b0000',
    position: 'relative',
  },
  loadingBar: {
    height: 3,
    background: 'rgba(192,57,43,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 32,
  },
  loadingBarFill: {
    height: '100%',
    width: '40%',
    background:
      'linear-gradient(90deg, transparent, #c0392b, #f39c12, #c0392b, transparent)',
    animation: 'shimmer 1.4s ease-in-out infinite',
  },
  spinner: {
    width: 56,
    height: 56,
    border: '3px solid rgba(192,57,43,0.15)',
    borderTop: '3px solid #c0392b',
    borderRight: '3px solid #f39c12',
    borderRadius: '50%',
    margin: '0 auto 20px',
    animation: 'spin 0.9s linear infinite',
  },
  loadingText: {
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#a0522d',
    fontWeight: 500,
  },
  error: {
    padding: 24,
    background: '#ffe6e6',
    color: '#c0392b',
    borderRadius: 12,
    textAlign: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow:
      '0 20px 60px rgba(139, 0, 0, 0.15), 0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid rgba(192,57,43,0.08)',
    position: 'relative',
  },
  hero: {
    position: 'relative',
    height: 200,
    background:
      'linear-gradient(135deg, #8b0000 0%, #5a0000 50%, #3d0000 100%)',
    overflow: 'hidden',
  },
  pattern: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  heroInner: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 40px',
    gap: 32,
  },
  emojiWrap: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.25), rgba(255,215,0,0.05) 70%)',
    border: '2px solid rgba(255,215,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow:
      'inset 0 0 40px rgba(255,215,0,0.15), 0 8px 24px rgba(0,0,0,0.3)',
  },
  emoji: {
    fontSize: 68,
    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
  },
  heroText: {
    flex: 1,
  },
  ten: {
    margin: 0,
    fontSize: 42,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: 1,
    fontFamily: '"Playfair Display", Georgia, serif',
    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
    lineHeight: 1.1,
  },
  badgeRow: {
    display: 'flex',
    gap: 10,
    marginTop: 14,
    flexWrap: 'wrap',
  },
  badge: {
    display: 'inline-block',
    background:
      'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
    color: '#fff',
    padding: '7px 16px',
    borderRadius: 30,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.5,
    boxShadow: '0 6px 16px rgba(243,156,18,0.5)',
  },
  badgeGhost: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    padding: '7px 16px',
    borderRadius: 30,
    fontSize: 13,
    fontWeight: 500,
    border: '1px solid rgba(255,255,255,0.25)',
    backdropFilter: 'blur(8px)',
  },
  body: { padding: '28px 32px 32px' },
  moTa: {
    color: '#4a4a4a',
    lineHeight: 1.8,
    fontSize: 15.5,
    marginTop: 0,
    marginBottom: 20,
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontWeight: 500,
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    padding: '5px 12px',
    background: 'rgba(192,57,43,0.08)',
    color: '#8b0000',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid rgba(192,57,43,0.15)',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
    marginBottom: 18,
  },
  infoItem: {
    background:
      'linear-gradient(135deg, #fffbf0 0%, #fdf2d0 100%)',
    padding: '16px 20px',
    borderRadius: 14,
    border: '1px solid rgba(212,180,131,0.4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  infoLabel: {
    fontSize: 10.5,
    color: '#a0522d',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 700,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: 700,
    color: '#8b0000',
    fontFamily: '"Playfair Display", Georgia, serif',
  },
  infoSub: {
    fontSize: 14,
    color: '#a0522d',
    fontWeight: 500,
  },
  diaChiBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '16px 20px',
    background:
      'linear-gradient(135deg, #fafafa 0%, #f5f0e8 100%)',
    borderRadius: 14,
    border: '1px dashed #d4b483',
  },
  diaChiIcon: {
    fontSize: 24,
    filter: 'drop-shadow(0 2px 4px rgba(192,57,43,0.3))',
  },
  diaChiLabel: {
    fontSize: 10.5,
    color: '#a0522d',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 700,
    marginBottom: 2,
  },
  diaChiText: {
    color: '#555',
    fontSize: 14,
    fontWeight: 500,
  },
};

if (typeof document !== 'undefined' && !document.getElementById('lab6-anim')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'lab6-anim';
  styleEl.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }
    @keyframes floatEmoji {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    .hero-emoji { animation: floatEmoji 3s ease-in-out infinite; }
    .mon-an-card { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease; }
    .mon-an-card:hover { transform: translateY(-4px); box-shadow: 0 30px 80px rgba(139,0,0,0.22), 0 4px 12px rgba(0,0,0,0.06); }
    .nut-mon { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .nut-mon:hover { transform: translateX(4px); box-shadow: 0 6px 20px rgba(192,57,43,0.18); }
    .nut-mon.active { transform: translateX(8px); }
  `;
  document.head.appendChild(styleEl);
}

export default ChiTietMonAn;