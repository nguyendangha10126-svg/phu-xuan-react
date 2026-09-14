import { useState } from 'react';
import ChiTietMonAn from './ChiTietMonAn';
import { fetchTatCaMonAn } from '../../data/fetchMonAn';

function TrangMonAn() {
  const danhSach = fetchTatCaMonAn();
  const [idDangChon, setIdDangChon] = useState(danhSach[0].id);

  return (
    <div style={styles.wrap}>
      {/* === SECTION HEADER === */}
      <div style={styles.sectionHeader}>
        <div style={styles.ornament}>
          <span style={styles.ornamentLine}></span>
          <span style={styles.ornamentIcon}>✦</span>
          <span style={styles.ornamentLine}></span>
        </div>
        <h2 style={styles.tieuDe}>Ẩm thực Huế</h2>
        <p style={styles.phuDe}>
          Chọn một món để khám phá hương vị Cố đô
        </p>
        <div style={styles.divider}></div>
      </div>

      <div style={styles.layout}>
        {/* === SIDEBAR === */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarTitle}>Thực đơn</div>
          {danhSach.map((mon) => {
            const dangChon = mon.id === idDangChon;
            return (
              <button
                key={mon.id}
                onClick={() => setIdDangChon(mon.id)}
                className={`nut-mon ${dangChon ? 'active' : ''}`}
                style={{
                  ...styles.nutMon,
                  ...(dangChon ? styles.nutMonChon : {}),
                }}
              >
                {dangChon && <span style={styles.activeBar}></span>}
                <span style={styles.nutEmoji}>{mon.emoji}</span>
                <span style={styles.nutTen}>{mon.ten}</span>
                {mon.dacSan && (
                  <span style={styles.nutSao}>⭐</span>
                )}
              </button>
            );
          })}

          <div style={styles.sidebarFooter}>
            <div style={styles.sidebarFooterLine}></div>
            <p style={styles.sidebarFooterText}>
              {danhSach.length} món · Di sản Huế
            </p>
          </div>
        </aside>

        {/* === CHI TIẾT === */}
        <section style={styles.chiTiet}>
          <ChiTietMonAn idMonAn={idDangChon} />
        </section>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 1080,
    margin: '60px auto 80px',
    padding: '0 24px',
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    position: 'relative',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 44,
  },
  ornament: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
    color: '#c0392b',
  },
  ornamentLine: {
    width: 40,
    height: 1,
    background:
      'linear-gradient(90deg, transparent, #c0392b, transparent)',
  },
  ornamentIcon: {
    fontSize: 14,
    opacity: 0.7,
  },
  tieuDe: {
    fontSize: 44,
    color: '#8b0000',
    margin: '8px 0 0',
    fontWeight: 700,
    fontFamily: '"Playfair Display", Georgia, serif',
    letterSpacing: 1,
    lineHeight: 1.1,
  },
  phuDe: {
    color: '#a0522d',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 12,
    marginBottom: 0,
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontWeight: 500,
  },
  divider: {
    width: 100,
    height: 2,
    background:
      'linear-gradient(90deg, transparent, #c0392b, #f39c12, #c0392b, transparent)',
    margin: '20px auto 0',
    borderRadius: 2,
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: 28,
    alignItems: 'start',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    position: 'sticky',
    top: 24,
  },
  sidebarTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#a0522d',
    fontWeight: 700,
    paddingLeft: 4,
    marginBottom: 8,
  },
  nutMon: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    background: '#fff',
    border: '1px solid rgba(192,57,43,0.12)',
    borderRadius: 14,
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
    fontFamily: 'inherit',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    position: 'relative',
    overflow: 'hidden',
  },
  nutMonChon: {
    background:
      'linear-gradient(135deg, #c0392b 0%, #8b0000 50%, #5a0000 100%)',
    color: '#fff',
    borderColor: '#8b0000',
    fontWeight: 600,
    boxShadow: '0 12px 28px rgba(139,0,0,0.35)',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background:
      'linear-gradient(180deg, #f39c12, #e67e22)',
    borderRadius: '0 4px 4px 0',
  },
  nutEmoji: {
    fontSize: 22,
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
  },
  nutTen: {
    flex: 1,
    fontWeight: 'inherit',
    letterSpacing: 0.3,
  },
  nutSao: {
    fontSize: 12,
    opacity: 0.85,
  },
  sidebarFooter: {
    marginTop: 16,
    textAlign: 'center',
  },
  sidebarFooterLine: {
    width: '60%',
    height: 1,
    margin: '0 auto 12px',
    background:
      'linear-gradient(90deg, transparent, #d4b483, transparent)',
  },
  sidebarFooterText: {
    fontSize: 11,
    color: '#a0522d',
    letterSpacing: 1.5,
    fontStyle: 'italic',
    margin: 0,
  },
  chiTiet: {
    minHeight: 500,
  },
};

export default TrangMonAn;