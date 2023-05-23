
type Props = {
  startDate: Date;
  endDate: Date;
  onIdle: JSX.Element;
  onStart: JSX.Element;
  onEnd: JSX.Element;
};

export const Switcher = (props: Props) => {
  const now = new Date().getTime();
  const startDate = props.startDate.getTime();
  const endDate = props.endDate.getTime();

  if (now < startDate) return props.onIdle;
  if (now > startDate && now < endDate) return props.onStart;
  if (now > endDate) return props.onEnd;

  return props.onStart;
};