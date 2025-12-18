declare module 'lucide-react' {
  import * as React from 'react';

  type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

  export const ArrowLeft: IconComponent;
  export const ArrowRight: IconComponent;
  export const Search: IconComponent;
  export const ChevronUp: IconComponent;
  export const ChevronDown: IconComponent;
  export const ChevronRight: IconComponent;
  export const ChevronLeft: IconComponent;
  export const MoreHorizontal: IconComponent;
  export const X: IconComponent;
  export const Check: IconComponent;
  export const Circle: IconComponent;
  export const Dot: IconComponent;
  export const GripVertical: IconComponent;
  export const PanelLeft: IconComponent;

  const _default: { [key: string]: IconComponent };
  export default _default;
}
