import { Button, Navbar } from "flowbite-react";
import { ReactNode } from "react";

interface Props {
  buttonLabel?: string;
  buttonColor?: string;
  buttonIcon?: ReactNode;
  buttonDisabled?: boolean;
  buttonClassName?: string;
  inNavbar?: boolean;
  onClick: () => void;
}

export default function ModalButton(props: Props) {
  function ButtonContent() {
    return (
      <div className="flex gap-1.5">
        {props.buttonIcon}
        <span>
          {props.buttonLabel ?? "Open modal"}
        </span>
      </div>
    )
  }

  function click() {
    props.onClick();
  }

  return (
    <>
      {props.inNavbar ? (
        <Navbar.Link
          as="button"
          className={`w-full ${props.buttonClassName}`}
          onClick={click}
        >
          <ButtonContent />
        </Navbar.Link>
      ) : (
        <Button
          color={props.buttonColor ?? "light"}
          disabled={props.buttonDisabled}
          size="sm"
          className={props.buttonClassName}
          onClick={click}
        >
          <ButtonContent />
        </Button>
      )}
    </>
  )
}
