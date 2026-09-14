import ViewCounter from './components/lab6/ViewCounter';
import TrangMonAn from './features/food/TrangMonAn';
import TimMonAn from './features/food/TimMonAn';
import DanhSachDiaDanh from './features/diadanh/DanhSachDiaDanh';
import './App.css';

function App() {
  return (
    <div className="App" style={styles.app}>
      {/* SVG pattern nền toàn trang */}
      <svg style={styles.bgPattern} aria-hidden="true">
        <defs>
          <pattern
            id="bgPattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="rgba(192,57,43,0.05)"
              strokeWidth="1"
            />
            <circle
              cx="60"
              cy="60"
              r="24"
              fill="none"
              stroke="rgba(192,57,43,0.04)"
              strokeWidth="1"
            />
            <circle
              cx="60"
              cy="60"
              r="8"
              fill="none"
              stroke="rgba(192,57,43,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgPattern)" />
      </svg>

      <div style={styles.content}>
        <header style={styles.header}>
          <div style={styles.crown}>♛</div>
          <h1 style={styles.title}>Phú Xuân Ký Ức</h1>
          <p style={styles.subtitle}>
            Khám phá Di sản &amp; Ẩm thực Cố đô Huế
          </p>
          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerIcon}>✦</span>
            <span style={styles.dividerLine}></span>
          </div>
        </header>

        <main>
          {/* === LAB 1 === */}
          <section style={styles.labSection}>
            <div style={styles.labLabel}>Lab 01 · Đồng hồ đếm</div>
            <ViewCounter />
          </section>

          {/* === LAB 2 === */}
          <section style={styles.labSection}>
            <div style={styles.labLabel}>Lab 02 · Xem chi tiết món ăn</div>
            <TrangMonAn />
          </section>

          {/* === LAB 3 === */}
          <section style={styles.labSection}>
            <div style={styles.labLabel}>Lab 03 · Tìm kiếm tự động focus</div>
            <TimMonAn />
          </section>

          {/* === LAB 4 === */}
          <section style={styles.labSection}>
            <div style={styles.labLabel}>
              Lab 04 · Tối ưu useMemo + useCallback
            </div>
            <DanhSachDiaDanh />
          </section>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerLine}></div>
          <p style={styles.footerText}>
            © 2026 · Phú Xuân Ký Ức · Dự án React — Bài 6
          </p>
          <p style={styles.footerSub}>
            Đại học Phú Xuân · Du lịch &amp; Ẩm thực Huế
          </p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    background:
      'radial-gradient(ellipse at top, #fffbf0 0%, #fdf6e3 40%, #f7e8c8 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    padding: '60px 20px 30px',
  },
  crown: {
    fontSize: 28,
    color: '#c0392b',
    opacity: 0.6,
    marginBottom: 8,
    letterSpacing: 4,
  },
  title: {
    fontSize: 64,
    fontWeight: 700,
    color: '#8b0000',
    margin: 0,
    letterSpacing: 3,
    fontFamily: '"Playfair Display", Georgia, serif',
    textShadow: '0 2px 0 #f39c12, 0 4px 20px rgba(139,0,0,0.2)',
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0522d',
    fontStyle: 'italic',
    marginTop: 18,
    letterSpacing: 1,
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontWeight: 500,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginTop: 24,
  },
  dividerLine: {
    width: 80,
    height: 1,
    background:
      'linear-gradient(90deg, transparent, #c0392b, transparent)',
  },
  dividerIcon: {
    color: '#c0392b',
    fontSize: 14,
  },
  labSection: {
    marginBottom: 20,
  },
  labLabel: {
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#a0522d',
    fontWeight: 700,
    marginBottom: 8,
    opacity: 0.7,
  },
  footer: {
    textAlign: 'center',
    marginTop: 80,
    paddingBottom: 60,
  },
  footerLine: {
    width: 200,
    height: 1,
    margin: '0 auto 24px',
    background:
      'linear-gradient(90deg, transparent, #d4b483, transparent)',
  },
  footerText: {
    color: '#8b0000',
    fontSize: 14,
    fontStyle: 'italic',
    margin: 0,
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  footerSub: {
    color: '#a0522d',
    fontSize: 12,
    marginTop: 6,
    letterSpacing: 1,
    opacity: 0.7,
  },
};

export default App;