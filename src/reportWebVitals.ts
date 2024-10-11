type VitalsReportHandler = (metric: {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}) => void;

const reportWebVitals = (onPerfEntry?: VitalsReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('vite-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    }).catch((err) => {
      console.error('Error loading vite-vitals:', err);
    });
  }
};

export default reportWebVitals;
