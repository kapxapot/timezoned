import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export function Card(props: PropsWithChildren<Props>) {
  return (
    <div className={`flex flex-col items-center gap-1 rounded-lg border border-gray-200 shadow-md p-3 bg-white ${props.className}`}>
      {props.children}
    </div>
  )
}
