interface Props {
  baseYear: number;
  name: string;
}

export default function Copyright({ baseYear, name }: Props) {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <>
      All rights reserved. &copy; {baseYear}{year > baseYear && `—${year}`} <span className="font-semibold">{name}</span>
    </>
  );
}
