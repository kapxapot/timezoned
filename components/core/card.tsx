import { PropsWithChildren } from 'react';

interface Props {
  width?: string;
}

export function Card(props: PropsWithChildren<Props>) {
  return (
    <div className={`flex flex-col items-center gap-2 rounded-lg border border-gray-200 shadow-md p-3 bg-white ${props.width}`}>
      {props.children}
    </div>
  )
}
