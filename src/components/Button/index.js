import { Link } from "react-router-dom";
import className from "classnames/bind";
import style from "./Button.module.scss";

const ctx = className.bind(style);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };

  // remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = ctx("wrapper", {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    [className]: className,
    leftIcon,
    rightIcon,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={ctx("icon")}>{leftIcon}</span>}
      <span className={ctx("title")}>{children}</span>
      {rightIcon && <span className={ctx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
