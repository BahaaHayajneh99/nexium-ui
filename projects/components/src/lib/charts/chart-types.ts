/** A single named series plotted by nx-bar-chart, nx-line-chart and nx-area-chart. */
export interface NxChartSeries {
  name: string;
  data: number[];
  color?: string;
}

/** A single named series plotted by nx-mixed-chart - like NxChartSeries, with a mark type per series. */
export interface NxMixedSeries {
  name: string;
  data: number[];
  type: 'bar' | 'line';
  color?: string;
}

/** A single x/y coordinate plotted by nx-scatter-chart. */
export interface NxScatterPoint {
  x: number;
  y: number;
  label?: string;
}

/** A single named series plotted by nx-scatter-chart. */
export interface NxScatterSeries {
  name: string;
  data: NxScatterPoint[];
  color?: string;
}

/** A single x/y/size coordinate plotted by nx-bubble-chart. */
export interface NxBubblePoint {
  x: number;
  y: number;
  size: number;
  label?: string;
}

/** A single named series plotted by nx-bubble-chart. */
export interface NxBubbleSeries {
  name: string;
  data: NxBubblePoint[];
  color?: string;
}
