import { useState, useEffect } from 'react';

function useDebounce(giaTri, doTre = 300) {
  const [giaTriDaTre, setGiaTriDaTre] = useState(giaTri);

  useEffect(() => {
    console.log(
      `⏱️ [useDebounce] Đặt timer ${doTre}ms cho giá trị: "${giaTri}"`
    );

    const timer = setTimeout(() => {
      console.log(
        `✅ [useDebounce] Timer chạy! Cập nhật thành: "${giaTri}"`
      );
      setGiaTriDaTre(giaTri);
    }, doTre);

    return () => {
      console.log(`🧹 [useDebounce] Huỷ timer cũ cho: "${giaTri}"`);
      clearTimeout(timer);
    };
  }, [giaTri, doTre]);

  return giaTriDaTre;
}

export default useDebounce;